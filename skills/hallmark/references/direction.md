# Direction: a world of its own

The opt-in path. A build takes it only when the user asks (**custom**, "derive it", "bespoke", "no theme", "a world of its own"). The direction is made for one brief and written into the page's own tokens; it never enters the catalog.

Left to its own taste a model ships the same few looks per category, and asked to be unusual it reaches for costume: a world painted onto the page (dials, stamps, paper, engraving) instead of a page that knows its subject. The ritual works against both. The idea comes from the client's own material, a seed picks among the candidates, the idea gets one move, and the rest of the page is plain and exact. Every gate fires unchanged; the Picks block shows the idea, the palette and the pairing before code so the user can redirect.

**Nothing from the catalog.** A custom run never deals and never opens a theme file, and its display face is one no theme sets. The reviewer's test: if a fresh reader could name the catalog theme this page resembles, rework it before the sweep.

**The catalog takes it back** when the user names a theme ("custom, something like Newsprint" is a theme pick with a mood note), when a `design.md` or a real brand already exists (inherit it), and in component scope. `--fast` on a custom ask resolves to the catalog; say so.

## The ritual

In order, before any palette work. Each step is a line or two; the whole reads as a short paragraph of decisions, not a form.

**R.1 Inventory.** Eight to twelve things only this client has: the name and what it means, the place and what it looks like, what the product does (one verb), its real numbers, its one constraint, its rituals and hours, the things its world prints, makes or wears, and the material the brief supplies. Mark each *shown* (a photograph of it exists, or it can be built) or *said* (it lives in words).

**R.2 The rut.** Name the page this category always ships and its predictable opposite; both are out. Spent in every family: cream, off-white or greige paper (warm beige is the same rut one step darker; take it only when the subject's own material is that colour, and say so), near-black with one neon accent, pill buttons, an italic or coloured word in a head, numbered or mono labels, a card grid, a centred head over three features. Your own rendition prior is spent too: a warm, bookish or family subject pulls Claude toward cream, serif and lamplight whatever the draw said, so re-read the idea before code and rework from the subject's own colours if the page drifted.

**R.3 The slate.** Seven candidates, numbered, one line each, written as *on this page, [an inventory item] becomes [a form]*. A form is a way of laying out information that this audience already knows how to read, taken from the client's own world: a document, a sign, a listing, a notation, a publication. Forms carry their restraint with them; an object that would have to be faked in CSS is not a form. Spread the seven across shown and said items, and give the brief's own noun one seat at most. Test each with the nearest real competitor: if the line still fits with their name in it, it belongs to the category, so rewrite it.

**R.4 The draw.** The model never picks its favourite:

```
node <skill-dir>/scripts/seed.mjs --brief "<the brief, as the user wrote it>" --n 7 --material photo|product|words
```

It prints `draw: n/7 (seed <slug>·<date>·r0)` (build slate line n), the faces for § C, and one **discipline**: a system rule about how far colour commits, how the grid holds, how the type steps or how pictures sit. Take it unless the material refuses it, and give a refusal one line in the Picks block. Re-roll only when the user asks (`--reroll 1`). Without Node: entry (letters in the brief, mod 7) + 1, no discipline; stamp `seed: fallback-<letters>·<date>·r<n>`.

**R.5 Reach.** The idea owns three things: the palette, the type voice and one signature move, on the first screen and echoed once at most. Everything else is plain and exact: the nav, the buttons, the forms, the section anatomy and every state are conventional, in the idea's colours and faces, and the regions around the signature hold still. Painted physicality (a bevel, an emboss, an engraving, paper or grain as a surface, a knob or a dial as ornament, a stamp) is costume: the page knows its subject, it does not dress up as it.

**R.6 The page plan.** The sections as claims, one line each with the proof it shows and the composition it takes (`layout.md` § 5): no composition twice, the signature in the hero, the strongest real material next. Number stages only when they are a real sequence, and set rows only for a real list; a run of Steps, Rows and a closing Band is the template whatever paints it.

**R.7 Colour posture.** Exactly one, with a reason: Restrained (accent under 5%), Committed (one colour carries 30 to 60% of the page as whole fields), Full palette (three or four named roles with jobs), Drenched (the ground is the colour). The stamp and the log carry it; gate 23 reads it.

**R.8 The contract.** Five lines, 120 words or fewer, a comment directly below the stamp and critique line:

```
/* direction contract · seed <key>
 * THESIS: the position the page takes, and the category default it refuses.
 * IDEA: on this page, <inventory item> becomes <form>; the signature move.
 * FIRST VIEWPORT: what sits where, how large, and where the action is.
 * SYSTEM: ground, ink and accent with where each came from; display and body; the three sizes.
 * ANTI: the page it must not be mistaken for (a real site or a familiar template) and the two moves that would make it that. */
```

A line that reads like a mood is undecided. The stamp adds `theme: custom · idea: "<the drawn line, n/7>" · vibe: "<4 to 8 words>" · paper: oklch(…) · accent: oklch(…) · display: <face> · body: <face> · axes: <triple> · posture: <posture> · seed: <key> · discipline: <the dealt rule, or refused: why> · contract: kept (5/5)`, the last field written only after the finish review; the log entry carries the same fields. The Picks block replaces its Theme row with **Idea** (the drawn line, the discipline) and **System** (the palette with its sources, the pairing).

## A. Pictures

They come from R.1, never from a mood. A shown item with a real photograph (the place, the food, the people at the work) leads, as `imagery.md` § 1 says, and one decisive photograph beats five. Software and ideas show the product built, or let type and colour carry the page: a first screen of type alone is a full answer. Every picture passes the deletion test: take it away and the page loses a fact. A city at night, a laptop on a desk or an office building on a software page fails it.

## B. Palette: sample, converge, argue

1. **Sample.** The first source that exists: the anchor colour the user gave (a real brand's from `.hallmark/brand-spec.md`, never memory); the colours of the photographs the page will show (the hero's dominant and its one strong hue); the subject's own materials (its interface, its paint, its packaging, its landscape). Never a hue for the category, such as blue for software or green for health.
2. **Converge.** A ground, an ink and one accent; under Committed or Drenched, one field colour beside them. Two chromatic colours at most, plus neutrals.
3. **Argue.** One clause per colour in the SYSTEM line saying where it came from. A colour with no source is a default.
4. **Ground.** Its lightness follows when and where the page is read: light L 95 to 99 (white with `surface: absolute` in the stamp, 7b), mid L 30 to 85, dark L 12 to 20. Cream, ivory, parchment and blue-black only when the subject pins them.
5. **Ink and neutrals.** Ink L 16 to 24 on a light ground, 88 to 96 on a dark one; the rule, the muted text and the second ink step toward the ground, tinted toward the accent at chroma 0.005 to 0.012 (22).
6. **Accent.** Chroma 0.12 to 0.20 and a stated role (the actions, focus, the one mark). The focus ring takes its hue at chroma 0.18 to 0.22; accent-ink reaches 4.5:1.
7. **Check** gates 7, 22, 23 and 65 before code. Texture only where a photograph is the ground; never paper, grain or noise as a surface.

## C. Type

One family or two, three with an outlier that carries one role (a wordmark, a figure, code). The display face is one no catalog theme sets: run `node <skill-dir>/scripts/theme.mjs check --face "<face>"`. Take the class the idea calls for from `fonts.md`; the draw's `faces` line deals one face per class and a body face of each kind, so start from those, and swap one only when it fails on the real headline, judged by its shape and never its name (a subject association is not a reason); the Picks block says why. Three sizes carry the page, far apart: the display at least four times the body and the section head between them; titles and leads stay one step from the body. Labels take the body face, sentence case, untracked (64, 67); a head is one weight and one colour (38iii). Free faces only unless the user confirms a licence.

## D. Axes

Declare the triple so Rotation reads it like a catalog theme's: paper band (dark under 30% L, mid 30 to 85, light over 85), display class (`fonts.md`), accent band (warm 10 to 60°, cool 200 to 300°, neutral under 0.05 chroma, chromatic-<name>), plus the posture. `node <skill-dir>/scripts/theme.mjs check --axes "<triple>" --face "<face>" --hue <h> --log .hallmark/log.json` names any catalog theme or recent build on the same coordinates. Then look at that theme's picture beside the page you are planning: move a coordinate only if the two would read alike, and say which in one line. Specificity, not distance on a chart, is what separates a custom page from the catalog.

## Bespoke depth

The brief's structure itself is the ask and no shape fits (a scroll-assembled poem, an index that is the whole page). The ritual runs as written; the build may drop the shape catalog, the genre routing and the rotation. It keeps every gate, the font and OKLCH discipline, one orchestrated motion, the Picks block, the stamp and the log. It is rare: on a vanilla brief it is over-reach.

## The finish review

The fresh-context reviewer gets the contract (`review-finish.md` has what a custom run adds). Before the sweep, re-read the contract yourself, promise by promise: an unkept promise is a revision, not a ship.

## What derivation does not do

It does not lower the floor, extend the catalog, invent facts (46a binds hardest where a fresh world makes invented proof feel at home) or skip the draw. It does not mean more decoration: a derived system is a tighter argument than a catalog theme, not a louder one.
