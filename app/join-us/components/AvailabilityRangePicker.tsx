"use client";

import { DayPicker, type DateRange } from "react-day-picker";

import { formatDateRange, MAX_RANGE_DAYS } from "@/lib/joinSchema";

/**
 * The schema's availability shape has optional KEYS ({ from?: Date }), while
 * react-day-picker's DateRange has a required `from` key that may hold
 * undefined. They are not the same type, so the conversion happens here rather
 * than being papered over with a cast at the call site.
 */
type AvailabilityValue = { from?: Date; to?: Date };

type AvailabilityRangePickerProps = {
  value?: AvailabilityValue;
  onChange: (range: DateRange | undefined) => void;
  invalid?: boolean;
  describedBy?: string;
  /** The field's visible label. A calendar is a group, not a single input, so
   *  a <label for> cannot bind to it — it is named through aria-labelledby. */
  labelledBy?: string;
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * react-day-picker v9 in range mode, styled entirely through `classNames` —
 * the library's own stylesheet is deliberately not imported, because this site
 * has exactly one stylesheet and it holds the brand tokens.
 */
export default function AvailabilityRangePicker({
  value,
  onChange,
  invalid,
  describedBy,
  labelledBy,
}: AvailabilityRangePickerProps) {
  const today = startOfToday();
  const echo = formatDateRange(value?.from, value?.to);
  const selected: DateRange | undefined = value?.from
    ? { from: value.from, to: value.to }
    : undefined;

  return (
    <div
      id="availability"
      role="group"
      aria-labelledby={labelledBy}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className="border-line border-b pb-4"
    >
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onChange}
        // Past dates are unbookable, and the calendar never pages back past now.
        disabled={{ before: today }}
        startMonth={today}
        max={MAX_RANGE_DAYS}
        showOutsideDays={false}
        classNames={{
          root: "font-body text-label text-primary",
          months: "flex",
          month: "w-full",
          month_caption: "flex items-center h-10",
          caption_label: "font-display text-h3 text-primary font-bold",
          nav: "flex items-center gap-1 justify-end -mt-10 mb-0",
          button_previous:
            "h-9 w-9 inline-flex items-center justify-center rounded-full text-primary hover:bg-surface disabled:opacity-30",
          button_next:
            "h-9 w-9 inline-flex items-center justify-center rounded-full text-primary hover:bg-surface disabled:opacity-30",
          chevron: "h-4 w-4 fill-current",
          month_grid: "w-full border-collapse mt-2",
          weekdays: "",
          weekday: "text-muted font-normal text-[0.75rem] pb-2",
          week: "",
          day: "p-0 text-center",
          day_button:
            "h-10 w-full inline-flex items-center justify-center rounded-md hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent",
          today: "font-semibold underline underline-offset-4",
          selected: "",
          range_start: "bg-accent text-primary font-medium rounded-l-md",
          range_end: "bg-accent text-primary font-medium rounded-r-md",
          range_middle: "bg-surface text-primary",
          disabled: "text-muted/40 line-through",
          outside: "text-muted/40",
          hidden: "invisible",
        }}
      />

      {/* Echoed back in words so the choice is confirmable without reopening
          the calendar. */}
      <p aria-live="polite" className="font-body text-label text-primary mt-2 max-w-[46ch] text-pretty">
        {echo ?? `Nothing picked yet — up to ${MAX_RANGE_DAYS} days.`}
      </p>
    </div>
  );
}
