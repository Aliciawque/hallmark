# Theme - Manifesto

Loud editorial, broadside register: the protest-poster and political-broadside school, executed on a **warm near-black ground with condensed-bold uppercase display and exactly ONE fighting red**. Giant Anton lines slam to the left margin and the body drops to a quiet grotesque. It reads like a thesis nailed to a door: uncompromising, urgent, set once and set loud.

The material, in one line: **warm charcoal, condensed caps at 9rem, a quiet body, one red.**

## Axes (diversification)

- **Paper band** - **dark, warm** (`oklch(10% 0.005 60)`, a warm charcoal near-black). Stepped bands at `paper-2 15%` / `paper-3 20%`. The only dark theme in the editorial cluster.
- **Display style** - **display-condensed-bold** (Anton 400, single weight, `--display-optical: 96`). Uppercase, tracked at `0.005em`, leaded tight at `--lh-tight: 0.86`. Distinct from Carnival's variable-width Big Shoulders and every serif option.
- **Accent hue** - **fighting red** (`--color-accent: #E51A1A`; the same red tuned for text is `--color-accent-ink: oklch(58% 0.24 28)`). One warm red (~25-28 deg), used as a signal, never a flood. Sits clear of Carnival's mustard/oxblood duo-tone.

## Reference register

Recorded broadsides and statement pages: the Communist / Futurist / Dada printed manifesto, a strike poster, a punk zine cover, "we stand for" appeals, mission pages set in condensed grotesque. **Never name any of these in the output.**

The material to match: a political declaration printed at scale in one ink plus red, argument carried by type alone, no image needed. Internally: *the printed manifesto nailed up in public*. When in doubt ask "does this read like a declaration, or like a product page?" Keep the former.

## Palette

Canonical values live in [`site/css/tokens.css`](../../../../site/css/tokens.css) under `[data-theme="manifesto"]`.

- `--color-paper: oklch(10% 0.005 60)` - warm charcoal, never `#000`; bands step to `15%` / `20%`
- `--color-ink: oklch(98% 0.003 90)` - warm near-white
- `--color-ink-2: oklch(88% 0.006 80)` - body, a notch back
- `--color-muted: oklch(60% 0.012 65)` - meta
- `--color-accent: #E51A1A` - flat red for fills, underlines, and the 3px bar
- `--color-accent-ink: oklch(58% 0.24 28)` - the text-legible red, for a red **word**
- `--color-focus` - the same red
- `--color-rule: oklch(28% 0.010 60)` - the hairline that divides

Everything is warm-tinted (hue 60-90), never neutral grey. One red, under 5% of any viewport, and **at most one red-inverted surface on the whole page** (red paper, `--color-ink` text); everywhere else red stays a signal. Text on a red fill is `--color-ink`, never dark ink. At most one red word per headline.

## Typography

The whole drama is scale contrast: the gap between `9rem` caps and `1rem` grotesque IS the theme.

- **Display** - Anton, one weight, uppercase only, at `clamp(4rem, 8vw+1rem, 9rem)` (`--text-display`), leaded at `--lh-tight: 0.86` so a three-line block locks into one solid mass. Slam it to the left margin, edge to edge.
- **Body** - Public Sans 400/600/700, set small and plain at `--measure: 56ch` in `--color-ink-2`. It never competes; it is the calm argument under the shout.
- **Label** - JetBrains Mono, UPPERCASE, `--tracking-label: 0.10em`. The machine-voice against the Anton shout: captions, meta rows, table headers, units, dates, folios, and entry numbers inside a real `<ol>` when the argument is genuinely ordered. It carries a value; it never sits above a heading to announce it.

## Material

- **Hairlines divide, one thick red bar accents.** `--rule-hair: 1px` in `--color-rule` separates like a printed broadsheet; a single `--rule-fine: 3px` red bar is the emphatic mark. Rules do the structural work: **no boxed cards, no drop-shadows.**
- **Square, ruler-drawn controls.** Buttons and inputs are `0px` radius or hairline-bordered blocks. A primary action is a flat red block with `--color-ink` text, or an outlined block that inverts to red on hover. No pills, no soft radii, no gradients.
- **No texture, no ornament.** The scale and the red carry everything.
- **No imagery leading.** Type argues; a photograph undercuts the broadside.

## Motion

**Motion character: severe (0.7×).** Hard and staccato, not soft. Display blocks clip-reveal upward once (a `clip-path: inset()` mask, not a soft fade and drift) via one `IntersectionObserver`, on a snappy cubic-bezier, playing once. Lines can enter one after another with the same snap. No bounce, no parallax, no autoplay, no red pulsing. Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships static and fully visible.

## Voice range

Imperative, short, declarative. Fighting words, verbs over adjectives, one red word. Never *seamless, effortless, delightful, gentle, playful, cozy, maybe, perhaps, leverage, synergy*. No hedging, no hype-marketing: state it and stand behind it.

## Do-nots (this theme's own failure modes)

- **No pure `#000` ground or `#fff` ink.** Warm-tinted charcoal and warm near-white, hue 60-90.
- **No second accent.** Red is the ONLY colour: no blue, no green, no duo-tone pairing (that is Carnival).
- **No red flood** beyond the single inverted surface. Red is a signal, not a background.
- **No light ground.** Manifesto is dark. A light statement page routes to Riso or Carnival.
- **No decorative ornaments** - no fleurons, stickers, hard-offset shadows, tinted paper tricks.
- **No serif display, no lowercase or title-cased display.** `--font-serif` resolves to Anton on purpose; the display voice is UPPERCASE and declarative.

## How Manifesto differs from its neighbours

| vs | difference |
|---|---|
| **Carnival** (loud-editorial sibling) | Carnival is a **light**, tinted-paper, **duo-tone** decorative page (mustard + oxblood, ornaments, hard-offset shadows, variable Big Shoulders). Manifesto is **dark**, **one red**, raw, condensed-bold Anton, no ornament. Light-decorative vs dark-declarative settles it instantly. |
| **Brutal** (raw-editorial sibling) | Brutal is a **light 98% sheet** with heavy black rules and Albert Sans 700 - rigid and grid-structural, its one red cutting the near-white. Manifesto is a **dark** warm-charcoal ground with condensed-bold Anton - composed loudness, not grid rawness. |
| **Riso** (print-editorial sibling) | Riso is a **light** print-texture, duotone-registration page. Manifesto is a dark, textureless broadside carried by scale and one red bar, not by ink-misregistration charm. |

## When the brief routes here

*manifesto · statement · declaration · principles · beliefs · mission · movement · protest · cause · campaign · activism · advocacy · values · take a stand · bold launch · defiant · anti-establishment · punk*. Categories: activist and cause orgs, advocacy campaigns, defiant brand launches, editorial statements, agencies with an attitude, loud record labels, movement pages. Tone: loud, defiant, urgent, declarative, uncompromising.

Calm, product, consumer, or image-led briefs route elsewhere. When the brief wants to **shout a conviction in type**, it is Manifesto.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Public+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-ink-2);
       font-family: var(--font-body); font-weight: 400; }

/* Condensed-bold caps, slammed left, leaded tight */
.display { font-family: var(--font-display); text-transform: uppercase;
           font-size: var(--text-display); line-height: var(--lh-tight);
           letter-spacing: var(--tracking-display); color: var(--color-ink);
           text-align: left; text-wrap: balance; }
.display .hot { color: var(--color-accent-ink); }   /* one red word, max */

/* Mono label voice + the one thick red bar */
.label { font-family: var(--font-mono); text-transform: uppercase;
         letter-spacing: var(--tracking-label); color: var(--color-muted); }
.rule-red { height: var(--rule-fine); background: var(--color-accent); border: 0; }

/* Square controls - a flat red block, never a pill */
.btn { border-radius: 0; background: var(--color-accent); color: var(--color-ink);
       border: var(--rule-hair) solid var(--color-accent); }
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }

/* Hard clip-reveal - the whole motion engine */
.reveal { clip-path: inset(0 0 100% 0); transition: clip-path .5s cubic-bezier(0.2,0.9,0.1,1); }
.reveal.is-in { clip-path: inset(0 0 0 0); }
@media (prefers-reduced-motion: reduce) { .reveal { clip-path: none; transition: none; } }
```

The rest of the page is yours. Manifesto supplies the charcoal, the caps, and the one red; what gets declared in them is the brief's business, not the theme's.
