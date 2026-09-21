import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "paper" | "outline-dark";

const variants: Record<Variant, string> = {
  primary: "bg-blue text-paper hover:bg-blue-deep",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]",
  paper: "bg-paper text-night hover:bg-white",
  "outline-dark": "border border-paper/30 text-paper hover:border-paper hover:bg-paper/5",
};

export const buttonBase =
  "group inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-md)] px-5 py-3 text-[15px] font-semibold transition-colors duration-200";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Show the red first point: use at most once per view. */
  point?: boolean;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  point = false,
  arrow = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${buttonBase} ${variants[variant]} ${className}`}>
      {point && <span className="size-2 rounded-full bg-red" aria-hidden />}
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
    </Link>
  );
}

export function buttonClass(variant: Variant = "primary") {
  return `${buttonBase} ${variants[variant]}`;
}
