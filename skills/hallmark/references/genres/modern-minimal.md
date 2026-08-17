# Genre — modern-minimal

For the polished enterprise / dev-tool / API page. Stripe / Linear / ElevenLabs school: Geist sans, large confident displays, generous whitespace, pill CTAs, monochrome with optional accent. Minimalism with conviction, not the absence of choice.

## When to pick it

Brief mentions any of: *SaaS, enterprise, API, platform, developer tool, infra, B2B, dashboard, billing, Stripe-like, Linear-like, ElevenLabs-like, dev experience, ship fast*. Also pick when the user names a brand colour but the rest of the brief is restrained.

## Themes that belong

`Coral` (canonical) — warm-grey paper, single warm coral accent, Geist throughout, soft pill CTAs. The "Stripe-not-Linear" warmth.

`Cobalt` — the cool dev-tool / API / docs register (the GitBook + Firecrawl school, executed **cobalt-on-light, not orange**). Cool engineered near-white paper, one electric cobalt signal accent, Space Grotesk display + Inter body + JetBrains Mono code, ruler-drawn hairlines, tight 6 px radii, a bordered ⌘K nav, and a live code/API request–response hero. The technical, instrument-panel sibling to Coral's warmth — the rotation walks Coral ⇄ Cobalt when modern-minimal is active.

The two differ on every axis a glance registers: Coral is warm-grey + coral + Geist + pills; Cobalt is cool-white + electric blue + Space Grotesk/mono + tight-radius bordered controls. `Ledger` joins as the cluster's one dark option: a ruled navy account book (banded, columnar, or journal), Instrument Sans over tabular IBM Plex Mono, and two inks with one job each - teal for credits and matched rows, brass for debits and pending ones, never red. Totals close under a double rule and every figure states its as-of. Data-as-hero, the same restraint executed dark, which also gives the rotation a dark-vs-light lever inside the genre. It is a book, not a dashboard: no KPI card grids. Future themes can join too - anything monochrome or near-monochrome with an Inter-class sans display and a single restrained accent.

## Voice

- **Display** — Geist Sans 500–700, Inter Tight Display 600+, or similar. Letter-spacing tight (`-0.02em` to `-0.035em`).
- **Body** — Geist Sans 400, Inter 400. Same family as display (single-family discipline).
- **Accent** — monochrome (accent IS ink) or a single restrained hue used only on focus rings. No chromatic floods.
- **Layout** — two-column heroes (title left, lede right), generous whitespace, refined card surfaces with subtle borders.
- **Motion** — minimal. Reveals are off; the page is composed.
- **Copy tone** — declarative, specific, technical. "Built for X" is not banned but must name the X concretely.

## What this genre allows

- **Pill-rounded CTAs** — both filled and outlined. Black-filled primary + white-outlined secondary is the canonical pair.
- **Pure white paper** (`#fff` / `oklch(100% 0 0)`) — gate 7 is loosened here.
- **Zero-chroma neutrals** — gate 22 is loosened here. The Stripe / ElevenLabs school is monochrome by design.
- **Two-column hero with title-left + paragraph-right** — explicitly canonical for this genre.
- **Refined card surface** with very subtle border (`oklch(91% 0 0)`) and 8 px radius.
- **Large, tight-set displays** (`clamp(2.5rem, 5vw + 0.5rem, 4.75rem)`).

## What this genre disallows

- **Italic serif body** — modern-minimal stays sans top-to-bottom.
- **Hairline-everything** — borders are thin but visible, not the editorial 0.5 px hairline aesthetic.
- **Asymmetric prose columns** — modern-minimal aligns left, justified to a regular grid.
- **Drop caps, fleurons, ornament** — none of it.
- **Bouncy / overshoot easings** — gate 12 universal applies strictly here.
- **Gradient text** — gate 2 universal. Stays banned.
- **Glassmorphism** — banned.

## Voice fixtures

- *"Built to ship."*
- *"The platform that scales with you."*
- *"From idea to production in an afternoon."*
- *"Thirty thousand teams build with X."*
- *"One API. Every channel."*

## Nav and footer voice

Product chrome fits here: a dense balanced bar, a floating pill, a mega-menu, a visible search pill, or vast space between a wordmark and one CTA. What fights the genre is broadsheet furniture (a masthead, a double rule) and a marquee footer.

These are affinities, not assignments. Nothing here mandates an archetype code: the nav and footer are yours to design, and gates 42-43 only ask that if you land on the industry default you name it in the stamp rather than arriving there by reflex. [`component-cookbook.md`](../component-cookbook.md) § Navigation and § Footers is a place to look when you want a starting point.

## Stamp signature

```css
/* Hallmark · genre: modern-minimal · macrostructure: <name> · theme: <name> · enrichment: <tier> · nav: <shape or N#> · footer: <shape or Ft#> */
```

## Reference register (for the LLM, not credited to anyone)

The aesthetic to match: confident sans display, clean white canvas, two-column hero, pill CTAs, mono accent. The user knows what this looks like when they see it. Do not name external sites in the output.
