"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { useChapter } from "./ChapterProvider";
import { nav } from "@/content/site";
import { branches } from "@/components/living/geometry";

const menuBranches = branches({ x: 300, y: 620, angle: -90, length: 120, levels: 7, seed: 41, spread: 30, width: 2.6 });

export function Header() {
  const pathname = usePathname();
  const { label, headerTone } = useChapter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the menu whenever the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Tuck the header away while reading down, bring it back on the way up.
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 400);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = headerTone === "dark";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? dark
              ? "bg-night/70 text-bone backdrop-blur-xl"
              : "bg-bone/80 text-ink backdrop-blur-xl"
            : dark
              ? "text-bone"
              : "text-ink"
        }`}
      >
        <div className="container-site flex h-[76px] items-center justify-between gap-6">
          <div className="flex items-center gap-7">
            <Link href="/" aria-label="Prinorbis, home" className="text-[26px] leading-none">
              <Wordmark tone={dark ? "dark" : "light"} />
            </Link>
            {label && (
              <div
                aria-hidden
                className={`telemetry hidden items-center gap-2.5 xl:flex ${dark ? "text-bone/55" : "text-ink-muted"}`}
              >
                <span className={`size-1.5 rounded-full ${dark ? "bg-lime" : "bg-flare"}`} />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </div>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                    dark ? "text-bone/75 hover:text-bone" : "text-ink/70 hover:text-ink"
                  } ${active ? (dark ? "!text-bone" : "!text-ink") : ""}`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full transition-all duration-300 ${
                      dark ? "bg-lime" : "bg-flare"
                    } ${active ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60"}`}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className={`ml-4 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors duration-300 ${
                dark
                  ? "border-bone/30 text-bone hover:border-lime hover:bg-lime hover:text-night"
                  : "border-forest bg-forest text-bone hover:bg-night"
              }`}
            >
              Start at Discover
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => {
              setOpenedAt(pathname);
              setOpen(true);
            }}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="on-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-night text-bone"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 600 640" className="pointer-events-none absolute right-0 bottom-0 h-[70%] opacity-50" aria-hidden>
              {menuBranches.map((b, i) => (
                <motion.path
                  key={i}
                  d={b.d}
                  fill="none"
                  stroke={b.depth > 4 ? "#c8f03c" : "#8fae96"}
                  strokeOpacity={b.depth > 4 ? 0.5 : 0.7}
                  strokeWidth={b.width}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + b.depth * 0.12 }}
                />
              ))}
            </svg>
            <div className="container-site relative flex h-[76px] shrink-0 items-center justify-between">
              <span className="text-[26px] leading-none">
                <Wordmark tone="dark" />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-full"
                aria-label="Close menu"
                autoFocus
              >
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-site relative flex flex-1 flex-col justify-center py-10">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-bone/10 py-4"
                  >
                    <span className="telemetry w-6 text-bone/35">0{i}</span>
                    <span className="font-display text-[2rem] font-semibold tracking-[-0.03em]">{item.label}</span>
                    {pathname === item.href && <span className="size-2 self-center rounded-full bg-lime" />}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-site relative flex shrink-0 items-center justify-between pb-8">
              <span className="telemetry text-bone/40">Living systems online</span>
              <Link href="/contact" className="telemetry flex items-center gap-1 text-lime" onClick={() => setOpen(false)}>
                Plant your first point <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
