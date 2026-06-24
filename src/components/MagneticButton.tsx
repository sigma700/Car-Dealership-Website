"use client";
import {useMagnetic} from "@/hooks/useMagnetic";
import Link from "next/link";
import {ComponentProps} from "react";

interface MagneticButtonProps extends ComponentProps<"button"> {
  href?: string;
  variant?: "gold-fill" | "outline-gold" | "ghost";
  size?: "sm" | "md" | "lg";
  label: string;
  onClick?: () => void;
}

export default function MagneticButton({
  href,
  label,
  variant = "gold-fill",
  size = "md",
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>(0.35);

  const baseClasses =
    "inline-flex items-center justify-center font-body tracking-wide transition-colors duration-200 rounded-full select-none";
  const variantClasses =
    variant === "gold-fill"
      ? "bg-gold text-black hover:bg-gold-dim"
      : variant === "outline-gold"
        ? "border border-gold text-gold hover:bg-gold hover:text-black"
        : "text-gold hover:text-gold-dim";
  const sizeClasses =
    size === "sm"
      ? "px-4 py-1.5 text-sm"
      : size === "lg"
        ? "px-10 py-4 text-lg"
        : "px-6 py-2.5";

  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${className ?? ""}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {label}
    </button>
  );
}
