# Genre — editorial (default)

The canonical Hallmark voice. Pages built for content-led briefs: portfolios, manifestos, type specimens, agency sites, magazine pieces, indie podcasts, bakery / brand stories, considered B2C marketing.

This is what Hallmark looks like when no other genre signal fires. It is the silent default.

## When to pick it

Default. Pick editorial when the brief does not name a specialised aesthetic — when the user said "a landing page for X" without telling you whether X is enterprise, atmospheric, or playful. Most briefs land here.

## Themes that belong

`Specimen`, `Newsprint`, `Atelier`, `Garden`, `Almanac`, `Studio`, `Riso`, `Sport`, `Brutal`, `Manifesto`, `Editorial`, `Carnival`, `Grid`. Thirteen themes - plenty of variety inside the genre. `Grid` is the Swiss / neo-grotesque exception here: rational, exposed-grid, near-monochrome with one signal ink spent on geometry, where the rest are serif-led.

`Carnival` is the loud-maximalist editorial register — Dropout TV / Fly.io / Stones Throw / Third Man Records. Duo-tone accent system (mustard + oxblood), chunky variable display, decorative ornaments, hard-offset shadows. The loud sibling to Riso / Manifesto / Brutal.

## Voice

- **Display** — roman serif, condensed sans, or display-heavy. Not Inter. Not Geist. The weight commits to an extreme (300 or 700+). Italic is body-emphasis only — never the header face (global rule).
- **Body** — workhorse serif (Newsreader, Cormorant) or a plain non-default sans (The Future, Söhne). Readable at 45–75 ch.
- **Accent** — single warm or cool hue, used at < 5 % of any viewport.
- **Layout** — asymmetric. Hairlines, not card borders. Generous whitespace.
- **Motion** — quiet. One orchestrated entrance. No bounces.
- **Copy tone** — specific, hand-set, slightly literary. Verbs over adjectives.

## What this genre allows

- Hairline rules, fleurons, drop caps, double rules.
- Italic body in long-form content.
- Asymmetric column counts (2:5, 3:7) on prose pages.
- Hand-built SVG illustrations, pure-CSS art (Tier A enrichment).
- Numbered display labels, edge-aligned headlines.
- Single-accent-colour highlighting (`<mark>` band at x-height).

## What this genre disallows

The universal slop-test gates apply, plus these editorial-specific bans:

- **Pill-rounded buttons** with gradient fill — pill is fine, gradient on a pill is not.
- **Centred-everything heroes** (gate 6 universal). Editorial heroes are left-biased or asymmetric.
- **Card-in-card** layouts (gate 4 universal).
- **Three-column equal-icon-tile feature grid** (gate 3 universal).
- **Glassmorphism** — never; the medium is paper, not glass.
- **Pure black or pure white** as paper or ink (gate 7). Tint everything toward the anchor.

## Voice fixtures

Each macrostructure under editorial picks from these opening-line patterns. Imitate the *shape*, not the wording.

- *"Type, set with care."*
- *"Print discipline, on screen."*
- *"A small skill that argues against the average."*
- *"We compose the page like a broadsheet — hairlines, columns, restraint."*
- *"Restraint, repeated, becomes a signature."*

## Nav and footer voice

Broadsheet and specimen chrome fits here: a masthead, a quiet edge-aligned bar, a colophon, a letter close. What fights the genre is kinetic chrome (a marquee footer) and modern-minimal vocabulary (a floating blur pill).

These are affinities, not assignments. Nothing here mandates an archetype code: the nav and footer are yours to design, and gates 42-43 only ask that if you land on the industry default you name it in the stamp rather than arriving there by reflex. [`component-cookbook.md`](../component-cookbook.md) § Navigation and § Footers is a place to look when you want a starting point.

## Stamp signature

Output's CSS comment header reads:

```css
/* Hallmark · genre: editorial · macrostructure: <name> · theme: <name> · enrichment: <tier> · nav: <shape or N#> · footer: <shape or Ft#> */
```
