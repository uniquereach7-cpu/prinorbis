import { Chapter } from "@/components/ui/Chapter";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Chapter label="404 · Off trajectory" className="flex min-h-dvh items-center overflow-hidden bg-paper pt-[72px]">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="container-site relative py-24">
        <p className="telemetry text-ink-muted">Error 404 · Signal lost</p>
        <h1 className="display-xl mt-4 text-ink">
          Off trajectory<span className="text-red">.</span>
        </h1>
        <p className="lead mt-6 max-w-lg text-ink-muted">
          This page is not on the map. Head back to the launchpad and pick up the path from there.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to the launchpad
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Talk to us
          </ButtonLink>
        </div>
      </div>
    </Chapter>
  );
}
