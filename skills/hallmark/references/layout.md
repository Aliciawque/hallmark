# Layout

The one file every page build reads for space. A page looks made when every screen is full of one idea set at the right size, and generated when it is either crowded or a few small things adrift on a wide canvas: a 36px heading, one line and a small object in a 1300px container, under a hero with a dead band at its foot. This file sets the canvas, the sizes, how a section is built and how full it must be. The theme supplies the material; this file supplies the room. Numbers are at 1440 x 900 unless a line says otherwise; gate numbers in parentheses point at `gates.md`.

## 1. The canvas

- **One container, centred and capped:** `.container` from the scaffold, `--container` 1440px with `--gutter` 64px, so content is 1312px wide at 1440 and stays 1312px at 1920 while the gutters grow (44d).
- **A twelve-column grid inside it**, `--gap-columns` 32px between columns: one column is 80px, four are 416px, six are 640px, eight are 864px. Every section places its parts on these columns, so the left edges of headings, text, grids and visuals line up from the nav to the footer.
- **One horizontal rule for every section:** the outer element owns the background and the block padding, the inner `.container` owns the width and only `padding-inline`; a `padding` shorthand on a class that meets the section's element zeroes the rhythm without an error. A full-bleed band changes the background and keeps the container.

## 2. Sizes

The scaffold writes these tokens and `base.css` sets them on the elements, so a page that does nothing gets the right hierarchy. A theme changes faces, weights, tracking and case; the steps hold, except where a theme sets its display a step larger.

| Role | Token | At 1440 | Element |
| --- | --- | --- | --- |
| Hero head | `--text-display` | 84px | `h1` |
| Long hero head, statement | `--text-display-s` | 60px | `.display-s` |
| Section head | `--text-section` | 52px | `h2` |
| Item title | `--text-title` | 25px | `h3` |
| Lead (the one line under a head) | `--text-lead` | 21px | `.lead` |
| Body | `--text-md` | 16 to 18px | `p` |
| Label, caption, meta | `--text-sm` | 14px | `small`, `figcaption`, `th` |

- A section head under 40px at 1440 on a landing page is the most common reason a page looks unfinished (78). The hero head is about one and a half times the section head; the section head about twice the item title.
- A head and its line sit 16 to 24px apart (`--space-md` to `--space-lg`); the head block and the section's content sit 48 to 64px apart (`--space-2xl`), 40px in a tight composition.
- Grid items sit `--gap-columns` apart across and 48 to 64px apart down. Inside a card or well, 32 to 40px of padding at 1440.

## 3. Rhythm between sections

- Sections part by the scaffold's three steps, `--section-gap-s` 120px, `--section-gap` 144px and `--section-gap-l` 176px, mixed so the rhythm varies (59). A band (a change of paper) takes `--section-gap-s` of padding inside it, top and bottom.
- Space is earned by mass. A 144px gap frames a 700px section; under a 200px section it reads as a hole. When a page looks empty, the fix is almost never a smaller gap: it is a bigger head, a bigger visual, or a section that holds more than one thing.
- Six to nine sections a page, hero and footer included; five when the brief is thin, never fewer. Height follows content: a page with slots and a full brief often runs 5,000 to 8,000px at 1440, a thin brief with no pictures 3,000 to 4,000px; never pad toward a height.

## 4. A section

Every section below the hero is a **head block** and a **body**, and the body is one of the compositions in § 5. The head block sits above the body, inside a split's text column, or beside rows.

- **The head block:** an `h2` of six words or fewer at `--text-section` (a staged shape may head each stage with its one-word name), at most one line at `--text-lead` beneath it, set on columns 1 to 6 or 1 to 7, or split (head on columns 1 to 5, the line on 7 to 12, baselines aligned). Centred only when the body beneath is symmetric, and never more centred head blocks than left-aligned ones.
- **The body fills the width.** Its widest row reaches at least ten of the twelve columns (77). A narrow text block alone on the left with the right half empty is the signature of a sparse page; pair it with a visual, split it, or set it larger as a statement.
- **The body has mass.** At least one of: a visual 360px tall or more; a set of three or four items laid across the full width; a list or table of three or more rows across ten or more columns; a statement at `--text-section` or larger. A head and a paragraph are the head block of a section, never a section.
- **The two sides of a split balance.** Text and visual centre on each other within 60px, and neither column leaves more than a fifth of the row empty.
- **Content sets the height.** A section is usually 520 to 900px of content at 1440; under 360px only for a band (a call to action, a logo row, a statement), at most twice a page.

## 5. Compositions

The bodies a section is built from. They are layouts, not components: build each in the theme's material and the brief's content, and never use the same one twice in a row, except in a shape built on one composition (Split Studio, Feature Stack, Catalogue), where neighbours change ratio, and side where the shape allows it (a Feature Stack's pinned pane and a Split Studio's proof keep theirs). A page uses three to six different ones; a one-composition shape uses its one, varied in ratio and scale.

1. **Split.** A text block (head, line, then two to four short facts or one action) beside a visual on columns 6 to 12 or 7 to 12, the visual 440px tall or more at 4:3 to 4:5 (portrait for a product photograph); swap the side at most once a page, and change the ratio (5 and 7, 4 and 8, 6 and 6) between two splits.
2. **Showcase.** The head block, then one visual across all twelve columns at 16:9 to 21:9 (560px tall or more); beneath it, at most two smaller visuals at 8 and 4 or 7 and 5 columns, never three equal frames.
3. **Grid.** Three or four items across the twelve columns (or two by two): plans, products, places, rooms, dishes, each with its photograph, a large figure, or a title set big enough to carry the cell, then one line; equal heights, aligned tops, 240px or taller. Never a row of empty frames (68), never stock faces for people (F9) and never icon tiles over headings (3).
4. **Bento.** Four to six tiles on six or twelve columns in mixed spans (8 and 4 over 4, 4 and 4; or 7 and 5 over 5 and 7), rows 280 to 360px, two tiles at least carrying a visual, one tile clearly the lead.
5. **Rows.** Three to five full-width rows parted by hairlines, each 72 to 120px tall: a title at `--text-title` on columns 1 to 5, its line or figure on 6 to 12. A head block may sit on columns 1 to 4 beside rows on 5 to 12 (an FAQ, an index, a timeline, a price list).
6. **Table.** A full-width table of four or five rows, 56 to 72px each, numerals tabular, the column that names the row set one step heavier.
7. **Figures.** Three or four real numbers at `--text-display-s` with their labels beneath, spanning the twelve columns, parted by vertical hairlines. Only figures the user gave (46a).
8. **Steps.** Three or four stages across the columns, each a numeral (a real `<ol>`, never a `01` label over a section head, 54), a title and a line, with a visual beneath or beside the row where the material has one; or a vertical run with a visual per stage on a fixed side.
9. **Statement.** One sentence sized so it fills eight to ten columns in two or three lines, from `--text-section` up to `--text-display` (a condensed or light face takes the larger step), with its attribution or one action; air is the composition here, once a page.
10. **Band.** A change of paper (`--color-paper-2`, the ink, or a field of the accent where the posture allows) running edge to edge, the container inside: a head at `--text-section` with one line on columns 1 to 7 and the action or a form on 8 to 12. The close of most pages.
11. **Form.** The fields on six or seven columns beside the head block and two to four facts, inputs 48 to 56px tall, one primary action.

Under 60rem every composition stacks in reading order: the head block, then the body; a split's visual after its text; a grid two across, then one under 40rem; rows keep their title above their line; a bento's lead tile first. Visuals keep their aspect ratio and lose their minimum height; nothing scrolls sideways except a table that says so (`responsive.md`).

## 6. The hero

The first screen at 1440 x 900 and 1920 x 1080, and only the first screen (44c). Pick a posture at Step 2, stamp it, and vary it run to run.

| Posture | Height | Content |
| --- | --- | --- |
| **Settled** (default) | fills the screen under the nav | centred in the screen; the text on six columns, the visual on the other six |
| **Stage** | fills the screen under the nav | the text on five columns, a visual on seven standing 60 to 75% of the screen tall (the reverse when a poster-size head needs the width); it may bleed off the outer edge |
| **Banner** | 50 to 60% of the screen | the first section shows above the fold; for references, docs, utilities |
| **Ledge** | fills the screen | a tall field above, the head resting at the base; at 1920 the head grows to its cap first |
| **Corridor** | fills the screen | one centred column of 44ch or less, the head larger than usual |
| **Poster** | 92 to 100dvh | a full-bleed photograph or canvas, the content set on its calmest part with room around it, low and left or centred, never squeezed into a corner |

- **Centred in its screen.** For Settled, Stage, Banner and Corridor, the space under the content is 1.0 to 1.5 times the space above it (44a), and the lowest content sits within 160px of the fold (79). A hero whose content ends at 60% of the screen with nothing under it is the dead band, and more than about 160px of air above the content is its twin; spend the height on a larger visual or larger type, never on copy.
- **The visual is big.** Six or seven columns wide and 60% of the screen tall or more (520px at 1440 x 900), or a portrait object (a cover, a phone, a bottle) at 75% of the screen tall on four or five columns; its centre within 60px of the text block's; never pinned in a corner. The hero grid takes its own column gap, `--space-2xl` to `--space-3xl` (64 to 96px), as two tracks (`6fr 5fr`, `5fr 7fr`) rather than spans on the twelve columns, which leave an empty column between them, so the text and the visual stand 48 to 120px apart; under 60rem, where the hero stacks, that gap becomes a row gap of `--space-xl`. The page's one column gap binds below the hero. What it shows is `imagery.md` § 1: a photograph of the brief's subject, the product's main screen built at full fidelity, or the user's own picture; a working form is a section or a close, not the default hero.
- **No visual:** the head grows to `--text-display` at its cap and spans eight to twelve columns, or the posture is Banner and the first section starts by 640px.
- **The text:** the head (seven words or fewer), one sentence at `--text-lead`, one or two actions (58). Under 60rem every posture collapses to its content's height (Poster may stay full-bleed).

## 7. The page

- **Order follows the argument the shape makes** (`macrostructures.md`), never the default run of a hero, three features, a call to action and a footer (8). Lead with the strongest real thing after the hero, and put each fact where it does work.
- **Variety by composition:** never the same composition in two neighbouring sections (a one-composition shape aside); mirror a split once at most, never a zigzag; at least one full-width visual on a product page; one or two bands a page. Read the log's `sections`: a Statement and a closing Band are the easiest reaches, so when the last build used either, make that beat another way (a figure row, a showcase, a form on paper).
- **Pace:** give each section a density role, and follow a dense one (a grid, a table, a bento) with a quiet one (a statement, a showcase); the page ends on a real close, never on a section that trails off. A section flatter than its neighbours takes the strongest device they use.
- **The footer closes the page:** 200 to 400px at 1440: the wordmark or one closing line, the page's real links, the legal line. A single line under a hairline is a colophon, right for a letter, a document or a manifesto.
- **The nav is one line, 56 to 80px tall**, and fits the page's real destinations. A vocabulary to pick from and vary against the log: edge-aligned (wordmark and one or two links or an action at opposite edges), a floating pill detached from the edges, a masthead (a large centred wordmark over a rule, for an edition), a slab (a heavy full-width bar with a solid rule), a search-led bar with a visible command pill, a banner over a bar that retracts on scroll, a three-part bar only for four or more real destinations (42). A side rail only where a sticky object earns it.
- **Footer vocabulary:** a mast (the wordmark large over the links), a statement (one closing sentence large, the links beneath), a colophon block (credits and address as one paragraph), a newsletter-first footer (the form leads), a letter close (a sign-off and a date), index columns only for a hub with a real sitemap.

## 8. Before shipping

Scroll the page at 1440 x 900, one screen at a time, and ask of each: is something on this screen big enough to be the reason the screen exists? If a screen holds only a heading and a line, the section above it is too short or the one below too small: grow the visual, set the line as a statement, or merge the two sections. Then squint: with the words blurred, each section should still have a shape, a mass on the columns, and the page a rhythm of heavy and light; a section that only works once its words come back is held up by its type size alone. The render tier measures width (77), head scale (78) and the hero's foot (79); the eye judges the rest.
