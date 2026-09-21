"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useChapter } from "./ChapterProvider";
import { nav } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const { label, headerTone } = useChapter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the menu whenever the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = headerTone === "dark" && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          dark
            ? "bg-night/75 text-paper backdrop-blur-md"
            : scrolled
              ? "bg-paper/85 text-ink backdrop-blur-md"
              : "bg-transparent text-ink"
        } ${scrolled && !dark ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}
      >
        <div className="container-site flex h-[72px] items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="Prinorbis Technologies, home" className="relative block">
              <span className={`block transition-opacity duration-300 ${dark ? "opacity-0" : "opacity-100"}`}>
                <Logo tone="light" size="sm" preload />
              </span>
              <span
                className={`absolute inset-0 block transition-opacity duration-300 ${dark ? "opacity-100" : "opacity-0"}`}
                aria-hidden
              >
                <Logo tone="dark" size="sm" />
              </span>
            </Link>
            {label && (
              <div
                aria-hidden
                className={`telemetry hidden items-center gap-2.5 border-l pl-6 xl:flex ${
                  dark ? "border-paper/15 text-paper/70" : "border-ink/10 text-ink-muted"
                }`}
              >
                <span className="relative flex size-1.5">
                  <span className="pulse-ring absolute inset-0 rounded-full bg-red" />
                  <span className="relative size-1.5 rounded-full bg-red" />
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </div>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = item.href !== "/#industries" && pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-md px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                    dark ? "text-paper/80 hover:text-paper" : "text-ink/75 hover:text-ink"
                  } ${active ? (dark ? "text-paper" : "text-ink") : ""}`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-red" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className={`ml-3 inline-flex items-center gap-2 rounded-[var(--radius-md)] px-4 py-2.5 text-[14px] font-semibold transition-colors ${
                dark ? "bg-paper text-night hover:bg-white" : "bg-blue text-paper hover:bg-blue-deep"
              }`}
            >
              Book an assessment
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => {
              setOpenedAt(pathname);
              setOpen(true);
            }}
            className={`-mr-2 inline-flex size-11 items-center justify-center rounded-md lg:hidden ${
              dark ? "text-paper" : "text-ink"
            }`}
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
            className="on-dark fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-night text-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-site flex h-[72px] shrink-0 items-center justify-between">
              <Logo tone="dark" size="sm" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-paper"
                aria-label="Close menu"
                autoFocus
              >
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-site flex flex-1 flex-col justify-center gap-1 py-10">
              {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-paper/10 py-4"
                  >
                    <span className="telemetry text-paper/40">0{i}</span>
                    <span className="font-display text-2xl font-bold tracking-tight">{item.label}</span>
                    {pathname === item.href && <span className="size-2 self-center rounded-full bg-red" />}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-site telemetry shrink-0 pb-8 text-paper/40">Prinorbis · Move first.</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
