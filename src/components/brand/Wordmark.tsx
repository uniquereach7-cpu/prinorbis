/*
 * Temporary wordmark while the client redraws the logo: lowercase
 * "prinorbis" with the two i-dots as first points (lime on forest,
 * flare on bone). Swap this one component when the new logo lands.
 */
type WordmarkProps = {
  tone?: "light" | "dark";
  className?: string;
};

function Dot({ tone }: { tone: "light" | "dark" }) {
  return (
    <span
      aria-hidden
      className={`absolute left-1/2 top-[0.02em] size-[0.19em] -translate-x-1/2 rounded-full ${
        tone === "dark" ? "bg-lime" : "bg-flare"
      }`}
    />
  );
}

export function Wordmark({ tone = "dark", className = "" }: WordmarkProps) {
  return (
    <span
      className={`inline-flex items-baseline font-display font-bold tracking-[-0.03em] [font-variation-settings:'opsz'_48] ${
        tone === "dark" ? "text-bone" : "text-ink"
      } ${className}`}
      aria-label="Prinorbis"
      role="img"
    >
      <span aria-hidden>pr</span>
      <span aria-hidden className="relative">
        ı<Dot tone={tone} />
      </span>
      <span aria-hidden>norb</span>
      <span aria-hidden className="relative">
        ı<Dot tone={tone} />
      </span>
      <span aria-hidden>s</span>
    </span>
  );
}
