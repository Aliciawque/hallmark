# Writing a theme file

Read this only when creating or editing a file in this directory. A build never needs it: a catalog run reads the theme itself, and a derived run reads [`../direction.md`](../direction.md).

## The theme contract

**A theme is a material, not a plan.** It says what the page is made of. It does not say what the page contains, in what order, or in what shape. Two pages in the same theme should not share a section sequence.

A theme file **may** carry:

- palette values and their roles (paper, ink, muted, accent, accent-ink, focus, rule), in OKLCH
- the type pairing, the role each face plays, and its tracking, weight, and case conventions
- rule weight, radius, shadow stance, border treatment
- texture and material: grain, overprint, scanline, deckle, and their budgets
- motion character: how fast this theme moves and how it eases
- what the theme feels like, and what it is *not* (its nearest neighbour in the catalog, and the difference)
- three to six do-nots that are specific to **this theme's own failure mode**, not restatements of the global gates

A theme file **may not** carry:

- a section sequence, a page outline, or a "structural signature"
- a mandated nav, footer, hero, or enrichment archetype
- HTML scaffolds or page-part class names (`.masthead`, `.panel`, `.work`, `.meter`)
- verbatim copy, invented brand names, invented people, or taglines that read as strings to ship
- an eyebrow, in any form (gate 54)
- counts that fix a layout ("always three cells, never two, never four")

**When a theme enters or leaves this directory**, two lookups are edited by hand in the same change: the axes table in [`../theme-axes.md`](../theme-axes.md) (the catalog Rotation lookup) and the worn-coordinates digest in [`../direction.md`](../direction.md) § D (the anonymous triples a derived run must clear). Neither updates itself.

Where a theme genuinely invented something structural worth keeping, it belongs in the Library as an **optional** entry any brief can reach for, never as a thing this theme's builds must contain. The `## Build hint` block in each file is a token sketch, not a page: `:root` values and the two or three face rules that make the theme recognisable, and nothing that names a page part.
