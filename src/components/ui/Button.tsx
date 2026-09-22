import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "lime" | "outline" | "outline-dark" | "bone";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-bone hover:bg-night",
  lime: "bg-lime text-night hover:bg-[#d6ff5a] shadow-[0_0_40px_-8px_rgba(200,240,60,0.6)]",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]",
  "outline-dark": "border border-bone/30 text-bone hover:border-bone hover:bg-bone/5",
  bone: "bg-bone text-night hover:bg-white",
};

export const buttonBase =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-[15px] font-semibold transition-[background-color,border-color,color,box-shadow] duration-300";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Show the first point: use at most once per view. */
  point?: boolean;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", point = false, arrow = false, className = "" }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${buttonBase} ${variants[variant]} ${className}`}>
      {point && <span className={`size-2 rounded-full ${variant === "primary" ? "bg-lime" : "bg-flare"}`} aria-hidden />}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative size-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </Link>
  );
}

export function buttonClass(variant: Variant = "primary") {
  return `${buttonBase} ${variants[variant]}`;
}
