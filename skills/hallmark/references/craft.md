# Craft

The one file every page build reads. Type, colour, layout, hero, motion, copy, section openings, demo slots and finish, as numbers wherever a number exists. The theme file supplies the values; this file supplies the rules the values sit in. Gate numbers in parentheses point at `gates.md`.

## 1. Type

Type carries the page. Two families: a display face and a body face. A third is one **outlier** register (a wordmark, a headline figure, code) and it carries exactly one role; a second role makes it a third body font (37, F13). Same family at different weights is one family.

- **Extremes read as chosen.** Weight 300 beside 800, or 400 beside 700. A 500 or 600 display works only when the display face differs from the body face.
- **A ratio, not increments.** 1.25 by default (1.333 or 1.5 for more drama), built from a 16px body. At most five sizes on a page; hierarchy past that comes from weight and colour.
- **Display:** tracking -0.02 to -0.04em on a regular-width face, 0 to -0.015em on a condensed or very heavy one (they are drawn tight already; two letters touching is a fault, not a style), line-height 1.0 to 1.15 (tighter as it grows; 1.2 reads as inherited). Uppercase heads that can wrap never go under 1.0 (55). A head is one weight, one style and one colour throughout; one word set apart by italic, colour, weight or a highlight is the accented word, the field's most-named tell after the eyebrow (38). Stress comes from a line break or a second line at a second size. Default display size `clamp(2.75rem, 5vw + 1rem, 5.25rem)`; cap 5.5rem, 6rem on display-heavy themes, 7rem only for a single word.
- **Body:** 16px minimum (14px never for body), line-height 1.5 to 1.65, measure 45 to 75ch (`max-width: 65ch`) (25). Never all-caps body, never justified without hyphenation, never tracking above 0.05em on body.
- **Labels, captions, table heads, meta, tags, chips, nav links:** the body face, a step smaller, sentence case, untracked (67). Never uppercase, never small caps, never letter-spaced. Mono only when the content is code, a figure or a measurement, or when mono is the theme's material (64). Capitals belong to a wordmark and to a theme whose display voice is uppercase; there a control may follow the display's case at 0.04em of tracking or less.
- **Headline sizing by copy length.** Count the rendered `h1`: 20 characters or fewer, full display (a single word may grow to 7rem); 21 to 50, display; 51 to 90, one step down (`--text-display-s`) or split at the sense break with `<br>`; over 90, rewrite. Self-written headlines aim for seven words and 50 characters.
- **Heading measure rides on the element**, in `ch`: display ~20ch, display-s ~24ch, 4xl ~30ch, 3xl ~35ch, 2xl ~40ch, xl ~45ch. Never a `max-width` on the heading group's wrapper.
- **Required:** `font-display: swap`; fallback metrics with `size-adjust` and the override properties; `font-variant-numeric: tabular-nums` on any figures that compare; `text-wrap: balance` on heads, `pretty` on ledes and body; curly quotes, a true ellipsis, a non-breaking space inside unit pairs (`10 MB`, `⌘ K`). No `--` and no em or en dash anywhere in rendered copy; a comma, a colon or a full stop does the work.
- **Wordmark.** May take a different face from the body; on tone-rich themes it should. Collapse to one family only when the body voice is the brand (a letter, a manifesto, a long document).
- **Load only the weights you use.** Never synthesise bold or italic.

Font sourcing for a custom or studied run is in `fonts.md`; a catalog theme has already named its faces.

## 2. Colour

- **OKLCH everywhere.** Perceptual lightness is what makes contrast predictable.
- **Four layers.** Paper (light: L 92 to 98, chroma 0.005 to 0.015 toward the anchor hue; dark: L 12 to 18, 0.008 to 0.015). Ink (light paper: L 16 to 24; dark paper: L 88 to 96; tinted 0.005 to 0.014). Five to nine neutrals between them, each tinted 0.005 to 0.018 (22). One accent at chroma 0.12 to 0.22 with a paired `--color-accent-ink` (41). A focus colour: the accent's hue, chroma 0.18 to 0.22, L within 5% of the accent.
- **Never a pure absolute** as a base surface or as an improvised value (7). Tint the greys toward the anchor: a warm accent wants warm neutrals.
- **The accent is a signal, not a fill.** Under 5% of any viewport under the default Restrained posture (23): an active nav item, a focus ring, a link underline on hover, the primary control's border or text, one small square beside a heading. If you want more, that is the reflex.
- **Postures.** Restrained (above). **Committed:** one colour carries 30 to 60% of the surface through `--color-field` or the paper family; the accent proper stays a signal. **Full palette:** three or four named roles (field, signal, seal, ink), each with a job and a footprint. **Drenched:** the surface is the colour; ink and rules derive from it. A posture is declared in the stamp before code; a declared surface colour is not accent footprint.
- **Contrast.** Body 4.5:1 (target 7:1) or APCA Lc 60; large text, icons, focus rings and component boundaries 3:1 or Lc 45 (40). Where you cannot render, keep the two lightnesses 15% or more apart. Every rule that paints a dark surface swaps its text colour in the same rule (41). Grey text never sits on a coloured surface: tint it from the hue or use paper.
- **Bans:** two-stop gradients only, and never purple-blue, purple-pink, cyan-on-dark (2a); no glow shadows on dark, no chromatic halos or spotlights (29); no alpha as a colour's definition (alpha modifies overlays and shadows); no red-green as the only signal.
- **Dark mode** is opt-in and derived, never inverted: paper 12 to 18, ink 92 to 96, elevation lighter by about 3% L per level, accent chroma down 0.02 to 0.04 with L up 5 to 10, hue fixed. `dark-mode.md` has the per-token table when both modes are asked for.

## 3. Layout and space

- **A primary axis.** Left-biased, right-biased, top-heavy or bottom-weighted. Centre-biased is a default, not a choice; at most two centred elements in a hero, one breaking alignment (6b).
- **Spacing is a scale.** 4pt base, ten steps, named by role: `--space-3xs` 2px · `2xs` 4 · `xs` 8 · `sm` 12 · `md` 16 · `lg` 24 · `xl` 40 · `2xl` 64 · `3xl` 96 · `4xl` 144. Raw lengths where a token exists are a Floor failure (24a); at most three optical nudges off the scale (24b). `gap` for siblings, `margin` only to break the flow.
- **Between sections, 120px or more at desktop, varied** (59): some 120, some 160, some 200; a change of paper may sit tighter. Inside a section, 32 to 48px from heading to content, 24 to 40px between grid items. More space above a heading than below it, always. Five to eight sections a page; 4,500 to 7,000px tall at 1440.
- **The container is capped and centred:** `max-width` 1360 to 1520px, gutters 64 to 96px at 1440 and 200px or more at 1920 (44d). Grids hold their column count above 1440; `auto-fit` that grows a fourth column changes the composition. Visuals sized in `vw` carry a `max-width`.
- **Page invariants** (F15). Across the whole page: one primary button style and one secondary style; one container width and one horizontal padding, applied by the same two-element pattern in every section (outer element: background and vertical padding; inner: max-width, centring, gutters) so edges line up while scrolling; one column gap for every multi-column section; one radius per nesting level; the same font treatment whenever the same kind of thing appears. Never a centred layout directly under a left-aligned one unless a full-width band, a paper change or a rule separates them. Never more centred heading groups than left-aligned ones; centre only heroes, CTAs and sections with symmetric content beneath.
- **Heading groups.** A headline and at most one line beneath. Constrain each text element with its own `max-width` in `ch`, never the wrapper. A grid or list that fills its section takes the section's edges: never a narrower `max-width` with auto margins on it; a nested width belongs only to a self-contained unit (a form, a pricing set, a centred figure). A subhead over 120 characters (about three centred lines) is set left-aligned; if the user asked for centred and the copy is that long, offer a shorter line first.
- **Coherence over side.** A head may be left, centred, hanging, bottom-anchored or overlapping; what reads as a mistake is a narrow auto-centred head floating over full-width left-flush content.
- **Grids.** CSS Grid for the page, Flexbox for component internals. Break the equal-columns reflex: `1.2fr 1fr 0.8fr`, a 12-column grid with unequal spans, a 4-up with a 2-span lead (3). Named areas for complex layouts. Flex children that must shrink get `min-width: 0`; icons, logos and images get `flex-shrink: 0`.
- **Asymmetry that reads as chosen:** a wide margin column carrying captions and footnotes beside the body (never a label beside a heading, which is an eyebrow); a heading that hangs into the margin; offset column widths; one element that crosses a column boundary; generous top and tight bottom.
- **The surface ladder.** Whitespace, then a hairline rule (1px `--color-rule`, inset or full-bleed), then a tinted well (`--color-paper-2` or `-3`, no border), then a card (border or shadow, reserved for content that is independently interactive or of a different kind). Never white cards on a tinted page; never a card in a card (4); never jump to the top rung (9, F7). Sibling items in a shared context (stats, KPIs) separate with a top border or a vertical hairline: the first item has no leading padding, the last no trailing, and the rule pattern is reset at every breakpoint where the column count changes.
- **Depth is weight and scale**, not shadow. One shadow if any: whisper `0 1px 2px oklch(20% 0.01 <hue> / 0.05)` or hairline `0 0 0 1px oklch(30% 0.01 <hue> / 0.06)`. Never a border and a wide soft shadow on the same box; commit to one. Elevated surfaces are never darker than their canvas. Seven named z levels: base 1, raised 10, dropdown 100, sticky 200, sticky-nav 300, modal 400, toast 500, tooltip 600; never a freestyle z (56).
- **Page-edge clipping.** `html, body { overflow-x: clip }` on every page (34); `clip` keeps `sticky` and `fixed` working where `hidden` breaks them. The section that holds a deliberately overflowing element keeps `overflow: visible`.
- **Radii.** One radius per level; nested radii are concentric: `inner = outer - padding`, clamped at 2px. Image and screenshot radii scale with the viewport: `min(1vw, 12px)`.
- **Icons.** One library per project; sizes 16, 20, 24, 32 at the set's natural grid (a 24 viewBox at 24px, never scaled to 19); `currentColor`; beside multi-line text align to the first line; never inside a coloured coin or tile (3, F5); inline with small text use the 16px size. Buttons and badges with an icon take asymmetric padding: the icon side's padding equals the vertical padding.
- **When flat, before shipping:** add one break-out element, unbalance a column, move the primary CTA off centre, replace a card with air, or make one section's padding uneven.

## 4. The hero

The highest-stakes surface on the page. Pick a posture at Step 2, stamp it, and vary it run to run.

| Posture | Character | Height at desktop | Padding | Pairs with |
| --- | --- | --- | --- | --- |
| **Settled** (default) | balanced fold, sits into the page | 70 to 90% of the viewport | block-end 1.3 times block-start | any hero archetype |
| **Banner** | compressed opener, the page starts fast | 40 to 55dvh, cap `min(52dvh, 34rem)` | 1.3 times, edge-led | reference, docs, utility |
| **Poster** | full-bleed canvas, the fold is the artwork | 92 to 100dvh (the only legal 100dvh) | waived when content is corner-anchored | atmospheric, playful, Manifesto |
| **Ledge** | tall void above, content rests at the base | 70 to 88dvh | block-start 2 times block-end, `align-content: end` | sport, brutal, photographic |
| **Corridor** | tall centred reading column, 44ch or less | 66 to 85dvh | 1.3 times | editorial, atelier |
| **Stage** | text column beside a full-height visual that may bleed | 70 to 92dvh | 1.3 times on the text column | modern-minimal, playful product |

Every posture, every hero:

- **Fits the fold at 1280 x 800** (44b): headline, one sentence, primary action and the visual's focal point all visible without scrolling. Culprits when it does not: an oversized display clamp, line-height near 1.2, a three-line lede, padding bloat. Right-size, never cramp.
- **Is exactly one screen at 1440 x 900 and 1920 x 1080** (44c): the next section starts between y 760 and y 900 at 1440. Too short with dead space under it is the same fault as spilling into a second screen. Fill with the visual or the headline, never with a third paragraph.
- **The visual sits beside the text**: vertical centres within 60px, 48 to 120px between the text block's edge and the visual, never touching the viewport edge unless a deliberate full-bleed. The corner-pinned device beside a left-hugging text block is the most recognisable machine-made hero there is.
- **Three things in the text**: headline, one sentence, actions (58). No label above, no small print under the buttons, no badge row, no version pill (66).
- **Mobile** under 48rem collapses every posture to content height (Poster may stay full-bleed).
- **Entrance:** one orchestrated settle of 0.4 to 0.8s including its stagger, from an already-visible default; a fade with an 8px rise is one motion. Never a fade plus a sweep plus a scale on one element; never bounce; never scroll-fade on every section; never a starfield, a mouse-parallax or an auto-rotating carousel.
- **One polish pattern at most** (a vertical rail title, a marquee overflow, a decorative numeral that means something). Two is a panic attack.

**Enrichment** is an option, never a default. The hierarchy: typography only → pure CSS art → hand-built SVG → generated still → customised library asset → Lottie, last. The image-need check in `hero-enrichment.md` decides whether the brief wants imagery at all; write the scene sentence first (a real person, a real time and place, with the product) because it fixes the surface's lightness and light temperature. Before an enrichment ships, all of these are yes: it communicates something the type cannot; under 2 MB; has a reduced-motion fallback; if video, muted, looped, `playsinline`, with a poster and `fetchpriority="high"`; built with intent, not picked from a library; keeps the accent under its footprint; survives deletion (the hero still works without it); matches the page's tone. Any no, ship the typographic hero.

## 5. Motion

- **Only `transform` and `opacity`** (10). Blur, `clip-path`, mask and shadow may join when they stay smooth on the element alone.
- **Three easings, tokenised:** `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` for things arriving, `--ease-in: cubic-bezier(0.7, 0, 0.84, 0)` for things leaving, `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` for toggles. The browser's `ease` and `linear` (outside progress) read as uncrafted; overshoot on UI state is dated (12).
- **Three durations:** `--dur-micro` 120ms (press, tick, colour), `--dur-short` 220ms (hover, tooltip, menu), `--dur-long` 420ms (modal, drawer, accordion, page reveal). Exits run 60 to 75% of the enter. Stagger 30 to 50ms between rows, 60 to 100ms between blocks, 500ms total, one-shot, never re-fired on scroll.
- **One reveal per page**, staggered by a `--i` custom property, capped at 500ms, and the content is visible without it (62): scope the hidden state to a `.js` class the script adds, or animate from visible with `@starting-style`. Reduced motion collapses spatial motion to a 150ms opacity crossfade and keeps functional loaders running.
- **Scroll:** IntersectionObserver, never scroll listeners; reveal once; scroll-scrubbed motion exists only as the named patterns in `scroll-choreography.md`, one per page (F8).
- **State:** hover `translateY(-1px)` at micro, active back to 0; menus `--ease-out` open and `--ease-in` close with the Popover API; modals scale 0.96 to 1 with a backdrop fade over `--dur-long` using `<dialog>` and `inert`; accordions animate `grid-template-rows: 0fr` to `1fr`; tooltips delay 800 to 1000ms on hover and 0ms on focus (17); focus rings never animate (15).
- **Never:** parallax, custom cursors, cursor followers, infinite loops other than loaders and a paused-on-hover marquee, `will-change` on a whole class, an image that scales or rotates on hover (11), a pulsing dot that is not live data.

Full recipes (buttons, inputs, validation, toasts, modals, menus, drag, command palette, optimistic updates) are in `microinteractions.md`; load it when the page has stateful UI.

## 6. Copy

Words are design material. Specific verbs (`Save changes`, never `Submit`); labels that describe (`Email address`); link text that stands alone; errors that name what broke, why, and what to do; active voice; one word for one action across the page.

- **Budget** (58): hero subhead one sentence of twelve words or fewer; headlines seven words or fewer, section heads three to five; section intros one line; paragraphs two short sentences; lists stop at four items of a three-word label and a ten-word line; tables at five rows; 250 to 450 visible words on a page. Read only the headings and the hero: if they tell the story, the rest is the right length.
- **Openers.** Name the place, the date, the vertical, the number the user gave, the input the product reads. Refuse the verb-less claim. Never *Built for the modern team*, *Unleash*, *Where A meets B*, *Empower*, *Reimagine*, *Supercharge*, *seamless*, *robust*, *effortless*, *next-generation*, *world-class*, *In today's landscape* (19). The rebuttal cadence (*Not a feature. A platform.*) is fine once and a tic three times.
- **Buttons:** the verb of the action. `Continue` only as the secondary step of a flow. **Errors:** what happened (past tense), why if known, what to do (imperative); no *Oops*, no exclamation marks, no humour in a frustration path. **Empty states:** one line naming what is empty, one on why it matters, one action. **Loading:** spinner alone under 2s, plus *Loading…* past it, plus honest progress past 10s.
- **Never** placeholder people (Jane Doe), startup clichés (Acme, Nexus), *Click here*, *Enter your email below*, *Quietly trusted by*, a version string in marketing copy, or a number the user did not give (46a).
- **Punctuation is typeset:** curly quotes, `…`, a proper apostrophe, no `--`, no em or en dash (a comma, a colon, a full stop or parentheses instead), non-breaking spaces before units. Periods on every standalone sentence, none on list items, consistently.

## 7. Opening a section

The reflex is a small caps label above the heading, and the reflex is the tell (54). The question is *what does the reader not yet know?* If nothing, open with nothing: a generous margin and a heading that starts flush is the most under-used opening there is. If something, it rides on a fact, a destination or an identifier, never on a name for what comes next. Twelve ways in:

1. **Nothing.** Air above, heading flush. Never goes stale.
2. **The heading announces itself.** Move the subject into its first two words. Usually the best move; the label existed because the heading was vague.
3. **A lead-in inside the paragraph**, in a heavier weight, never on its own line.
4. **A drop cap.** One per page, first paragraph only.
5. **A rule that does more than rule**: hairline, fleuron, double rule, colour edge, or pure gap; one divider language down the whole page.
6. **A numeral at graphic scale** (8 to 18rem), one per page, only when the number is real (an issue, a year, a version, a chapter).
7. **A real `<ol>`** with `counter()` when the sequence is genuine.
8. **A caption below** the content instead of above it: a plate in a catalogue, not a slide title.
9. **Marginalia** beside the body in the outer margin.
10. **A change of paper.** The band's surface changes; that edge is the break. No words.
11. **A running head or folio**: continuous chrome at the page edge (a sticky folio, a rail), legal because it persists rather than announces.
12. **Persistence**: the heading stays in view while its content scrolls beneath.

Two moves can share a section; three is panic. Pick one opening and repeat it, or two and alternate; rotate against the log so one opening does not become your signature. Still legal, because each names something present: a `<figcaption>`, a `<th>`, a `<label>`, a `<legend>`, a nav or tab label, a byline or a `<time>` dateline, a unit after its figure, a code block's real filename, a live `role="status"` chip, one linked announcement that goes somewhere real, a plan name (which usually wants to be the heading).

## 8. Demo slots

A landing page is a demo. The first screen shows the thing working; later screens show it from other angles. Prose is what a page falls back on when it has nothing to show.

A slot is a container carrying `data-slot="<name>"` (`hero`, `demo-2`, `demo-3`, `photo-1`) at a real size (an `aspect-ratio` or a fixed height, never the image's own), holding a designed placeholder that the user's image replaces without touching the layout. Both snippets ship in every page that has a slot; in a framework the same contract is a `<Slot name="hero">` component.

```css
[data-slot] { position: relative; overflow: hidden; }
[data-slot] > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
[data-slot]:has(> img) > :not(img) { display: none !important; }
```

```js
window.hallmarkSlots = (m) => { for (const [k, v] of Object.entries(m)) { const s = document.querySelector(`[data-slot="${k}"]`); if (!s) continue; const im = new Image(); im.src = v; im.alt = ''; s.prepend(im); } };
```

**The placeholder is designed, not grey.** A gradient of two or three OKLCH stops from the theme's paper and accent with a slow hue path (a mesh of two radial gradients is the richer version; dark themes glow from a corner, light themes wash from an edge), optionally a sparse drawn interface of five shapes or fewer in the theme's material, one corner label in the theme's caption style saying what goes there (`your screenshot`, `product photo`), inside a frame that suits the theme (a hairline panel with a slight tilt, a device silhouette, a plain rounded panel, a kiss-cut print, an enamel plate). Never traffic lights, a URL pill or a notch (47a); never invented figures presented as real (47c); never the word *placeholder* at display size.

Four recipes, one per material family:

- **Paper** (editorial, print): `linear-gradient(160deg, var(--color-paper-2), var(--color-paper-3))` with a `repeating-linear-gradient` of 1px rules at 4% ink every 32px; a 1px `--color-rule` border; label bottom-left in the caption style.
- **Screen** (modern-minimal, product): a 16:10 panel, `radial-gradient(at 20% 0%, <accent at 18% chroma-cut> , transparent 60%)` over `--color-paper-2`, a hairline head row 40px tall in `--color-paper-3` that carries the corner label, one 60%-wide card outline beneath it; never a top bar with pills or dots, which reads as a browser (47a).
- **Dark** (atmospheric, night): `--color-paper` with one `radial-gradient` at 80% 100% in the accent at 30% alpha fading by 55%, a 1px inset ring of paper at 8% alpha; label bottom-right in `--color-muted`.
- **Print object** (playful, riso, sticker): the accent field with a 2px ink border, a second colour block offset 8px behind it (zero blur), a dashed kiss-cut line inset 6px; label as a small rotated tag in the corner.

Where slots go: the hero visual on any product page, beside the text; a demo strip of three or four slots with one label of three words or fewer each (this replaces the three-card feature grid); photo slots on business pages. Two slots is the floor; six is a gallery, a different shape. Ask for the material once at Step 1; given images go straight in and are named in the Picks block; "leave slots" or silence builds the placeholders and the handoff lists every slot, its size and what belongs there.

## 9. Finish

The last 2% that separates set from generated. sloplint's F-checks report most of it; answer each one, never ship it unread.

- **Controls.** One filled primary per page, dialogs counted as their own page (F4); secondaries outlined or typographic and never higher contrast than the primary; navbar actions quieter than the hero's action. Marketing controls 44 to 52px tall; app UI 32 to 40px with a 44px hit target via an inset pseudo-element and 48px on coarse pointers; at most two button sizes, at least 6px apart; inputs match the height of their adjacent button (39). Icon-bearing controls take asymmetric padding. Any non-primary form action (change photo, resend code) takes the smaller size and a secondary style. Delete uses a secondary style unless deleting is the page's one action.
- **Inputs.** Constant border width across states; the focus ring is an `outline` with an offset (inset on inputs), never a border change; disabled by `opacity: 0.55` and `cursor: not-allowed` and the native attribute; reserve `min-height: 1lh` under the field for helper text (F14); 16px on mobile; a `name` on every control and a `<label>` or `aria-label`; an explicit `type` on every `<button>`; a custom chevron on selects; native checkbox, radio and toggle styled by state in CSS, never toggled by script.
- **Type finish.** Hanging punctuation on pull quotes (`::before` with the opening quote translated -100%). Tabular numerals on anything that columns (F6). Balanced heads, pretty body (F3). A testimonial exists only when the user supplied it (46a); its card bottom-aligns the attribution, and the avatar is the real person or nothing.
- **Pricing.** Emphasise a tier with its button and a word, never a different card colour; align buttons across tiers by pushing them to the bottom; a taller featured tier is a grid sibling on explicit rows (`grid-template-rows: <gap> 1fr <gap>`, the featured card spanning all rows), never negative margins.
- **Tables.** Sentence-case heads that never wrap, horizontal rules only, no outer border, no card around a table, full width, a scrolling wrapper on narrow screens.
- **Responsive finish.** Body-adjacent UI (meta, nav links, controls, checkboxes) renders larger on mobile and steps down at 60rem; display heads are exempt; body never drops below 16px on a phone. Every desktop sidebar or filter column collapses into a menu or disclosure. Container queries for widgets whose layout depends on their box, placed on the closest wrapper.
- **Browser surfaces** (F16). `::selection` in the accent at low alpha with ink text, `caret-color` the accent, `scrollbar-color` from the neutrals, the focus ring from `--color-focus`, `text-underline-offset` and `text-decoration-thickness` set, numerals tabular where they compare. The parts you did not draw still carry the design.
- **Nav.** Text-only links in the top bar, one weight across default, hover and active (state is a colour or a soft background, never a primary fill); a tab row scrolls sideways rather than wrapping; every page has a menu under 60rem; the logo is a link home with an `aria-label`.
- **Prose pages** (articles, docs): line-height 1.7 or more, one family for the title and its subheads, `text-wrap: pretty` on the title, a measure of 60 to 90ch.
- **Stat rows and dashboards.** A stat's title never wraps, no icon sits in a stat, siblings part with a top or side hairline, and a widget's layout answers its container (`@container`), not the viewport.
- **Definition lists.** Features and metadata are a `<dl>`: `<dt>` one weight heavier and higher contrast, `<dd>` regular and quieter, so a link inside the `<dd>` still reads.
- **Compact forms** (sign-in, one field): 20rem wide, never an input and a button sharing one border.
- **Motion finish.** Enters `--ease-out`, exits `--ease-in` (the pair most often reversed); exits at 60 to 75%.
- **Assets.** One icon set; images take an inset outline (`outline: 1px solid <ink at 5 to 10% alpha>; outline-offset: -1px`) instead of a border; `alt=""` when the subject is named beside the image; logos 20 to 28px tall in a footer, footer links at the body weight, footer icons never lighter than `--color-muted`; logo rows split evenly (3 + 3, never 5 + 1) and take the hero's alignment when they sit under it.
