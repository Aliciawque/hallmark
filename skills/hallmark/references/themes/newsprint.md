# Theme - Newsprint

The broadsheet, rebuilt for the screen: the front-page-of-record school executed in **warm cream, warm ink, one dried-brick signal**. Double rules, hairline column rules, a drop cap opening the lede, a Clarendon-lineage slab head over a screen-tuned book serif. It reads like something filed this morning and set by hand: authoritative, literary, calm.

The material, in one line: **warm cream stock, a slab head, columns split by hairlines, one brick mark.**

## Axes (diversification)

- **Paper band** - warm light (`L 92%`, hue ~50, low chroma). A warm newsprint cream (`--color-paper: oklch(92% 0.045 50)`), never a cool white and never a neutral grey.
- **Display style** - **slab serif** (Zilla Slab 700). Bracketed rectangular serifs at nearly stem weight, the Clarendon lineage the wood-type era actually set front pages in. The catalog's only slab, so it is unmistakable against every roman and every grotesk; italic is body emphasis only, never the header face.
- **Accent hue** - **dried brick** (`--color-accent: oklch(32% 0.10 28)`; text-weight `--color-accent-ink: oklch(45% 0.13 30)`). A muted warm red used only as furniture. Clear of Coral's bright coral and Carnival's oxblood.

## Reference register

The New York Times · The Guardian · The Economist · Financial Times · Le Monde · Bloomberg Businessweek · The Atlantic · The Pudding · The Marginalian · Reuters.

The material to match: the front page and the opinion column - dateline furniture, hairline columns, drop-cap ledes, pulled lines set off by rules, one brick mark, the rule discipline of a printed page of record. Ask "does this read like a printed page of record, or a marketing template?" Keep the former. **Never name any of these in the output.**

**Voice range:** specific, declarative, a dry editorial wit. Name the section, the date, the fact.

## Palette

- `--color-paper: oklch(92% 0.045 50)` - warm newsprint cream
- `--color-ink: oklch(15% 0.030 25)` - warm near-black
- `--color-ink-2: oklch(20% 0.030 28)` - body, a notch up
- `--color-muted: oklch(46% 0.022 35)` - meta and bylines
- `--color-accent: oklch(32% 0.10 28)` - dried brick furniture
- `--color-accent-ink: oklch(45% 0.13 30)` - brick when it must read as coloured **text**
- `--color-focus: oklch(48% 0.18 30)` - rings
- `--color-rule: oklch(68% 0.030 40)` - hairlines and column rules; `--color-rule-2: oklch(35% 0.020 35)` - double rules

Every value is warm (hue 25-50); no neutral grey anywhere. Brick stays under 5% of any viewport: a rule tick, a section marker, the one link, a standfirst dash, a folio mark. Never a fill behind a whole section.

## Typography

- **Display** - Zilla Slab 700, `--tracking-display: -0.022em` for heads and decks. No optical-size axis: hold the weight and let scale carry the masthead.
- **Body** - Spectral at `--text-base: 1.0625rem`, `--lh-normal: 1.55`, `--measure: 58ch`. The tension between the blunt slab head and the calm screen-tuned book serif is the voice. Italic is Spectral emphasis in running text only.
- **Label** - Inter UPPERCASE at `0.06em` (`--tracking-label`), small: bylines, datelines, captions, section markers, table headers, folios. This small-caps furniture frames the serif columns and is the broadsheet's machine-readout register.
- **Numerals** - IBM Plex Mono for edition figures, folios, and any tabular column.

## Material

- **Columns split by a hairline.** Longform flows in 2-3 columns divided by a single `--color-rule` hairline (`column-rule: 1px solid var(--color-rule)`). The broadsheet sets text in columns, never as one wide wall.
- **The double rule.** Two lines in `--color-rule-2` with a hairline gap between them: the heaviest divider the theme owns and the most recognisable piece of its furniture. Hairlines carry the ordinary breaks, the double rule carries the major ones.
- **Drop cap.** A Zilla Slab drop cap, floated ~3 lines tall, in `--color-ink` or brick. One per page, the newspaper's classic entry.
- **Rules and whitespace, no cards.** No boxed cards, no drop-shadows, no rounded corners: radius 0. Pulled lines hang between a top-and-bottom hairline with a brick indent, never in a box.

## Motion

**Motion character: calm (1.2×); one reveal and link underlines, nothing else moves.** Quiet and singular. One orchestrated reveal (fade plus ~10px rise) as sections enter. Hover: a brick underline-grow on links. **No parallax, no type-in, no counters, no autoplay.** Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships static and fully visible.

## Do-nots (this theme's own failure modes)

- **Never a cool or blue accent.** The signal is warm brick (hue 28); cool signals belong to Cobalt and Midnight.
- **Never boxed cards, drop-shadows, or rounded corners.** Hairlines and double rules carry structure; radius 0.
- **Never duo-tone, ornaments, or hard-offset shadows.** That loudness is Carnival: no mustard, no `✱` dividers.
- **Never a single wide column of body text.** Longform runs in columns with a hairline column rule.
- **Never a sans-serif body.** Spectral is the body; Inter is confined to small furniture.
- **Never a gradient or a background pattern.** The paper is flat warm cream; a faint fibre texture is the most it tolerates, off by default.

## How Newsprint differs from its neighbours

| vs | difference |
|---|---|
| **Carnival** (same warm paper band) | Loud duo-tone maximalism: mustard plus oxblood, Big Shoulders 800, ornaments, hard-offset shadows. Newsprint is quiet: one brick signal, a Zilla slab head, hairlines, no ornaments. Same cream, opposite volume. |
| **Almanac** | The data and reference register - tabular figures, seasonal tables, ledger rules. Newsprint is the story register - slab heads, drop-cap ledes, bylines, running columns. Table vs column settles it. |
| **Riso** | Risograph craft: peach stock, CMYK misregistration, cyan plus yellow. Newsprint is letterpress broadsheet: warm cream, one brick, crisp registration, a blunt slab. Different print tradition. |
| **Manifesto** | Black paper plus ALL-CAPS Anton in red, inverted polarity, loud. Newsprint is cream paper plus a Zilla slab and brick furniture, light and composed. Dark-vs-light settles it instantly. |

## When the brief routes here

*newspaper · broadsheet · editorial · magazine · journalism · publication · newsletter · op-ed · opinion · essay · longform · column · reportage · press · gazette · review · dispatch · weekly · daily · print · literary*. Categories: news publications, magazines, editorial sites, newsletters, essays and blogs, journalism, opinion and review, media brands, literary journals. Tone: authoritative, considered, literary, print-craft, warm, trustworthy, hand-set, timeless.

Route elsewhere: dev or API to Cobalt, loud music or zine to Carnival, data and reference to Almanac, risograph print-craft to Riso.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,500;0,600;0,700;1,500&family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-ink-2);
       font-family: var(--font-body); font-weight: 400; line-height: var(--lh-normal); }

/* Slab display + the double rule, the heaviest divider in the theme */
.display { font-family: var(--font-display); font-weight: 700;
           letter-spacing: var(--tracking-display); }
.rule--double { height: 4px; border-top: 1px solid var(--color-rule-2);
                border-bottom: 1px solid var(--color-rule-2); }

/* Label voice - bylines, datelines, captions, folios */
.byline, .folio { font-family: var(--font-label); text-transform: uppercase;
                  letter-spacing: var(--tracking-label); color: var(--color-muted); }

/* Columns with a hairline rule; drop cap opens the lede */
.columns { columns: 2; column-gap: 2.5rem; column-rule: 1px solid var(--color-rule);
         max-width: var(--measure); }
.columns > p:first-of-type::first-letter { float: left; font-family: var(--font-display);
         font-weight: 800; font-size: 3.4em; line-height: 0.8; padding-right: 0.06em; }

/* The one brick signal */
a { color: var(--color-accent-ink); text-decoration-color: var(--color-accent); }

.reveal { opacity: 0; transform: translateY(10px);
          transition: opacity .6s ease-out, transform .6s ease-out; }
.reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }
```

Plus one `IntersectionObserver` adding `.is-in`. Newsprint supplies the stock, the two serifs, the rule vocabulary, and one brick mark; what gets filed on that page is the brief's business.
