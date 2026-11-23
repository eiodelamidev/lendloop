import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/ui/cx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type ButtonStyles = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyles = {}): string {
  const variants: Record<Variant, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary:
      "border border-border bg-surface text-foreground hover:bg-surface-muted",
    ghost: "text-foreground hover:bg-surface-muted",
  };

  const sizes: Record<Size, string> = {
    sm: "min-h-9 px-3 text-small",
    md: "min-h-11 px-5 text-body",
  };

  return cx(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold",
    "transition-colors motion-reduce:transition-none",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
