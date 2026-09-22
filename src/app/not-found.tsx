import { ButtonLink } from "@/components/ui/Button";
import { StageGlyph } from "@/components/living/StageGlyph";

export default function NotFound() {
  return (
    <section data-chapter="404 · Nothing grows here" data-tone="dark" className="on-dark relative flex min-h-svh items-center overflow-hidden bg-night text-bone">
      <div className="container-site relative grid items-center gap-10 py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="telemetry text-bone/50">Error 404 · Barren ground</p>
          <h1 className="display-xl mt-6">
            Nothing grows <span className="serif-accent text-lime">here.</span>
          </h1>
          <p className="lead mt-8 max-w-lg text-bone/65">This page is not part of the system. Head back to the seed and pick up the path from there.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" variant="lime" arrow>
              Back to the seed
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-dark">
              Talk to us
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-5">
          <StageGlyph stage="discover" tone="dark" className="mx-auto h-72 w-auto opacity-70" />
        </div>
      </div>
    </section>
  );
}
