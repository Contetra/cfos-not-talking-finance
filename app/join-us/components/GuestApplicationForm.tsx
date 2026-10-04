"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { joinPage } from "@/data/site";
import { cn } from "@/lib/cn";
import {
  guestApplicationSchema,
  type GuestApplicationValues,
} from "@/lib/joinSchema";
import { submitGuestApplication } from "../actions";
import AvailabilityRangePicker from "./AvailabilityRangePicker";
import FormField, { inputClass } from "./FormField";
import SubmissionSuccess from "./SubmissionSuccess";

/** Focus order for the "jump to the first problem" behaviour on a failed
 *  submit. Declared rather than derived, so it always matches visual order. */
const FIELD_ORDER = [
  "firstName",
  "lastName",
  "contactNumber",
  "email",
  "currentCity",
  "availability",
  "travelToMumbai",
] as const;

type Status = "idle" | "submitting" | "error";

export default function GuestApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0);

  /** Time on page. Anything under three seconds is not a person. */
  const mountedAt = useRef<number>(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors },
  } = useForm<GuestApplicationValues>({
    resolver: zodResolver(guestApplicationSchema),
    // Validate on blur, then on change once a field has errored. Never on mount.
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      email: "",
      currentCity: "",
      availability: { from: undefined, to: undefined },
    },
  });

  const onValid = async (values: GuestApplicationValues) => {
    setStatus("submitting");
    setFormError(null);
    setErrorCount(0);

    try {
      const result = await submitGuestApplication({
        ...values,
        // Read straight from the DOM: never held in form state, so a bot
        // filling it cannot be told it was noticed.
        website:
          (document.getElementById("website") as HTMLInputElement | null)
            ?.value ?? "",
        elapsedMs: Date.now() - mountedAt.current,
      });

      if (!result.ok) throw new Error(result.error);
      setSentName(values.firstName);
    } catch {
      setStatus("error");
      setFormError(joinPage.failure);
    }
  };

  const onInvalid = () => {
    const bad = FIELD_ORDER.filter((name) => name in errors);
    setErrorCount(bad.length);
    if (bad.length > 0) {
      setFocus(bad[0] as keyof GuestApplicationValues);
    }
  };

  if (sentName !== null) {
    return (
      <section id="join-form" className="bg-canvas section">
        <div className="mx-auto w-full max-w-[640px] px-6">
          <SubmissionSuccess firstName={sentName} />
        </div>
      </section>
    );
  }

  const submitting = status === "submitting";

  return (
    <section id="join-form" className="bg-canvas section">
      <div className="bg-surface border-line mx-auto w-full max-w-[640px] rounded-2xl border p-8 md:p-10">
        <p className="font-body text-muted max-w-[46ch] text-[0.8125rem] text-pretty">
          <span aria-hidden="true" className="text-accent">
            *
          </span>{" "}
          {joinPage.requiredLegend}
        </p>

        <form
          noValidate
          onSubmit={handleSubmit(onValid, onInvalid)}
          className="mt-10 space-y-9"
        >
          {/* Honeypot. Clipped out of view rather than display:none, which
              bots skip. Not in form state — read from the DOM at submit. */}
          <div
            aria-hidden="true"
            className="absolute h-px w-px overflow-hidden"
            style={{ clip: "rect(0 0 0 0)", clipPath: "inset(50%)" }}
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <FormField
              id="firstName"
              label={joinPage.labels.firstName}
              required
              error={errors.firstName?.message}
            >
              {({ describedBy, invalid }) => (
                <input
                  {...register("firstName")}
                  id="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  aria-invalid={invalid || undefined}
                  aria-describedby={describedBy}
                  className={inputClass}
                />
              )}
            </FormField>

            <FormField
              id="lastName"
              label={joinPage.labels.lastName}
              required
              error={errors.lastName?.message}
            >
              {({ describedBy, invalid }) => (
                <input
                  {...register("lastName")}
                  id="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  aria-invalid={invalid || undefined}
                  aria-describedby={describedBy}
                  className={inputClass}
                />
              )}
            </FormField>
          </div>

          <FormField
            id="contactNumber"
            label={joinPage.labels.contactNumber}
            required
            hint={joinPage.hints.contactNumber}
            error={errors.contactNumber?.message}
          >
            {({ describedBy, invalid }) => (
              <input
                {...register("contactNumber")}
                id="contactNumber"
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                className={inputClass}
              />
            )}
          </FormField>

          <FormField
            id="email"
            label={joinPage.labels.email}
            required
            error={errors.email?.message}
          >
            {({ describedBy, invalid }) => (
              <input
                {...register("email")}
                id="email"
                type="email"
                required
                autoComplete="email"
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                className={inputClass}
              />
            )}
          </FormField>

          <FormField
            id="currentCity"
            label={joinPage.labels.currentCity}
            error={errors.currentCity?.message}
          >
            {({ describedBy, invalid }) => (
              <input
                {...register("currentCity")}
                id="currentCity"
                type="text"
                autoComplete="address-level2"
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                className={inputClass}
              />
            )}
          </FormField>

          <FormField
            id="availability"
            label={joinPage.labels.availability}
            required
            hint={joinPage.hints.availability}
            error={errors.availability?.message}
          >
            {({ describedBy, invalid, labelId }) => (
              <Controller
                control={control}
                name="availability"
                render={({ field }) => (
                  <AvailabilityRangePicker
                    value={field.value}
                    onChange={(range) => field.onChange(range ?? {})}
                    invalid={invalid}
                    describedBy={describedBy}
                    labelledBy={labelId}
                  />
                )}
              />
            )}
          </FormField>

          {/* A real fieldset with a real legend and real radios, so arrow-key
              navigation is the browser's job rather than ours. */}
          <fieldset className="border-0 p-0">
            <legend className="font-body text-label text-primary font-medium">
              {joinPage.labels.travelToMumbai}
              <span aria-hidden="true" className="text-accent ml-1">
                *
              </span>
            </legend>
            <div className="mt-3 flex gap-8">
              {(["yes", "no"] as const).map((option) => (
                <label
                  key={option}
                  className="font-body text-copy text-primary flex items-center gap-2"
                >
                  <input
                    {...register("travelToMumbai")}
                    type="radio"
                    value={option}
                    required
                    aria-invalid={!!errors.travelToMumbai || undefined}
                    aria-describedby={
                      errors.travelToMumbai
                        ? "travelToMumbai-error"
                        : undefined
                    }
                    className="accent-accent h-4 w-4"
                  />
                  {option === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
            {errors.travelToMumbai ? (
              <p
                id="travelToMumbai-error"
                className="font-body text-error mt-2 text-[0.8125rem]"
              >
                {errors.travelToMumbai.message}
              </p>
            ) : null}
          </fieldset>

          {/* Announcements: the error count on a failed submit, and any
              transport failure. */}
          <p aria-live="polite" className="sr-only">
            {errorCount > 0
              ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.`
              : ""}
          </p>

          {formError ? (
            <p
              role="alert"
              className="font-body text-error border-error border-l-2 pl-4 text-[0.9375rem]"
            >
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "bg-accent text-primary hover:bg-accent-2 font-display rounded-full px-8 py-3.5 text-[0.9375rem] font-bold",
              "transition-[background-color,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "focus-visible:outline-offset-4",
              submitting && "cursor-wait opacity-60",
            )}
          >
            {submitting ? joinPage.submitting : joinPage.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
