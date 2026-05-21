# elefox studio — brand guide

The single source of truth for how elefox looks and sounds. The live, rendered
version lives at [`/brand`](src/pages/brand.astro) and pulls from the same design
tokens as the rest of the site (`src/styles/global.css`). Edit token values
there; this file is the plain-text reference.

---

## The name

**elefox** = elephant + fox.

- **Elephant** — memory and the long view. We build things meant to last and
  remember the details that matter to the people we work with.
- **Fox** — cleverness and resourcefulness. Small, sharp, adaptable. Craft over
  headcount.

---

## Logo

Four lockups, all in `public/brand/`:

| File | Use |
|------|-----|
| `logo-horizontal.png` | Headers, wide spaces, on light backgrounds |
| `logo-stacked.png` | Tight/square placements, on light backgrounds |
| `logo-horizontal-white.png` | Wide spaces, on dark backgrounds |
| `logo-stacked-white.png` | Tight/square placements, on dark backgrounds |

Editable source: `Brand/elefox-logo.ai` (not committed — see `.gitignore`).

**Clear space:** keep at least the height of the "e" clear on all sides.

**Don't:**
- Recolor the mark (use the supplied light/dark versions)
- Stretch, squash, or rotate it
- Add shadows, outlines, or gradients to the logo
- Place the light logo on a busy or low-contrast background
- Recreate the wordmark in another typeface

---

## Color

All exposed as Tailwind utilities (`bg-forest`, `text-ink`, etc.) via `@theme`.

### Forest — the core
| Name | Token | Hex | Use |
|------|-------|-----|-----|
| Forest | `forest` | `#3F5A2E` | Primary brand color. Buttons, links, focus rings |
| Forest Deep | `forest-deep` | `#2A3F1F` | Hover/pressed, deep backgrounds |
| Forest Wash | `forest-wash` | `#EEF1E9` | Soft tints, active nav pills, hover fills |

### Ink & neutrals
| Name | Token | Hex | Use |
|------|-------|-----|-----|
| Ink | `ink` | `#1A1F1B` | Headlines, dark sections, primary text |
| Graphite | `graphite` | `#3A3E3A` | Body copy, secondary text |
| Mist | `mist` | `#C9C7C0` | Borders, dividers, muted UI |
| Fog | `fog` | `#E6E3DC` | Hairline borders, lightest division |

### Surfaces
| Name | Token | Hex | Use |
|------|-------|-----|-----|
| Bone | `bone` | `#F7F4ED` | Default page background (carries a subtle paper grain) |
| Cream | `cream` | `#EFE9DD` | Alternating section backgrounds |
| White | `white` | `#FFFFFF` | Cards/panels that lift off the paper |

### Accents — sparingly
| Name | Token | Hex | Use |
|------|-------|-----|-----|
| Ember | `ember` | `#C8623A` | The signature pop. Underlines, marks, accents |
| Signal | `signal` | `#7FA653` | Lighter green. Aurora fields, success, highlights |

Page-level backgrounds are warm paper (bone/cream), never pure white. Pure
white is reserved for cards.

---

## Typography

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Display / headings | **Manrope** | 700–800 | Tight tracking (`-0.025em` to `-0.04em`), short line-height |
| Body | **Inter** | 400 | 1rem, 1.6 line-height, color graphite |
| Labels / eyebrows / code | **JetBrains Mono** | 500 | Uppercase, `0.14em` tracking |

Utility classes: `.display-xl` (hero), `.lede` (intro paragraphs), `.eyebrow`
(section kickers).

> **Note:** `--font-script` (Caveat) exists in the tokens but is **banned
> brand-wide** — it reads as an AI-website cliché. Do not use it.

---

## Voice & tone

Sound like one capable person talking straight to one business owner.

**Principles**
- **Plain, not corporate.** Explain it like you would to a smart friend. Short
  sentences, real words.
- **Warm, not cute.** Friendly and human, but respect the reader's time.
- **Specific, not vague.** "A CRM that tracks your follow-ups" beats "a powerful
  solution."
- **Honest about fit.** Every service page has a "skip if" section. Rather say
  no than oversell.

**Hard rules (non-negotiable)**
- **No em dashes.** Reads as an AI tell. Use periods, colons, parentheses, commas.
- **Stay vendor-neutral on AI.** Don't name model providers in client copy.
  Say "AI agents" / "an LLM pipeline."
- **No template clichés.** No scrolling marquees, no "01/02/03" numbered
  steps, no left-bar accent cards.
- **Never fabricate the work.** Only real projects, described the way they
  actually happened. No invented metrics or dates.

---

## UI tokens

- **Radius:** `xs 2px · sm 4px · md 8px · lg 12px · xl 20px · 2xl 28px · pill 9999px`.
  Buttons are pill-shaped.
- **Shadows:** `shadow-soft` (resting cards), `shadow-lift` (hover/elevated).
- **Buttons:** variants `primary` (forest), `secondary` (bone + mist border),
  `ghost`, `link`. One primary action per view. Sizes `sm/md/lg`.
- **Motion:** calm and purposeful. Reveal-on-scroll (soft rise + fade),
  word-by-word headline splits. Easing: `--ease-out-quint` for settles,
  `--ease-spring` for playful accents. Always respect `prefers-reduced-motion`.

---

## Where things live

| Thing | Path |
|-------|------|
| Design tokens | `src/styles/global.css` (`@theme`) |
| Live brand page | `src/pages/brand.astro` |
| Logos (web) | `public/brand/` |
| Logo source (.ai) | `Brand/` (gitignored) |
| Buttons / Eyebrow | `src/components/Button.astro`, `Eyebrow.astro` |
