# elefox studio — elefoxstudio.com

Marketing site for elefox studio (DBA of Tiffany Russell Studio LLC). Astro 5 + Tailwind v4, deployed to Railway, integrated with the existing client portal at `portal.tiffanyrussell.me`.

## What this is

**Phase 1.** Foundation pages, design system, deployable static site. No horizontal-scroll animations, no live forms, no AI chat yet — those are layered on in later phases per the spec.

Pages included:
- `/` — Home
- `/services` + `/services/{websites, software, brand, ai}` — Capability hub + four sub-pages
- `/pricing` — All tiers + retainers + terms
- `/audit` — Site & Brand Audit ($1k)
- `/about` + `/about/founder` — The studio + an honest founder page
- `/contact` — Inquiry form (UI only in v1; API wired in Phase 2)
- `/sign-in` — Redirect to the portal
- `/404`

## Stack

- **Astro 5** — server output, Node adapter (Railway-ready)
- **Tailwind v4** — `@tailwindcss/vite`, design tokens via `@theme` in `src/styles/global.css`
- **Manrope + Inter + JetBrains Mono** — Google Fonts (self-host in Phase 2)
- **No JS frameworks** — Astro components + a sprinkle of vanilla JS where needed
- **`@astrojs/sitemap`** — auto-generated sitemap, excludes `/lp/*`

## Run it

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static build to dist/
npm start            # node ./dist/server/entry.mjs (production)
```

## Project structure

```
src/
├── components/         # Header, Footer, Button, Container, ServiceHero, TierGrid, etc.
├── data/               # services.ts, nav.ts — content as data, not hardcoded
├── layouts/            # BaseLayout.astro
├── pages/              # Astro routes
└── styles/             # global.css (Tailwind + @theme tokens)
public/
├── brand/              # Logo PNGs (4 variants)
├── favicon.svg
└── robots.txt
```

## Design tokens

All defined in `src/styles/global.css` under `@theme`. Available as Tailwind utilities:

| Color | Hex | Utility |
|---|---|---|
| Forest | `#3f5a2e` | `bg-forest`, `text-forest`, `border-forest` |
| Forest Deep | `#2a3f1f` | `bg-forest-deep` |
| Forest Wash | `#eef1e9` | `bg-forest-wash` |
| Bone | `#f7f4ed` | `bg-bone` |
| Cream | `#efe9dd` | `bg-cream` |
| Ink | `#1a1f1b` | `text-ink` |
| Graphite | `#525551` | `text-graphite` |
| Mist | `#c9c7c0` | `border-mist` |
| Fog | `#e6e3dc` | `border-fog` |
| Ember | `#c8623a` | `bg-ember` (single warm accent) |

Custom radii: `rounded-pill` (9999px), `rounded-xl` (20px), `rounded-2xl` (28px).

## Open decisions to confirm

A few things I picked defaults on — easy to change once you weigh in:

1. **Forest green hex** — sampled `#3f5a2e` from the logo PNG. Want me to extract the exact value from the original Illustrator/Figma source?
2. **Type pairing** — Manrope (display) + Inter (body). Both Google Fonts for v1 speed. Alternatives: Söhne / General Sans / Cabinet Grotesk for display, all worth a look.
3. **Tagline** — *"Design, software, and the AI to keep it humming."* Used in hero. Other contenders are in the spec.
4. **Portal domain** — `/sign-in` currently links to `portal.tiffanyrussell.me`. Swap to `portal.elefoxstudio.com` when the portal's domain is updated.
5. **tiffanyrussell.me future** — not touching it yet. Decide whether to redirect → elefox or keep as personal landing.

## What's next (Phase 2)

- Live `/api/contact` — Resend send + portal `/api/leads` webhook with HMAC
- 6-step contact wizard (port from current site, add an "existing systems" step)
- Concierge chat carry-over (rebrand the Claude system prompt)
- Smart inquiry triage via Claude on each submission
- Newsletter signup (`/api/newsletter` → Resend audience)
- Dynamic OG image generation per route

## What's next (Phase 3)

- The four signature horizontal-scroll moments:
  - Home capabilities reel (pinned, four panels slide left)
  - Home process strip (5-step horizontal timeline)
  - `/work` index horizontal-scrolling rows by category
  - `/work/[slug]` case study story scroll
- `/process` full page
- Motion (motion.dev) integration + reduced-motion fallbacks
- Mobile carousel variants

## Deploy to Railway

1. Push this repo to GitHub
2. Create a new Railway project from the repo
3. Set env vars (see `.env.example`)
4. Custom domain: `elefoxstudio.com`
5. Railway will pick up `railway.toml` and build with `npm ci && npm run build`, run `node ./dist/server/entry.mjs`

## License

UNLICENSED — proprietary to Tiffany Russell Studio LLC.
