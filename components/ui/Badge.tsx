import type { HTMLAttributes } from "react";
import { cx } from "@/lib/ui/cx";

type Tone = "neutral" | "accent" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-muted text-muted-foreground",
  accent: "border border-border bg-surface text-accent",
  danger: "border border-border bg-surface text-danger",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & { tone?: Tone };

export default function Badge({
  tone = "neutral",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex min-h-6 items-center rounded-full px-2.5 text-small font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
