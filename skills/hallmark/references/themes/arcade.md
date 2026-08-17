# Theme - Arcade

Retro-nostalgia in the **playful** cluster: a coin-op cabinet, rendered as an object rather than a costume. A deep aubergine-black screen carrying **a real CRT stack (aperture grille, scanline, vignette, phosphor bloom)**, marquee lettering across the top, **ember and acid** side-art geometry, and pixel type kept where pixel type belongs: the HUD. Loud, warm, and built, not neon-sprayed.

The material, in one line: **an aubergine CRT with a visible grille, marquee lettering, ember-and-acid cabinet art, and a pixel HUD.**

> **What changed and why.** Magenta-and-cyan on a radial-gradient starfield is the default costume every model reaches for when it hears "retro", and pixel type set at paragraph length is the fastest way to make a page unreadable. Both are banned here. The retro is carried by the screen itself, by the lettering, and by the geometry of cabinet side-art.

## Axes (diversification)

- **Paper band** - **dark**, deep aubergine-black `--color-paper: oklch(15% 0.035 315)`, with every neutral carrying hue 315: raised panel `oklch(19% 0.035 315)`, rule `oklch(32% 0.04 315)`, ink `oklch(95% 0.014 315)`, muted `oklch(70% 0.02 315)`. Never pure `#000` or `#fff`.
- **Display style** - **pixel display plus marquee lettering**: Bungee for marquee strings, Silkscreen for the HUD. The only bitmap face in the catalog, now paired with sign lettering instead of carrying the whole page.
- **Accent** - **two neon inks from the chosen colourway**, one leading and one answering, alternated so neither floods. Default is **chromatic-ember** (`--color-accent: oklch(66% 0.215 40)`) leading with **acid** (`--color-accent-2: oklch(88% 0.195 115)`) answering. `--color-accent-ink` is the ground itself: dark text on the bright fills.

## Three dials

**Arcade is built from three independent choices, and a page states all three.** They multiply to twenty-seven machines, so two Arcade pages should never read as the same cabinet in a different colour. **Two Arcade pages in one run must differ on at least two of the three dials.**

### 1. The cabinet (the geometry)

The side-art motif. It appears in the marquee, in one full-bleed panel, and as small terminals on rules. Drawn in CSS gradients and clip-paths, never as an image.

| motif | the geometry |
|---|---|
| **chevron** (default) | Stacked chevrons and speed lines running off the edge, lead over answer, angled at a consistent 22 degrees. |
| **starburst** | Rays from a single off-canvas origin, alternating the two inks, with a hard circular cut where they meet the content. The origin moves between panels so the angle never repeats. |
| **checker** | A hard checker field fading by row into the ground, plus one solid diagonal band. Squares snap to an 8px module. |

### 2. The colourway (the paint)

Two inks per page and no more. The lead does the loud work (marquee bloom, primary press surface, side-art foreground); the answer does the counterpoint (HUD alternation, press shadows, the second plane of the motif).

| colourway | lead | answer | the machine it is |
|---|---|---|---|
| **ember** (default) | `oklch(66% 0.215 40)` | `oklch(88% 0.195 115)` | Orange-red over lime, the loud late-cabinet side-art palette. Warm on warm, highest energy. |
| **sodium** | `oklch(80% 0.165 72)` | `oklch(60% 0.145 242)` | Amber over petrol blue, the street lamp outside against the dark. Warm lead, cold answer: the quietest of the three. |
| **oxblood** | `oklch(83% 0.150 90)` | `oklch(52% 0.200 25)` | Gold over deep red, brass and lacquer. The older, richer machine; the answer is dark enough to sit under paper text. |

The ground shifts a hair with the paint so the page never reads as a recolour: ember on `oklch(15% 0.035 315)`, sodium on a cooler `oklch(14% 0.030 300)`, oxblood on a warmer `oklch(16% 0.028 330)`. Every neutral still carries its ground's hue.

### 3. The screen (the tube)

Which CRT the page is being seen on. This is layer 1 of the stack below; layers 2 to 4 are unchanged.

| screen | layer 1 |
|---|---|
| **grille** (default) | Aperture grille: 1px vertical red, green, and blue stripes at very low alpha. Sharp and modern. |
| **mask** | Shadow mask: an offset triad dot lattice built from three `radial-gradient` layers on a staggered 3px pitch. Softer, older, slightly bloomier. |
| **damper** | The grille plus two **damper wires**: fixed 1px dark horizontal lines at roughly one third and two thirds of the viewport height, the shadow the tension wires cast on a Trinitron. Never more than two, never animated. |

## Reference register

The cabinet itself: silk-screened side art, the lit marquee, the instruction card glued beside the controls, the attract screen cycling high scores, the bezel-printed control legend. Late-cabinet-era colour, which was warm (reds, oranges, yellows) far more often than it was cyan. The material to match: a machine that has been in a room, under lights, with fingerprints on it. Never name any specific title, studio, or brand in the output.

## Typography

Three families, each with one strict job. Do not let them trade places.

- **Marquee** - Bungee 400, uppercase, for **strings under about 24 characters only**: the wordmark, the marquee band, section numbers, one or two headline words. Never a sentence, never body, never a paragraph heading longer than a few words.
- **Headings and body** - Chivo 400/700/900. Section heads at 900 with `-0.02em` tracking; prose at 400, `line-height: 1.6`. Chivo does all the actual reading work.
- **HUD** - Silkscreen 400/700, uppercase, tracked `0.06-0.14em`, alternating ember and acid. It sets the score strip, credits, rank chips, initials, table headers, units, folios, and status. **Silkscreen never sets a heading, a paragraph, or anything longer than about five words.** This is the theme's single most common failure.

## The CRT stack

**Applied once, at page level, never per component.** Four layers, in this order, all `pointer-events: none`:

1. **The tube structure** - whichever of grille, mask, or damper the third dial chose, at very low alpha. This is the only layer the dial touches.
2. **Scanline** - a horizontal `repeating-linear-gradient`, 2px transparent to 1px dark, at low alpha over the grille.
3. **Vignette** - a `radial-gradient` darkening the corners, so the sheet reads as a curved screen rather than a flat page.
4. **Phosphor bloom** - a tight coloured glow, `text-shadow` at 0.02-0.06em blur in the element's own accent, on marquee lettering and HUD text **only**. Never on body copy.

**Gate-47 carve-out:** the grille, scanline, vignette, and bloom are the sanctioned retro signal. They are decorative, never block input, and never become a monitor bezel, a browser frame, or a fake window. Budget and portable recipe: [`texture.md`](../texture.md) § Scanline.

**The RGB split** is the theme's signature on type: marquee lettering carries a 1-2px red offset and a matching cyan offset in the opposite direction, zero blur, the real chromatic aberration of a colour tube. This replaces the flat single-colour drop shadow, which is banned.

## The kit

- **The marquee.** A full-bleed band across the top of a section, lit: the page's name or a section's name in Bungee, bloomed, on a panel a step lighter than the ground, with the cabinet motif running off both ends and a 2px rule under it. One per page for the page's own name; a smaller marquee may head one other section.
- **The side-art panel.** A full-bleed or half-width panel of the chosen motif's geometry, drawn in CSS, carrying one short line of Bungee or a heading and nothing else. This is the theme's poster moment, the counterpart to a plate: pure geometry, no explanation.
- **The attract screen.** A section that behaves the way a cabinet does when nobody is playing: a ranked table with pixel initials, a rank column in HUD voice, a blinking prompt (one element on the page may blink), and figures in tabular numerals.
- **The instruction card.** A bordered panel in plain Chivo, 2px rule, no bloom, set like the card glued next to the controls: numbered steps, plain language, deliberately quiet against everything around it. It is the page's readable centre.
- **The HUD strip.** A thin bar, 2px rules top and bottom, carrying score, credits, level, or status in Silkscreen, alternating ember and acid.
- **The control legend.** A small figure mapping actions to controls, drawn from borders and squares, captioned in HUD voice.
- **The press surface.** Every interactive surface carries a solid `Npx Npx 0` shadow in ember or acid with a 2px ink border. `:hover` moves away from the shadow (grows to 8-9px); `:active` slams toward it (2px). A physical press, zero blur.

## Material

- **Every section carries a constructed object**: a marquee, a side-art panel, an attract table, an instruction card, a HUD strip, or a control legend. A band of prose with nothing built in it has failed the theme.
- **The instruction card is mandatory.** At least one section on every page is quiet, unbloomed, plainly set Chivo. A page that is loud everywhere is unreadable, and the contrast is what makes the loud parts land.
- **Chunky 2px rules, near-square radii.** Structure is drawn with 2px borders, not hairlines. `--radius-card: 4px`, `--radius-pill: 0`. Depth is hard shadow and thick rule, never blur.
- **Two accents alternating.** Ember leads, acid answers, and they swap from beat to beat so neither dominates. Never a third.
- **Figures are tabular** wherever they are ranked or compared: scores, times, counts.

## Motion

Near-static, and mechanical when it moves.

- **Press physics**: hard-shadow surfaces translate 2-3px on `:hover` and `:active` over 120ms `ease-out`, and the border brightens.
- **One blink** on the page, `steps(1)` at about 1.06s, on a single attract-screen prompt or caret. Not two.
- **RGB split widens** by 1px on hover for interactive marquee lettering, and only there.
- The grille, scanline, and vignette are static. **No parallax, no autoplay, no bounce, no scroll reveals, no animated starfield.**
- Focus is a 3px acid ring at 4-5px offset. `prefers-reduced-motion: reduce` stops the blink, the split shift, and every transition, static and fully visible.

## Do-nots (this theme's own failure modes)

- **Never body copy or headings in Silkscreen.** Pixel is HUD and labels only, under about five words. This is the single most common Arcade failure.
- **Never magenta-and-cyan as the accent pair, and never a radial-gradient starfield.** Both are the default retro costume and both are banned. The screen is the texture; the colourway's two inks are the paint.
- **Never mix colourways, motifs, or screens on one page.** Three dials, set once, stated in the stamp. A page that borrows the sodium answer into an ember build has two answers, which is a third accent by another name.
- **Never a flat single-colour drop shadow on display type.** The type artifact is the RGB split, which is what a colour tube actually does.
- **Never fake OS or window chrome** (gate 47): no monitor bezels, browser or title bars, traffic-light dots, or "app window" surfaces, and never the CRT stack applied to a component so it reads as a screen inside a screen.
- **Never a rainbow.** Exactly two accents alternating. No third, no RGB spread.
- **Never a soft or blurred shadow on a surface, and never a gradient fill on a button.** Shadows are hard zero-blur offsets; the button is flat with a 2px ink border.
- **Never bloom body copy.** Glow belongs to marquee lettering and HUD text; prose stays clean or the page becomes unreadable.
- **Never arcade emoji or clip-art**, and never pure `#000` or `#fff`. Every neutral carries hue 315.

## Voice range

Playful, coin-op, plain. Short and declarative; name the credit, the night, the machine, the buzzer. The instruction card is written like instructions, not like marketing. Never: seamless, robust, cutting-edge, leverage, synergy, revolutionary, unlock, supercharge, next-level, gamechanger, epic as filler. Never "click here." Never lean on *level up*, *8-bit*, or *16-bit* as filler; earn the retro through the screen and the lettering.

## How Arcade differs from its neighbours

| vs | difference |
|---|---|
| **Hum** (playful sibling) | Hum is **light** cream, a rounded sans, 20px radii, pear-yellow plus cyan plus coral, spring motion. Arcade is **dark** aubergine, marquee and pixel lettering, 4px and 0 radii, ember plus acid over a CRT stack, hard-offset press. Same cluster, opposite build: soft-warm-daylight vs lit-cabinet-night. |
| **Terminal** | Terminal is green-black with mono for everything including body, phosphor green, calm reading. Arcade is aubergine hue 315, marquee lettering with a **Chivo body**, ember and acid, and a grille rather than a phosphor field. A readable green editor vs a lit cabinet. |
| **Carnival** (loud sibling) | Carnival is **light** pink-cream, Big Shoulders condensed, mustard and oxblood, hard-offset shadow on a poster layout. Both are loud with hard shadows; Carnival is a warm daylight fairground, Arcade is a dark room with one machine lit in it. |
| **Manifesto** | Manifesto is a dark ground with uppercase Anton and one red, arguing in type alone. Arcade is a dark ground built as an object: geometry, a screen texture, a HUD, and a quiet instruction card. Statement vs machine. |

## When the brief routes here

*game jam · indie game · game studio · launch party · demo night · hackathon · festival · meetup · retro · pixel · arcade · nostalgia · playful launch · music, synth, or lo-fi toy · zine · club night*. Categories: games, creative events, community, music and audio toys, indie tools with personality. Tone: playful, loud, retro, nostalgic, fun, irreverent, high-energy, night.

Calm, corporate, or trust-led briefs route to Cobalt or Coral; sustained editorial reading routes to a warm-editorial theme. Arcade is for pages that want to feel like a machine in a dark room.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Bungee&family=Chivo:wght@400;700;900&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet" />
```

The palette tokens come from `[data-theme="arcade"]`. The decorative vars below are **page-local**: define them in your own `:root` (gate 48 allows page-defined tokens).

```css
html, body { overflow-x: clip; }
body { background-color: var(--color-paper); color: var(--color-ink);
       font-family: var(--font-body); line-height: 1.6; }

/* THE CRT stack: grille, scanline, vignette. One layer, page level, never per component. */
body::after {
  content: ""; position: fixed; inset: 0; z-index: 40; pointer-events: none;
  background-image:
    repeating-linear-gradient(to right,
      oklch(63% 0.24 25 / 0.05) 0 1px, oklch(80% 0.25 140 / 0.05) 1px 2px,
      oklch(60% 0.24 265 / 0.05) 2px 3px),
    repeating-linear-gradient(to bottom,
      transparent 0 2px, oklch(0% 0 0 / 0.16) 2px 3px),
    radial-gradient(120% 90% at 50% 50%, transparent 55%, oklch(0% 0 0 / 0.45) 100%);
}

/* Marquee lettering: RGB split, zero blur, plus a tight bloom */
.marquee {
  font-family: "Bungee", sans-serif; text-transform: uppercase;
  color: var(--color-ink);
  text-shadow: -1.5px 0 0 oklch(63% 0.24 25), 1.5px 0 0 oklch(78% 0.14 200),
               0 0 0.05em var(--color-accent);
}

/* HUD: pixel, short strings only, alternating inks */
.hud { font-family: "Silkscreen", monospace; text-transform: uppercase;
       letter-spacing: 0.1em; font-size: 12px; color: var(--color-accent-2); }

/* Hard-offset press - zero blur, radius 4px */
.btn { background: var(--color-accent); color: var(--color-accent-ink);
  border: 2px solid var(--color-ink); border-radius: 4px;
  box-shadow: 6px 6px 0 var(--color-accent-2);
  transition: translate 120ms ease-out, box-shadow 120ms ease-out; }
.btn:active { translate: 3px 3px; box-shadow: 2px 2px 0 var(--color-accent-2); }

/* The instruction card: the quiet, unbloomed centre of the page */
.card { background: var(--color-paper-2); border: 2px solid var(--color-rule);
        border-radius: 4px; text-shadow: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

Arcade supplies the screen, the lettering, the cabinet art, and the press. What the machine is running is the brief's business, not the theme's.
