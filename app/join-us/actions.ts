"use server";

import { headers } from "next/headers";

import { joinSubmissionSchema } from "@/lib/joinSchema";

/* ---------------------------------------------------------------------------
   Rate limiting

   ⚠️ THIS IS A MODULE-LEVEL MAP. It lives in one server process's memory,
   which means:
     - it resets on every redeploy, and on every cold start;
     - it does NOT work across multiple instances (each gets its own map), so
       on any autoscaling host the real limit is 5 × instance count.
   It is a speed bump, not a control. Move it to Upstash Ratelimit (or any
   shared store) before this form sees real traffic.
--------------------------------------------------------------------------- */

const WINDOW_MS = 60 * 60 * 1000; // one hour
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

function clientIp(headerList: Awaited<ReturnType<typeof headers>>): string {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headerList.get("x-real-ip")?.trim() || "unknown";
}

/** @returns seconds to wait, or 0 when the request is allowed through. */
function rateLimit(ip: string): number {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  const recent = (hits.get(ip) ?? []).filter((t) => t > cutoff);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return Math.ceil((recent[0] + WINDOW_MS - now) / 1000);
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic prune so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, stamps] of hits) {
      const live = stamps.filter((t) => t > cutoff);
      if (live.length === 0) hits.delete(key);
      else hits.set(key, live);
    }
  }

  return 0;
}

/* ---------------------------------------------------------------------------
   Logging

   Never log a phone number, and never log a full email address, at info level
   in production. Both are personal data and both end up in whatever log sink
   the host ships to.
--------------------------------------------------------------------------- */

function redactEmail(email: string): string {
  const at = email.lastIndexOf("@");
  return at === -1 ? "[redacted]" : `[redacted]@${email.slice(at + 1)}`;
}

export type JoinActionResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

/**
 * Server Action behind the Join us form. Replaces what used to be a
 * POST /api/join route handler — same validation, rate limiting and
 * (commented-out) delivery options, just invoked as a function rather than
 * fetched as a URL.
 */
export async function submitGuestApplication(
  input: unknown,
): Promise<JoinActionResult> {
  const ip = clientIp(await headers());

  const retryAfter = rateLimit(ip);
  if (retryAfter > 0) {
    return {
      ok: false,
      error: "Too many applications from this address.",
    };
  }

  const parsed = joinSubmissionSchema.safeParse(input);

  if (!parsed.success) {
    const flat = parsed.error.flatten();

    /* A filled honeypot is a bot. Report success and record nothing —
       telling it that it was caught only helps whoever is tuning it. */
    if (flat.fieldErrors.website) {
      return { ok: true };
    }

    return {
      ok: false,
      error: "Some fields need attention.",
      fieldErrors: flat.fieldErrors,
    };
  }

  const application = parsed.data;
  const isProduction = process.env.NODE_ENV === "production";

  console.info("[join] application received", {
    name: `${application.firstName} ${application.lastName}`,
    city: application.currentCity || "—",
    from: application.availability.from?.toISOString(),
    to: application.availability.to?.toISOString(),
    travelToMumbai: application.travelToMumbai,
    // Redacted in production; full values only ever in local development.
    email: isProduction
      ? redactEmail(application.email)
      : application.email,
    contactNumber: isProduction ? "[redacted]" : application.contactNumber,
  });

  /* -------------------------------------------------------------------------
     TODO: pick ONE delivery route and uncomment it.

     Both are written against the env var names in .env.example.
     ---------------------------------------------------------------------- */

  // --- Option A: email the team via Resend ---------------------------------
  //
  // const resendResponse = await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     from: process.env.RESEND_FROM,
  //     to: [process.env.CONTACT_EMAIL],
  //     reply_to: application.email,
  //     subject: `Guest application — ${application.firstName} ${application.lastName}`,
  //     text: [
  //       `Name: ${application.firstName} ${application.lastName}`,
  //       `Email: ${application.email}`,
  //       `Phone: ${application.contactNumber}`,
  //       `City: ${application.currentCity || "—"}`,
  //       `Available: ${application.availability.from?.toDateString()} to ${application.availability.to?.toDateString()}`,
  //       `Can travel to Mumbai: ${application.travelToMumbai}`,
  //     ].join("\n"),
  //   }),
  // });
  // if (!resendResponse.ok) {
  //   console.error("[join] resend failed", resendResponse.status);
  //   return { ok: false, error: "That did not send. Try again shortly." };
  // }

  // --- Option B: append a row to a Google Sheet ----------------------------
  //
  // Needs `googleapis` installed, and the sheet shared with
  // GOOGLE_SERVICE_ACCOUNT_EMAIL as an Editor (otherwise the append 403s).
  //
  // import { google } from "googleapis";
  //
  // const auth = new google.auth.JWT({
  //   email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  //   key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  //   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  // });
  // const sheets = google.sheets({ version: "v4", auth });
  // await sheets.spreadsheets.values.append({
  //   spreadsheetId: process.env.GOOGLE_SHEETS_ID,
  //   range: "Applications!A:H",
  //   valueInputOption: "USER_ENTERED",
  //   requestBody: {
  //     values: [[
  //       new Date().toISOString(),
  //       application.firstName,
  //       application.lastName,
  //       application.email,
  //       application.contactNumber,
  //       application.currentCity ?? "",
  //       `${application.availability.from?.toISOString()} → ${application.availability.to?.toISOString()}`,
  //       application.travelToMumbai,
  //     ]],
  //   },
  // });

  return { ok: true };
}
