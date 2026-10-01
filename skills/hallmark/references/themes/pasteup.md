---
name: Paste-up
slug: pasteup
genre: playful
paper: mid 82 80
display: display-condensed Anton
accent: warm 28
posture: committed
keywords: zine, fair, market, festival, print fair, book fair, exhibitors, riso, punk, diy, collective, gig, poster, workshop, night market, flea, indie, community, launch, loud
material: kraft board with a fibre wash, pasted ink blocks and cut paper strips at a slight tilt, tape, a round sticker, a rubber stamp, halftone prints, a serif galley for the reading
signature: the headline pasted up as tilted ink blocks with one white cut-out word, taped down
---

# Paste-up

Kraft board under a fibre wash, headline words pasted as tilted ink blocks with one word cut out in white, tape over a corner, a Newsreader galley for the reading, and a rubber stamp that carries a date.

## Tokens

```css
:root {
  --color-paper: oklch(82% 0.03 80); --color-paper-2: oklch(74% 0.035 80); --color-paper-3: oklch(97% 0.01 90);
  --color-ink: oklch(18% 0.01 60); --color-ink-2: oklch(28% 0.012 60); --color-muted: oklch(36% 0.02 60);
  --color-rule: oklch(60% 0.03 75);
  --color-accent: oklch(55% 0.21 28); --color-accent-deep: oklch(42% 0.17 28); --color-accent-ink: oklch(97% 0.01 90);
  --color-tape: oklch(88% 0.09 95 / 0.72); --color-focus: oklch(55% 0.21 28);
  --font-display: "Anton", Impact, sans-serif; --font-body: "Newsreader", Georgia, serif;
  --font-outlier: "Space Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 0 oklch(18% 0.01 60 / 0.18), 0 4px 10px oklch(18% 0.01 60 / 0.10);
  --shadow-sheet: 0 14px 30px oklch(18% 0.01 60 / 0.22), 0 2px 4px oklch(18% 0.01 60 / 0.12);
  --tracking-display: 0.005em;
}
```

Three boards, stated in the stamp (`pasteup: kraft`).

| Board | Ground, ink, red |
| --- | --- |
| **kraft** (default) | the tokens above; fibre at 0.5, multiply |
| **black wall** | ground `oklch(21% 0.012 60)`, ink `oklch(94% 0.012 90)`, muted `oklch(70% 0.015 80)`, red `oklch(62% 0.22 28)`; fibre at 0.35, screen |
| **sugar paper** | ground `oklch(84% 0.04 235)`, ink `oklch(22% 0.03 260)`, muted `oklch(45% 0.03 255)`, red `oklch(50% 0.19 48)`; fibre at 0.4, multiply |

## Faces

- **Display:** Anton 400 uppercase, line-height 0.92, `--tracking-display`, pasted one word per block. Never below 28px.
- **Body:** Newsreader 400 and 500 at 17px. The margin scrawl is Newsreader italic at 24px in `--color-accent-deep`, tilted -5°, beside a head and never inside one.
- **Labels, captions, table heads, meta, controls:** Newsreader 500 one step smaller, sentence case. Space Mono sets only the price strip's figures and code; a control is never mono.

## Material

- Two textures: the fibre wash (turbulence tinted tan, multiplied over the board, `texture.md` § 1) and a 9px halftone dot field inside every print (§ 2). Nothing else is worn.
- Pasted blocks: an ink-filled block behind each display word at its own `--r` between -2° and 2°, with a 2px zero-blur drop; the cut-out word is the same word on the white sheet, tilted the other way (the signature; stamp `waive 38iii`; one per page). Tape is a translucent yellow rectangle.
- Shadows are paper lifts (`--shadow-card` on slips, `--shadow-sheet` on a sheet); tilt 0.5° to 3°; radius 0 except the sticker and the stamp.
- The control pair: an ink-filled primary with a hard `4px 4px 0` accent offset beside a white-sheet secondary with a hard ink offset, both Newsreader 500 at 15px.
- Objects: the round sticker (accent, display face, -12°), the rubber stamp (a `4px double` accent ring; a stamp carries a fact, a date or a frame number, or does not appear), the price strip, the taped print (a white sheet, halftone inside).

## Motion

Paper physics only: a button drops 1px into its offset on hover and 4px on press over 90ms. Nothing floats, nothing reveals.

## Voice

Flyer voice: the date, the door, the price, the table number.

## Do-nots

- Never more than three tilted objects in a viewport.
- Never Anton on running text or under 28px.
- Never a soft blurred shadow under a block.
- Never a grunge overlay or a torn edge.
- Never an italic word inside a head.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

```css
body { position: relative; isolation: isolate; }
body::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0.5; mix-blend-mode: multiply; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.03' numOctaves='3' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0.55 0 0 0 0 0.45 0 0 0 0 0.3 0 0 0 0.28 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E"); }
.display { font-family: var(--font-display); text-transform: uppercase; line-height: 0.92; letter-spacing: var(--tracking-display); }
.block { display: inline-block; background: var(--color-ink); color: var(--color-paper); padding: 0.06em 0.26em 0.02em; line-height: 1.04; transform: rotate(var(--r, -1deg)); box-shadow: 0 2px 0 oklch(18% 0.01 60 / 0.15); }
.block--cut { background: var(--color-paper-3); color: var(--color-ink); transform: rotate(2deg); }
.btn { font: 500 15px var(--font-body); padding: 13px 18px; background: var(--color-ink); color: var(--color-paper); box-shadow: 4px 4px 0 var(--color-accent); }
.btn--sheet { background: var(--color-paper-3); color: var(--color-ink); box-shadow: 4px 4px 0 var(--color-ink); }
.price { font: 700 13px var(--font-outlier); font-variant-numeric: tabular-nums; }
.print { position: relative; background: var(--color-paper-3); padding: 12px 12px 42px; box-shadow: var(--shadow-sheet); transform: rotate(var(--r, -2deg)); }
::selection { background: oklch(55% 0.21 28 / 0.3); }
```
