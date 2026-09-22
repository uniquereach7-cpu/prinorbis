/*
 * Re-mounts on every navigation, so the curtain plays each time a page
 * opens: a root line draws across the dark, then the curtain lifts.
 * Pure CSS, so the page is revealed even before JavaScript hydrates.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="curtain pointer-events-none fixed inset-0 z-[90] flex items-center bg-night">
        <div className="curtain-line relative mx-auto h-px w-[min(520px,70vw)] origin-left bg-sage/60">
          <span className="absolute top-1/2 right-0 size-2.5 translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_20px_4px_rgba(200,240,60,0.5)]" />
        </div>
      </div>
      <div className="page-in">{children}</div>
    </>
  );
}
