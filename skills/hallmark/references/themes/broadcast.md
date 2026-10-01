---
name: Broadcast
slug: broadcast
genre: editorial
paper: mid 70 260
display: display-heavy Dela Gothic One
accent: warm 27
posture: full-palette
keywords: video, production, film crew, studio, live, streaming, podcast, tv, television, showreel, reel, post-production, event coverage, camera, cinematography, editing, media, news, channel, documentary
material: standard-grey ground under faint scanlines, wide heavy capitals, a black slate bar with a timecode, colour bars and a pluge strip, safe-area corner marks, a red tally and green on-screen text
signature: the black slate running the width of the page with a timecode, over a capture framed by four corner marks
---

# Broadcast

A standard-grey ground under faint scanlines, Dela Gothic One capitals, a black slate bar with a timecode in Azeret Mono, colour bars as a divider and a red tally that means recording. The signature is the slate with its timecode over a real capture framed by four corner marks.

## Tokens

```css
:root {
  --color-paper: oklch(70% 0.005 260); --color-paper-2: oklch(64% 0.005 260); --color-paper-3: oklch(20% 0.006 260);
  --color-ink: oklch(14% 0.006 260); --color-ink-2: oklch(24% 0.006 260); --color-muted: oklch(26% 0.006 260);
  --color-rule: oklch(14% 0.006 260); --color-white: oklch(98% 0.005 260); --color-screen: oklch(6% 0.005 260);
  --color-accent: oklch(63% 0.25 27); --color-accent-2: oklch(86% 0.24 142); --color-accent-ink: oklch(14% 0.006 260); --color-focus: oklch(86% 0.24 142);
  --font-display: "Dela Gothic One", Impact, sans-serif; --font-body: "Sofia Sans", ui-sans-serif, sans-serif;
  --font-outlier: "Azeret Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 4px; --rule-hair: 1px; --rule-bar: 2px; --shadow-card: none;
  --tracking-display: -0.005em; --scan: 0.18;
}
```

Three levels, stated in the stamp (`broadcast: grey`). The tally red and the bars never change. Text on `--color-paper-3` and on a screen is `--color-white`.

| Level | Ground, ink, on-screen text |
| --- | --- |
| **standard grey** (default) | the tokens above |
| **black level** | ground `oklch(12% 0.006 260)`, ink `oklch(96% 0.005 260)`, muted `oklch(68% 0.008 260)`, rule `oklch(30% 0.008 260)`; scanlines at 0.22 |
| **tungsten** | ground `oklch(90% 0.035 80)`, plate `oklch(25% 0.035 50)`, ink `oklch(20% 0.03 50)`, muted `oklch(42% 0.04 55)`, on-screen text amber `oklch(80% 0.16 75)`; scanlines at 0.12 |

## Faces

- **Display:** Dela Gothic One 400 uppercase, line-height 0.98, `--tracking-display`, roman. The outlined head (a 2px text stroke, no fill) is the second style, always a whole line, never one word.
- **Body:** Sofia Sans 400 and 500 at 15.5px; subheads 500 at 19px.
- **Labels, captions, table heads, meta:** Sofia Sans 500 one step smaller, sentence case. Azeret Mono is the readout: the timecode (tabular, `00:00:00:00`), the slate's fields, the on-screen tag, channel numbers and code.

## Material

- Scanlines once, fixed, over the page at `--scan`: a 1px dark line every 3px. No grille, no vignette, no bloom.
- Rules are `--rule-bar` in ink; radius 0; no shadows; surfaces are flat panels of ground, plate or screen. A screen is `--color-screen` with nothing over its picture but the tag and the marks.
- The slate: a 46px bar in ink with white readouts (a wordmark in the display face, then scene, take, timecode). Corner marks: four 22px L-shapes in `--rule-bar` strokes, 18px in from the edges of a real capture; one frame, real content inside, never around a drawn screen.
- Colour bars: seven equal columns in the standard order at 75% with the pluge strip below, full width, once, as a divider or a placeholder's ground.
- The control pair: an ink-filled primary with ground-coloured text beside a `--rule-bar` outlined ghost, both Sofia Sans 600 uppercase, untracked, following the display's capitals; the third control is the tally, an accent fill with a 10px dot that means recording.

## Motion

Cut, never dissolved. State changes swap in one frame; a timecode counts in frames while a screen plays; the tally blinks at 1s `steps(1)` only while live.

## Voice

Call-sheet plain: the day, the crew, the rate, the frame count. Verbs from the floor: roll, cut, book.

## Do-nots

- Never bars behind text or split up as card accents; they are one strip.
- Never a soft shadow, a radius or a gradient on a panel; panels are cut.
- Never the tally red as a heading or link colour; red means recording.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Sofia+Sans:wght@400;500;600&family=Azeret+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
body::after { content: ""; position: fixed; inset: 0; z-index: 6; pointer-events: none; opacity: var(--scan); background: repeating-linear-gradient(0deg, oklch(6% 0.005 260 / 0.35) 0 1px, transparent 1px 3px); }
.display { font-family: var(--font-display); text-transform: uppercase; line-height: 0.98; letter-spacing: var(--tracking-display); }
.slate { display: grid; grid-template-columns: auto 1fr auto auto; height: 46px; background: var(--color-ink); color: var(--color-white); font-family: var(--font-outlier); font-size: 12.5px; font-variant-numeric: tabular-nums; }
.bars { display: grid; grid-template-columns: repeat(7, 1fr); }
.bars i:nth-child(1) { background: oklch(81% 0.005 260); } .bars i:nth-child(2) { background: oklch(78% 0.17 110); } .bars i:nth-child(3) { background: oklch(73% 0.125 195); } .bars i:nth-child(4) { background: oklch(70% 0.24 142); }
.bars i:nth-child(5) { background: oklch(57% 0.26 328); } .bars i:nth-child(6) { background: oklch(51% 0.21 29); } .bars i:nth-child(7) { background: oklch(37% 0.25 264); }
.btn { font-family: var(--font-body); font-weight: 600; font-size: 13px; text-transform: uppercase; padding: 14px 20px; background: var(--color-ink); color: var(--color-paper); border: var(--rule-bar) solid var(--color-ink); }
::selection { background: oklch(63% 0.25 27 / 0.3); }
```
