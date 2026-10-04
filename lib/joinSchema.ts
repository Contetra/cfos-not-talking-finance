import { z } from "zod";

/**
 * One source of truth for the guest application, shared by the form and the
 * route handler.
 *
 * Two schemas are exported because a Date survives in memory but not over the
 * wire: the client validates real `Date` objects, the server validates the ISO
 * strings JSON turns them into. Every actual RULE is declared once — the field
 * definitions and the availability refinement are shared between them.
 */

/** Longest availability window a guest may offer. */
export const MAX_RANGE_DAYS = 60;

const MS_PER_DAY = 86_400_000;

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 8–15 digits once spaces, dashes, dots and brackets are stripped, with an
 * optional leading +. Covers Indian mobiles (10) and any country code.
 */
const PHONE_STRIPPED = /^\+?\d{8,15}$/;

export function normalisePhone(input: string): string {
  return input.replace(/[\s\-().]/g, "");
}

/* -------------------------------------------------------------------------
   Field rules — declared once
------------------------------------------------------------------------- */

const baseFields = {
  firstName: z
    .string("Enter your first name")
    .trim()
    .min(1, "Enter your first name")
    .max(80, "That is longer than we can store"),
  lastName: z
    .string("Enter your last name")
    .trim()
    .min(1, "Enter your last name")
    .max(80, "That is longer than we can store"),
  contactNumber: z
    .string("Enter a contact number")
    .trim()
    .min(1, "Enter a contact number")
    .refine(
      (v) => PHONE_STRIPPED.test(normalisePhone(v)),
      "Enter 8 to 15 digits. A country code is fine.",
    ),
  email: z.email("Enter a valid email address"),
  currentCity: z
    .string()
    .trim()
    .max(80, "That is longer than we can store")
    .optional()
    .or(z.literal("")),
  travelToMumbai: z.enum(
    ["yes", "no"],
    "Let us know whether you can travel to Mumbai",
  ),
};

/**
 * Both ends required, no past dates, in order, and no longer than 60 days.
 * Emits a single message so one control never shows a stack of errors.
 */
function refineAvailability(
  value: { from?: Date; to?: Date },
  ctx: z.core.$RefinementCtx<{ from?: Date; to?: Date }>,
) {
  const { from, to } = value;

  if (!from || !to) {
    ctx.addIssue("Choose both a start and an end date.");
    return;
  }
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    ctx.addIssue("Those dates did not read correctly. Pick them again.");
    return;
  }
  if (from < startOfToday()) {
    ctx.addIssue("Start on today or a later date.");
    return;
  }
  if (to < from) {
    ctx.addIssue("The end date falls before the start date.");
    return;
  }
  const spanDays = Math.round((to.getTime() - from.getTime()) / MS_PER_DAY) + 1;
  if (spanDays > MAX_RANGE_DAYS) {
    ctx.addIssue(`Keep the window to ${MAX_RANGE_DAYS} days or fewer.`);
  }
}

/* -------------------------------------------------------------------------
   Client schema — real Date objects, used by the react-hook-form resolver
------------------------------------------------------------------------- */

export const guestApplicationSchema = z.object({
  ...baseFields,
  availability: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .superRefine(refineAvailability),
});

export type GuestApplicationValues = z.infer<typeof guestApplicationSchema>;

/* -------------------------------------------------------------------------
   Wire schema — what the route handler re-validates. Superset of the above:
   same fields, dates coerced from ISO strings, plus the two bot checks.
------------------------------------------------------------------------- */

export const joinSubmissionSchema = z.object({
  ...baseFields,
  availability: z
    .object({
      from: z.coerce.date().optional(),
      to: z.coerce.date().optional(),
    })
    .superRefine(refineAvailability),

  /** Honeypot. Visually hidden but not display:none, so bots fill it in. */
  website: z
    .string()
    .max(0, "Rejected")
    .optional()
    .or(z.literal("").optional()),

  /** Time on page before submit. Humans take longer than three seconds. */
  elapsedMs: z
    .number()
    .int()
    .min(3000, "That was too quick — take another look and submit again."),
});

export type JoinSubmission = z.infer<typeof joinSubmissionSchema>;

/* -------------------------------------------------------------------------
   Display
------------------------------------------------------------------------- */

/**
 * "14 Oct – 22 Oct 2026", collapsing the year when both ends share one, so the
 * choice is confirmable without reopening the calendar.
 */
export function formatDateRange(from?: Date, to?: Date): string | null {
  if (!from) return null;

  const day = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  });
  const dayYear = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (!to) return `${dayYear.format(from)} — pick an end date`;

  const sameYear = from.getFullYear() === to.getFullYear();
  return `${sameYear ? day.format(from) : dayYear.format(from)} – ${dayYear.format(to)}`;
}
