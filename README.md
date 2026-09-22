# Prinorbis website · Living systems

Marketing site for Prinorbis: AI strategy and transformation consulting plus the Orbis Agents product line
(Agentic CFO first). Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP, Lenis and three.js.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## The idea

Intelligence is grown, not built. Every page follows the growth path **Seed → Root → Network → Canopy**
(Discover, Prove, Launch, Orbit). Forest and bone carry the brand, sage supports, and the first point
brings the heat: signal lime on forest, flare on bone.

- **Colours**: forest night `#0B2219`, forest `#16432F`, sage `#8FAE96`, bone `#F4EFE4`, lime `#C8F03C`,
  flare `#E0572B`. Tokens live in `src/app/globals.css`.
- **Type**: Bricolage Grotesque for headlines, Instrument Serif italic for the one accent word, Geist for text,
  Geist Mono for the uppercase telemetry labels.
- **Logo**: `src/components/brand/Wordmark.tsx` is a temporary lowercase wordmark with lime i-dots, as in the
  reference design. The client is redrawing the logo; swap this one component when it lands.

## The living drawings

| Where | What | How |
|---|---|---|
| Home hero, Services hero | A root network grows live from a glowing seed, then lime pulses flow to the tips; tips brighten near the cursor | Space colonization on canvas (`living/colony.ts`, `living/GrowthCanvas.tsx`) |
| Home, the path | Pinned section: one plant grows seed, roots, underground network, canopy as you scroll | GSAP ScrollTrigger + DrawSVG (`home/PathGrowth.tsx`, `living/plant.ts`) |
| Agents | Cells that breathe, joined by mycelium threads carrying handoff pulses | Amoeba outlines recomputed each frame + GSAP MotionPath (`living/Cell.tsx`, `living/Mycelium.tsx`) |
| Industries | Growth rings draw outward; each industry sits on a ring | DrawSVG, scrubbed (`living/TreeRings.tsx`) |
| Agentic CFO | Five agent cells and your team around the ledger | `cfo/CfoColony.tsx` |
| About | Orbis: a globe with root veins and pulses, turning toward the pointer | three.js, lazy-loaded (`living/Globe.tsx`) |
| Everywhere | Lenis smooth scroll, masked line reveals, word-by-word scrub text, a root rail that grows down the right edge, film grain, a page curtain between routes | `layout/SmoothScroll.tsx`, `motion/*`, `layout/GrowthRail.tsx`, `app/template.tsx` |

All drawings are seeded, so server and client render the same shapes. Everything respects
`prefers-reduced-motion`: animations are skipped and each drawing shows its finished state.

## Pages

Every header item is its own page: `/services`, `/agents`, `/industries`, `/insights` (+ `/insights/[slug]`),
`/about`, plus `/agentic-cfo` and `/contact`.

## Editing content

All copy is in `src/content/site.ts`: stages, services, agents, the CFO suite, industries, insights, FAQs and team.

## Before launch

- **Logo**: replace `Wordmark.tsx` with the new logo.
- **Lead delivery**: `src/app/api/lead/route.ts` only logs submissions. Connect it to email or a CRM.
- **Insights**: the three field notes are drafts written for review. The client should approve or replace them.
- **Team**: the About page shows placeholder partner cards.
- **Agentic CRO / Agentic Insure**: shown as "In development", from the reference design. Remove from `orbisAgents` if not wanted.
- **Industry use cases** are suggested examples; confirm with the client.
