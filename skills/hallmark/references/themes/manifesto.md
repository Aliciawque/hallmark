---
name: Manifesto
slug: manifesto
genre: editorial
paper: dark 13 60
display: display-condensed Anton
accent: warm 28
posture: committed
keywords: manifesto, statement, declaration, principles, beliefs, mission, movement, protest, cause, campaign, petition, activism, advocacy, rights, values, take a stand, bold launch, defiant, punk, record label
material: warm near-black ground, warm off-white ink, Anton capitals leaded tight over a quiet Public Sans body, hairlines and square edges, one fighting red
photo: duotone paper ink con=24
pictured: Manifesto, Stage hero
---

# Manifesto

A declaration printed on a dark sheet: a warm near-black ground, warm off-white ink, Anton capitals leaded tight, a small plain Public Sans body, hairlines, square edges and one fighting red. The force is the contrast between condensed caps and quiet body text, and red spent once; photographs print in the off-white ink, hard and close, like a pasted-up flyer. Nothing is decorated. It is not a protest-poster pastiche of stickers and torn paper, and not a dark product page with a red button.

## Tokens

```css
:root {
  --color-paper: oklch(13% 0.008 60); --color-paper-2: oklch(17% 0.009 60); --color-paper-3: oklch(22% 0.010 60);
  --color-ink: oklch(95% 0.012 85); --color-ink-2: oklch(85% 0.010 80); --color-muted: oklch(63% 0.014 65);
  --color-rule: oklch(30% 0.012 60);
  --color-accent: oklch(56% 0.228 28); --color-accent-text: oklch(63% 0.22 28); --color-accent-ink: oklch(98.5% 0.004 90);
  --color-focus: oklch(56% 0.228 28);
  --font-display: "Anton", "Impact", sans-serif; --font-body: "Public Sans", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 3px; --shadow-card: none;
  --tracking-display: 0; --lh-tight: 0.92; --text-display: clamp(4rem, 8vw + 1rem, 9rem);
}
```

## Type

- **Display:** Anton 400, one weight, uppercase only, `--tracking-display`. Condensed caps take a step up: the hero head sets at the theme's own `--text-display` (to 9rem); other heads keep the shared steps. A head whose lines each sit in their own element and never wrap (`white-space: nowrap`, stamp `waive 55b`) leads at `--lh-tight`, where Anton's capitals lock into one mass without touching; any head that can wrap leads at 1.02 (55a).
- **The red word:** one word on the whole page, inside the hero head, in `--color-accent-text` (stamp `waive 38iii`). Every other head is one colour.
- **Body:** Public Sans 400 and 600, small and plain, in `--color-ink-2`.
- **Labels, captions, table heads, meta, dates:** Public Sans 500 a step smaller, sentence case, untracked, `--color-muted`. Mono appears only inside code.

## Surfaces

- Hairlines divide: `--rule-hair` in `--color-rule` runs between rows and under heads like a printed broadsheet; a `--rule-bar` red rule is the emphatic divider, once a page at most.
- Radius 0 and no shadow anywhere: no boxed cards, no lift. A well is a `--color-paper-2` field under a hairline.
- Bands: `--color-paper-2`, or the page's one red-inverted surface, a red field with `--color-accent-ink` type; two a page at most.
- Photographs: close and hard-lit, hands at the work the page argues for, the tool and the part sharp, no faces, nothing staged; cropped tight so the edges fall to dark. They print in the off-white ink on the dark sheet (the `photo:` duotone), square, in a 1px `--color-rule` ring. A head may cross one only over its darkest third, on a `--color-paper` scrim; red never touches a picture.
- Everything warm-tinted (hue 60 to 90), never neutral grey; no texture, no ornament.

## Controls

- Square, ruler-drawn controls: a flat red block with `--color-accent-ink` text beside a hairline block in `--color-ink-2` that inverts to red on hover. No pills, no soft radii, no gradients.
- Links are ink with a 1px underline that turns `--color-accent-text` on hover; inputs are square, hairline-bordered, on `--color-paper-2`.
- Outside the one red-inverted surface, red stays under 5% of a screen: the red word, the primary control, the focus ring, the red rule. Text on red is always the light ink.

## Motion

One clip reveal: the hero head wipes upward once (`clip-path: inset()`, never a soft fade) over `--dur-long` on `--ease-out`. Nothing else moves; no bounce, no parallax, no red pulsing.

## Voice

Imperative, short, declarative: fighting words, verbs over adjectives, the demand in the reader's own nouns. No hedging; state it and stand behind it.

## Do-nots

- Never a second accent; red is the only colour.
- Never a red flood beyond the one inverted surface; red is a signal, not a background.
- Never a light ground; the sheet stays dark.
- Never ornament: no fleurons, stickers, hard-offset shadows, tinted-paper tricks, or a photograph in colour or toned red.
- Never a serif, lowercase or title-case display; the voice is uppercase and declarative.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Public+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
body { color: var(--color-ink-2); }
h1, h2, h3 { font-weight: 400; text-transform: uppercase; line-height: 1.02; color: var(--color-ink); }
.display { line-height: var(--lh-tight); }
.display > span { display: block; white-space: nowrap; }
.display .hot { color: var(--color-accent-text); }
.rule-red { height: var(--rule-bar); border: 0; background: var(--color-accent); }
.btn { border: var(--rule-hair) solid transparent; background: none; border-radius: 0; padding: var(--space-sm) var(--space-lg); font-weight: 600; }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { border-color: var(--color-ink-2); color: var(--color-ink); }
.btn--secondary:hover { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.band--red { background: var(--color-accent); color: var(--color-accent-ink); }
.photo { outline: var(--rule-hair) solid var(--color-rule); outline-offset: -1px; }
.reveal { animation: wipe var(--dur-long) var(--ease-out) both; }
@keyframes wipe { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0); } }
::selection { background: var(--color-accent); color: var(--color-accent-ink); }
```
