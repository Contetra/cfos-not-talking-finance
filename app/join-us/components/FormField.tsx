"use client";

import { cn } from "@/lib/cn";

/**
 * Underlined, not boxed: a 1px bottom rule that thickens to 2px and turns amber
 * on focus. Keeps the page reading as editorial rather than as a SaaS signup.
 *
 * Exported so every control on the page shares one treatment.
 */
export const inputClass = cn(
  "w-full bg-transparent px-0 py-3 font-body text-copy text-primary",
  "border-0 border-b border-line rounded-none",
  "placeholder:text-muted",
  "focus:border-b-2 focus:border-accent focus:outline-none",
  "aria-[invalid=true]:border-error aria-[invalid=true]:border-b-2",
  "transition-[border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
);

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  /** Render the control with the ids it must be wired to. `labelId` is for
   *  composite controls (a group of inputs) where `htmlFor` cannot associate,
   *  because the thing being labelled is a group rather than an input. */
  children: (ids: {
    describedBy?: string;
    invalid: boolean;
    labelId: string;
  }) => React.ReactNode;
};

export default function FormField({
  id,
  label,
  required = false,
  error,
  hint,
  className,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const labelId = `${id}-label`;
  const describedBy =
    [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("w-full", className)}>
      <label
        id={labelId}
        htmlFor={id}
        className="font-body text-label text-primary block font-medium"
      >
        {label}
        {required ? (
          /* The asterisk is decoration; the requirement itself reaches
             assistive tech through the control's own required attribute. */
          <span aria-hidden="true" className="text-accent ml-1">
            *
          </span>
        ) : null}
      </label>

      {hint ? (
        <p
          id={hintId}
          className="font-body text-muted mt-1 max-w-[46ch] text-[0.8125rem] text-pretty"
        >
          {hint}
        </p>
      ) : null}

      <div className="mt-1">
        {children({ describedBy, invalid: !!error, labelId })}
      </div>

      {error ? (
        <p
          id={errorId}
          className="font-body text-error mt-2 text-[0.8125rem]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
