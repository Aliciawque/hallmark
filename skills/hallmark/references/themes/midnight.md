# Theme - Midnight

Atmospheric, cool-nocturnal register: the page rendered in **cold azure moonlight rather than the genre's warm firelight**. A deep midnight-blue canvas, near-white cool ink, one azure signal, thin airy Geist display. It reads calm, spacious, cerebral - the small hours, not the golden hour.

The material, in one line: **one cold light on a blue-dark ground, and type thin enough to breathe.**

> **Why cool, not warm.** The atmospheric cluster defaults to warm blooms (Bloom terracotta, Lumen Night brass). Midnight is the deliberate **cool** exception: dark canvas, fade-only motion, generous void, but a single azure accent aimed at the cold-light lane. The blue chill is the differentiator, not a recolour of a warm sibling.

## Axes (diversification)

- **Paper band** - **dark, blue-tinted** (`oklch(15% 0.022 250)`, ~15% L, hue 250). A midnight blue with real chroma, never `#000`.
- **Display style** - **geometric-sans, thin** (Geist at `--display-weight: 300`, tracking `-0.03em`). Airy light-weight display, distinct from Bloom's weighty Geist 600 and from every serif sibling.
- **Accent hue** - **azure / cool cyan-blue** (`oklch(72% 0.16 220)`). A few degrees cyan of the blue ground, so it reads as a separate cold light rather than a brighter canvas. Clear of Cobalt and Lumen indigos (~256 / 268). Signal, never flood.

## Reference register

Linear (dark) · Raycast · Vercel dark mode · Resend dark · Cron / calendar dark · Perplexity dark · Diagram · cool nocturnal model playgrounds.

The material to match: a deep blue canvas, one cold signal, thin confident display, generous void. An observatory at 2 a.m. - a calm instrument lit by one distant azure light. Ask "does this feel like a cold clear night, or a warm-lit room?" Keep the former. Never name any of these in the output.

**Voice range:** cool, nocturnal, spare, a touch cerebral. Name the command or the number.

## Palette

- `--color-paper: oklch(15% 0.022 250)` - midnight blue, never void; the 0.022 chroma is load-bearing
- `--color-paper-2: oklch(20% 0.024 250)` / `--color-paper-3: oklch(25% 0.026 250)` - elevation
- `--color-ink: oklch(95% 0.008 230)` - cool near-white headlines
- `--color-ink-2: oklch(86% 0.010 230)` - body
- `--color-accent: oklch(72% 0.16 220)` - the one azure signal
- `--color-rule: oklch(33% 0.024 245)` - hairline seams; `--color-rule-2: oklch(48% 0.020 240)` for a brighter edge

Accent stays under 5% of any viewport: a link hover, the one primary button, focus rings, an active nav item, a single glowing numeral. Everything else is cool-white on blue-dark.

## Typography

- **Display** - Geist at `--display-weight: 300`, tracking `-0.03em`, `--text-display: clamp(2.75rem, 5vw + 1rem, 5.25rem)`. Light-weight display at large size is the theme's face: spacious, cold, calm. Never the genre-default 600.
- **Body** - Geist 400/500, `--measure: 60ch`.
- **Label** - Geist Mono, UPPERCASE, `--tracking-label: 0.16em`. The cold machine-readout voice: captions, meta rows, status, kbd hints, table headers, units.
- **Serif** - Instrument Serif is available for one roman moment, a single large numeral or a pulled line. **Roman only, never italic**, and never the running display; Geist thin owns that.

## Material

- **A single cool glow.** One fixed radial gradient, low or behind the focal type, azure hue ~220-240 at low chroma, fading into the paper like light on a night horizon. Fixed-attached, never animated. Cold light only, and only one.
- **Layered dark surfaces, faint hairlines.** Depth comes from `paper` / `paper-2` / `paper-3` separated by 1px `--color-rule`. Surfaces float on the elevated layers and hairlines draw the seams. No drop-shadow theatre.
- **Radius** - small and even (`8px` controls). Neither pill-soft nor ruler-sharp.
- **Void** - `--section-gap: 6rem`. The dark and the space do the work; let the type breathe.

## Motion

**Motion character: brisk (0.9×).** Fade only, composed and slow. Reveals fade and rise ~10px, once. Hover: an azure underline-grow on links, a 1px border shift to `--color-accent` on focusable surfaces. No slide, no bounce, no parallax, no autoplay; the atmosphere carries it. Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships static and fully visible.

## Do-nots (this theme's own failure modes)

- **Never a warm accent** (amber, orange, terracotta, gold). That is Bloom and Lumen Night. Midnight is azure hue 220.
- **Never a heavy display weight.** Stay at 300; Geist 600 is Bloom's face.
- **Never a serif display.** Geist thin is the display; Instrument Serif is a roman accent moment only.
- **Never a light-paper section.** Midnight is dark throughout; do not sneak a white band in.
- **Never juggle warm and cool light.** One cool glow, single hue family, no second light.
- **Never an aurora of many hues.** Two overlapping blooms is Aurora's move; Midnight is one azure light.

## How Midnight differs from its neighbours

| vs | difference |
|---|---|
| **Cobalt** | A **light** engineered canvas, Familjen Grotesk, a literal code hero, hue 256. Midnight is a **dark** blue canvas, thin Geist 300, a diffuse cool glow, hue 220. Light vs dark, code-hero vs atmosphere. |
| **Lumen** | Warm brass on violet (or light indigo), Instrument Serif *display*, one *built* light artefact. Midnight is cool azure, Geist thin, a soft diffuse glow. Warm-serif-apparatus vs cool-thin-sans atmosphere. |
| **Aurora** | Blooms cyan and teal-green and runs a Sentient serif body on a deeper ground. Midnight is all-Geist, more restrained, one azure *signal* rather than a blooming field. Serif-body-blooms vs all-sans-restraint. |

## When the brief routes here

*AI tool · generative · model playground · render · pipeline · observability · dark mode · nocturnal · late-night · after-hours · moody · cinematic · cerebral · midnight · azure · calm-technical*. Categories: AI creative tools, generative model UIs, dev tools with a moody register, data and observability consoles, cool nocturnal SaaS. Tone: cool, calm, nocturnal, spacious, cerebral, quiet-confident.

Warm, consumer, editorial, or image-led-light briefs route elsewhere (Bloom or Lumen Night for warm atmospheric, Cobalt for a light code tool). When the brief wants dark **and cold**, it is Midnight.

## Build hint

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif&display=swap" rel="stylesheet" />
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-ink-2);
       font-family: var(--font-body); font-weight: 400; }

/* One fixed cool glow - the whole canvas treatment */
body::before { content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background: radial-gradient(60% 45% at 50% 82%,
              oklch(30% 0.06 230 / 0.55), transparent 70%); }

/* Thin airy display */
.display { font-family: var(--font-display); font-weight: var(--display-weight);
           letter-spacing: var(--tracking-display); font-size: var(--text-display); }

/* Mono label voice - captions, meta, status, units */
.label { font-family: var(--font-label); text-transform: uppercase;
         letter-spacing: var(--tracking-label); color: var(--color-muted); }

/* The one azure signal */
.btn--primary { background: var(--color-accent); color: var(--color-paper);
                border-radius: 8px; }
a:hover { color: var(--color-accent); }

/* Reveal - fade only */
.reveal { opacity: 0; transform: translateY(10px);
          transition: opacity .6s ease, transform .6s ease; }
.reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

Plus one `IntersectionObserver` adding `.is-in`. Midnight supplies the ground, the one light, and the thin voice; what stands in that light is the brief's business.
