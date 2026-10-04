import { z } from "zod";

/**
 * One source of truth for the guest application, shared by the form and the
 * Server Action.
 *
 * Two schemas are exported: the client validates the fields a person fills
 * in, and the server re-validates those same fields plus the two bot checks
 * that never live in form state. Every actual RULE is declared once.
 */

/**
 * 8–15 digits once spaces, dashes, dots and brackets are stripped, with an
 * optional leading +. Covers Indian mobiles (10) and any country code.
 */
const PHONE_STRIPPED = /^\+?\d{8,15}$/;

export function normalisePhone(input: string): string {
  return input.replace(/[\s\-().]/g, "");
}

/* -------------------------------------------------------------------------
   Client schema — used by the react-hook-form resolver
------------------------------------------------------------------------- */

export const guestApplicationSchema = z.object({
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
});

export type GuestApplicationValues = z.infer<typeof guestApplicationSchema>;

/* -------------------------------------------------------------------------
   Wire schema — what the Server Action re-validates. Superset of the above:
   same fields, plus the two bot checks.
------------------------------------------------------------------------- */

export const joinSubmissionSchema = guestApplicationSchema.extend({
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
