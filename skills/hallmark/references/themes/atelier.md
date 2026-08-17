# Theme - Atelier

The considered-object register: the Aesop / couture-masthead / gallery-placard school, rendered in **warm plaster and umber** - not cream, not grey. A near-neutral plaster ground, one **bold soft-contrast serif**, grotesk body, wide-tracked mono placards, and a single amber ember for the only warm signal. It reads hand-set and unhurried: an object *presented*, never sold.

The material, in one line: **plaster paper, a bold humanist serif, hairlines and air, one amber ember.**

## Axes (diversification)

- **Paper band** - light (94%). Plaster near-neutral: `oklch(94% 0.005 60)`, steps to `oklch(91% 0.006 60)` and `oklch(87% 0.008 55)`. Warm hue 60 held at almost-zero chroma - unbleached linen, distinct from Garden's oat (chroma 0.022) and Newsprint's tan (0.045).
- **Display style** - **roman serif** (Sentient). Sentient at weight **700**, tracking `-0.018em`: a soft-contrast humanist serif carrying real weight, its stems and serifs within one register of each other. Not a Didone, and deliberately not Specimen's razor-thin Bodoni Moda - the two sit at opposite ends of the contrast axis.
- **Accent hue** - warm umber (~40 deg, low chroma). The `--color-accent` is nearly ink-dark umber `oklch(22% 0.060 40)`; the one *visible* signal is `--color-accent-ink` / `--color-focus` = amber `oklch(45% 0.13 60)`.

## Reference register

Aesop · a couture fashion-house masthead · gallery and museum exhibition pages · Kinfolk / Cereal editorial · Studio Nicholson, The Row, Toteme · Frama, Byredo, Le Labo · an architecture-studio portfolio. **Never name any of these in the output.**

The material to match: the object presented under a dramatic serif crown with a spec-sheet caption - warm plaster canvas, hairline structure, one amber ember, imagery treated like a gallery print. Internally: *Aesop's product-as-object restraint* recoloured plaster-and-umber. When in doubt ask "does this read like a gallery placard, or like a product ad?" Keep the former.

## Palette

Canonical values live in [`site/css/tokens.css`](../../../../site/css/tokens.css) under `[data-theme="atelier"]`.

- `--color-paper: oklch(94% 0.005 60)` - plaster, never white; surfaces step to `91%` / `87%`
- `--color-ink: oklch(12% 0.024 40)` - warm near-black umber
- `--color-neutral: oklch(28% 0.014 45)` - body text
- `--color-accent: oklch(22% 0.060 40)` - near-ink umber, a fill block or a heavy rule, never a bright pop
- `--color-accent-ink` / `--color-focus: oklch(45% 0.13 60)` - the amber ember: a link underline, a focus ring, a drop cap, one `<mark>`
- `--color-rule: oklch(78% 0.006 55)` - hairline
- `--color-rule-2: oklch(56% 0.008 50)` - divider or double rule

The whole page reads unbleached-linen warm. Keep the amber under 4% of any viewport: this is warm-monochrome with one ember.

## Typography

The triad - bold humanist-serif display, neutral grotesk body, wide mono labels - **is** Atelier.

- **Display** - Sentient at `var(--display-weight)` = 700, tracking `-0.018em`, clamped to `6.25rem` via `--text-display`. One large weighted line carries the page's entire gravity; nothing competes with it. Sentient has no optical-size axis, so weight and scale are the only levers: hold 700 and let the size do the rest.
- **Body** - Hanken Grotesk 400/500 at `--lh-normal: 1.55` / `--lh-relaxed: 1.7`, `--measure: 56ch`. **Never set running body in the serif** (that move belongs to Newsprint).
- **Label** - IBM Plex Mono (`--font-label`), UPPERCASE, tracking `0.24em` (`--tracking-label`). The gallery-placard voice, carrying real values: material, dimensions, year, edition, captions, spec meta, folios. It labels an object; it never announces a heading.

**The drop cap.** The amber drop cap is Atelier's one piece of editorial ornament, and it is how a passage of prose opens: scale and colour do the work, no words are spent on it. One per page, first paragraph only. Working CSS is in the Build hint below.

## Material

- **Hairlines and generous air.** `--section-gap: 6.5rem`, `--page-max: 64rem`. Depth comes from rules and whitespace only: no boxed cards, no drop-shadows, no glass. Radius is 2-4px at most, and only on an outlined control.
- **No texture, no background pattern.** The plaster is the surface.
- **Imagery is a gallery print** - generous margin, hairline frame, never bled to the edge of a card. Controls are a text underline or a hairline outline, never a filled amber blob.

## Motion

**Motion character: calm (1.3×, very gentle).** Quiet and orchestrated. One entrance: a masked curtain-wipe (`clip-path`) or a plain fade on the display line, then static. Section reveals fade and rise ~10px, ease-out ~600ms, via a single `IntersectionObserver`. An amber underline grows on link hover. **No bounce, no parallax, no autoplay, no marquee.** Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships static and fully visible.

## Voice range

Hand-set, literary, object-precise, couture-calm. Verbs over adjectives; name the object, the material, the number made. Never *seamless, elevate, curated, bespoke, luxury, effortless, game-changing, must-have*. Never "shop now."

## Do-nots (this theme's own failure modes)

- **No bright saturated pop.** The umber accent is near-ink; amber is a whisper. No orange (Specimen), no oxblood (Newsprint), no green (Garden / Studio).
- **No serif running body.** Sentient in paragraphs reads broadsheet, which is a different theme.
- **No light or high-contrast cut.** Atelier's Sentient is BOLD (700) and soft-contrast. A thin cut with hairline serifs collides with Specimen's Bodoni Moda and reads generic-luxury.
- **No warm-tan or cream newspaper stock.** Plaster is chroma 0.005, not oat (0.022) or tan (0.045).
- **No boxed cards, drop-shadows, or glassmorphism.** Hairlines and air carry every surface.
- **No filled-pill or gradient CTA, no pure `#fff` / `#000`.**

## How Atelier differs from its neighbours

| vs | what settles it instantly |
|---|---|
| **Newsprint** (serif neighbour) | Newsprint is a Zilla **slab** + Spectral **serif body** + warm-tan stock (`oklch(92% 0.045 50)`) + oxblood. Atelier is a bold humanist serif + **grotesk body** + near-neutral plaster + amber whisper. Slab-vs-roman, body face, and paper warmth settle it. |
| **Specimen** (serif-display sibling) | Specimen is **razor-thin** Bodoni Moda (400 at opsz 96, a Didone's thick/thin extreme) + bright **orange** (`#FC4C02`) on warm oat. Atelier is **bold soft-contrast** Sentient (700) + warm-monochrome umber on plaster. Opposite ends of the contrast axis, and the accent hue confirms it. |
| **Garden** (same 94% paper band) | Garden is Young Serif + oat cream + living **leaf-green**, botanical and organic. Atelier is a bold plaster-and-umber serif with **no green** - gallery, not garden. |

## When the brief routes here

*fashion · atelier · couture · fragrance · gallery · exhibition · museum · ceramics · furniture · homeware · architecture studio · design studio · lookbook · collection · made by hand · craft · small-batch · brand story*. Categories: fashion and apparel brands, fragrance houses, galleries and museums, furniture and homeware, architecture and interior studios, considered B2C brand stories. Tone: refined, hand-set, warm-monochrome, gallery-quiet, unhurried.

Developer, enterprise, and dashboard briefs route elsewhere; loud-maximalist editorial routes to Carnival; broadsheet news routes to Newsprint.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=sentient@200,300,400,500,700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-neutral);
       font-family: var(--font-body); font-weight: 400; line-height: var(--lh-normal); }

/* The bold humanist serif - the page's whole gravity */
h1, .display { font-family: var(--font-display); font-weight: var(--display-weight);
               font-size: var(--text-display); letter-spacing: var(--tracking-display);
               line-height: var(--lh-tight); color: var(--color-ink); }

/* Wide-tracked mono placard - real values only, never a heading's announcement */
.placard { font: 500 0.75rem/1 var(--font-label); text-transform: uppercase;
           letter-spacing: var(--tracking-label); color: var(--color-muted); }

/* The amber drop cap - one per page, first paragraph only.
   Sentient at ~3 lines of body leading, optically nudged so its cap-height
   sits on the first baseline and its left edge aligns with the measure. */
.lede::first-letter {
  float: left;
  font-family: var(--font-display);
  font-weight: var(--display-weight);
  font-size: 3.9em;          /* ~3 lines at --lh-normal 1.55 */
  line-height: 0.82;
  padding: 0.06em 0.08em 0 0;
  margin-inline-start: -0.04em;   /* optical hang, left edge flush to the measure */
  color: var(--color-accent-ink); /* the amber ember */
}
@supports (initial-letter: 3) {
  .lede::first-letter { initial-letter: 3; float: none; font-size: inherit; line-height: inherit; }
}

/* Hairlines + the one amber ember */
.rule { border: 0; border-top: 1px solid var(--color-rule); }
a { color: inherit; text-decoration-color: var(--color-accent-ink); }
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }

/* Reveal - the whole motion engine */
.reveal { opacity: 0; transform: translateY(10px);
          transition: opacity .6s cubic-bezier(0.16,1,0.3,1),
                      transform .6s cubic-bezier(0.16,1,0.3,1); }
.reveal.is-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

The rest of the page is yours. Atelier supplies the plaster, the crown, and the ember; what gets presented on that paper is the brief's business, not the theme's.
