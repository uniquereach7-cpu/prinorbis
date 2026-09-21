import Image from "next/image";
import { Mark } from "./Mark";
import wordmarkBlue from "../../../public/brand/wordmark-blue.png";
import wordmarkPaper from "../../../public/brand/wordmark-paper.png";
import techGrey from "../../../public/brand/technologies-grey.png";
import techLight from "../../../public/brand/technologies-light.png";

type LogoProps = {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  preload?: boolean;
};

const sizes = {
  sm: { mark: "h-8", word: 16, tech: 11 },
  md: { mark: "h-10", word: 20, tech: 13.5 },
  lg: { mark: "h-16", word: 32, tech: 22 },
};

/*
 * Horizontal lockup: the hex mark beside the stacked "Prinorbis / Technologies"
 * wordmark cut from the supplied logo file.
 */
export function Logo({ tone = "light", size = "md", preload = false }: LogoProps) {
  const s = sizes[size];
  const word = tone === "dark" ? wordmarkPaper : wordmarkBlue;
  const tech = tone === "dark" ? techLight : techGrey;

  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark tone={tone} className={`${s.mark} w-auto shrink-0`} />
      <span className="flex flex-col items-end gap-[3px]">
        <Image
          src={word}
          alt="Prinorbis"
          style={{ height: s.word, width: "auto" }}
          preload={preload}
        />
        <Image
          src={tech}
          alt="Technologies"
          style={{ height: s.tech, width: "auto" }}
          preload={preload}
        />
      </span>
    </span>
  );
}
