# Prinorbis Technologies website

Marketing site for Prinorbis: AI strategy and transformation consulting plus the Orbis Agents product line (Agentic CFO first).
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Design direction

The site follows the reference design's flow: every visit travels the engagement path
**Launchpad → Discover → Prove → Launch → Orbit**. As you scroll, the ground deepens from warm paper to steel,
brand blue and finally navy night, and a dashed trajectory rail on the right carries the red "first point" down the page.
The header shows the current chapter (for example `02 · PROVE`) and flips to dark over dark sections.

- **Colours** come from the logo: petrol blue `#045475`, signal red `#F11123`, on warm paper `#F4F2EE`,
  with deep navy `#061722` for the dark chapters. Tokens live in `src/app/globals.css`.
- **Red is the first point**: use it once per view (a dot, a live indicator, the full stop on a headline).
- **Type**: Sora for headlines, Geist for text, Geist Mono for the small uppercase "telemetry" labels.
- **Logo**: the hex mark is rebuilt as SVG in `src/components/brand/Mark.tsx`; the wordmark PNGs in
  `public/brand/` are cut from the supplied logo file.

## Pages

| Route | What it is |
|---|---|
| `/` | Hero with orbiting agents, the "stall", the four-stage path, Orbis Agents + console, industries, mission brief |
| `/services` | The path in detail: Discover, Prove, Launch, Orbit with every offering, output and exit |
| `/agentic-cfo` | Product page: suite of five agents, how it fits, principles, early access list, FAQ |
| `/about` | The Princeps Orbis story, pillars, team |
| `/contact` | The mission brief (three questions, suggested stage, contact details) |

## Editing content

All copy is in `src/content/site.ts`: stages and services, Orbis Agents, the CFO suite, industries and use cases,
FAQs and team. Change text there; layouts pick it up automatically.

## Before launch

- **Lead delivery**: `src/app/api/lead/route.ts` only logs submissions. Connect it to email or a CRM.
- **Team**: the About page shows placeholder partner cards. Add real names, roles, bios and photos in `team`.
- **Agentic CRO / Agentic Insure**: taken from the reference brand system and marked "In development".
  Remove them from `orbisAgents` if the client only wants Agentic CFO shown for now.
- **Industry use cases** are suggested examples; confirm them with the client.
- Domain, analytics and an Open Graph image.
