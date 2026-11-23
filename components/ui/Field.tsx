"use client";

import { useId, type ReactNode } from "react";
import { cx } from "@/lib/ui/cx";

export const inputStyles =
  "min-h-11 w-full rounded-md border border-border bg-surface px-3 text-body text-foreground placeholder:text-muted-foreground aria-[invalid=true]:border-danger";

type FieldRenderProps = {
  id: string;
  describedBy: string | undefined;
  invalid: boolean;
};

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: FieldRenderProps) => ReactNode;
};

export default function Field({
  label,
  hint,
  error,
  className,
  children,
}: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cx("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-small font-semibold text-foreground">
        {label}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint ? (
        <p id={hintId} className="text-small text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-small text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
