# Redesign

Loaded when the request opens with `redesign` or `audit`, or plainly asks to redesign, restyle or polish an existing page, site or app, or to make one look less generated. A redesign is a build whose material is the page that exists: SKILL.md still binds, and this file says what the run keeps, what replaces the Step 1 ask, and what the sweep adds. The target is the user's own code: a file, a folder, or a route on a dev server. A live URL with no source behind it can be audited through `--url` and nothing more. A small edit to an existing design (a tweak, one fix, new copy) is neither a redesign nor a Hallmark run.

## What a redesign keeps

- **The content.** Every fact, claim, name, price, date and quote the page states. Figures, quotes and logos already on the page are the user's material: carried over as found, never added to, and listed in the handoff for the user to verify.
- **The wiring.** Every link, form field, action, handler, route, id and test hook; every script, data call and analytics call. Edit markup inside the component that owns it. Never move logic, rename a prop, or drop a `name`, an `id`, a `key`, an `href` or a `data-testid` that a script or a test reads.
- **The files.** No file deleted, no route removed and no component tree replaced without a file-level plan the user approved, and no test edited to make the redesign pass. Documents in the repo (a README, a brief, a deck) explain the product; they are not page copy. In a git project, start from a clean tree (ask the user to commit or stash; never do it for them), so the redesign is one diff they can read and revert.
- **The brand.** A logo, a brand colour and a brand face the pre-flight finds stay at every depth unless the user lets them go; a real brand runs `brand-truth.md`. A locked `design.md` is the system at every depth.
- **The words,** unless a gate names them. Wording that fails a copy gate (19, 58, 63, 69) is tightened from the facts already on the page, and the handoff lists every changed line, before and after. Legal and consent text is never reworded. When the user says to keep every word, stamp `copy: verbatim`: 19, 58 and 69 then report as notes.

## Depth

How far the run goes. The user's words pick it; otherwise the project does, and the Picks block says which. Between two depths, take the lighter: a redesign that kept too much is one message from going further, and one that replaced too much has to be undone. The depths do not blend: a polish that finds the concept wrong says so and recommends the deeper run, it never smuggles one in.

| Depth | Stays | Changes | Picked by |
| --- | --- | --- | --- |
| **polish** | the system and the layout | only what a gate names: the tells, contrast, states, motion, tokens | *polish*, *clean up*, *fix the design*; a `design.md`; a design system the project owns |
| **restyle** | the layout | the system: colour, type, radius, shadow, motion, the controls | *restyle*, *reskin*, *a new look*; an app screen |
| **full** | the content and the wiring | the system and the composition: shape, hero, section objects, chrome | *redesign* on a marketing page; *looks generic*, *looks generated* |

*From scratch* is a build, not a depth: SKILL.md as written, the old page as its Step 2 inventory, in new files beside the old ones.

## Before

1. Run the pre-flight (Step 0), then list the pages in the target: route, file, and whether each is a marketing page, a content page or an app screen (`flow.md` § App screens). In a framework project start the dev server.
2. Record the page as it stands:

```
node <skill-dir>/scripts/sloplint.mjs <target> --render --before [--url <route> ...] [--scope app]
```

It lints, writes the screenshots to `.hallmark/before/`, and records every link, field, action, handler, test hook, heading and figure in `.hallmark/before.json`. An unstamped page has no genre: infer it as Step 1 does and say so.

3. Look at the screenshots before the findings, so the linter does not write the verdict, then give the read in four lines: what the page is for (the audience, the one action); what works and stays (at least one thing); what reads as generated (the worst tells, by gate); what is broken.

**`audit <target>` stops here:** the findings by tier with `file:line`, the read, and one line naming the depth that would settle them. It edits nothing.

## The ask

One message replaces the Step 1 ask; skip it when the request already answers it or no one can answer:

> *Before I redesign, three things. 1. **What stays**: the look (I fix only what reads as generated), the layout (new colour and type on the same structure), or only the content (a new design)? And anything I must not touch. 2. **What is wrong with it**, in your words, and the feeling you want instead. 3. **Anything new to show**: screenshots, photos, numbers, a quote. Or say **go ahead** and I will pick the depth from the project and say which.*

## The plan

The Picks block opens with four rows of its own, and nothing is deleted until the user has seen the Files row:

```markdown
- **Redesign** · restyle · 3 pages (/, /pricing, /docs)
- **Before** · Floor 14 FAIL · Reflex 9 · a centred template in a stock indigo; the pricing table is clear and stays
- **Keeps** · every link, field and handler · the green and the brand face · the pricing table
- **Files** · edit: app/page.tsx, app/pricing/page.tsx, app/globals.css · create: tokens.css, base.css · delete: none
```

Then the build rows the depth reaches: Theme at restyle and full (dealt, `brand` or locked); Shape, Chrome, Hero, Signature and Sections at full only, where Step 2 runs with the page's own content as its inventory. At polish the block stops after Files.

## Build

- **Polish** is the sweep in `flow.md` § Signal 8, on the user's own page: fix in place, single elements and tokens, never restructure. Its check stamp opens the stylesheet, with `built: the project · redesign: polish`.
- **Where the layout stays** (polish and restyle), the stamp's `redesign:` field tells sloplint to report the layout gates (6b, 8, 9, 32, 42, 44a, 44c, 58) as notes. Print them for the user with the depth that would settle them; do not rebuild them.
- **Restyle and full** start from the scaffold: `tokens.css` and `base.css` imported below the project's own styles and mapped onto the project's token names (a Tailwind theme, shadcn variables: `export-formats.md`). Pass the depth so the stamp carries it: `theme.mjs scaffold <slug> --redesign <depth>`. A kept brand takes `scaffold --brand --redesign <depth>` and fills the tokens from the palette and faces the pre-flight found (no `check`: the coordinates are the user's); otherwise the deal runs as in Step 3. Then the shared components and the chrome, then the pages, the most visited first, each swept before the next.
- **More than one page** at restyle or full: lock the system first (`design-md.md`). Every page reads it and the variety rule inverts: pages share theme, type and accent, and differ only in shape. Past three pages, give each page to its own subagent where the harness has them, with `design.md`, the page's files and this file.
- **Full depth** runs the hero stage and the hero review. Polish and restyle skip both.

## After

1. The sweep, against the record: `sloplint <target> --render --kept`. Anything the page had and no longer has is a `FAIL kept` (a link, a field, a form action, a handler, a test hook, a selector a script still queries) or a `WARN kept` (a heading, a figure, an image, an id). Restore it, or record what the user agreed to lose: `/* Hallmark · dropped /blog, #team · the user is retiring the blog and the team section */`. The run also writes `.hallmark/compare.html`, the before and after screenshots side by side: give the user its path.
2. The project's own checks, where it has them: the type check, the build, the tests. A redesign that breaks one is not finished.
3. The finish review also takes the `before` screenshots and answers what the old page did better (`review-finish.md`).
4. The log entry carries `mode: redesign`, `depth` and `scope` (page, site or app), plus the build's fields at full depth.
5. The handoff, ahead of the material ask:

```
Redesign · restyle · 3 pages
Before   Floor 14 FAIL · Reflex 9
After    Floor 0 · Reflex 1 waived (47b)
Kept     14/14 links · 5/5 fields · 9/9 handlers · 11/11 headings · every figure · the layout
Changed  the system: colour, type, radius, motion, the controls
Dropped  none
Layout   2 findings a full redesign would settle (8, 42), listed below
Yours    2 claims kept as found ("50,000+ teams", the Acme quote) · 4 lines reworded, listed below
Compare  .hallmark/compare.html
```
