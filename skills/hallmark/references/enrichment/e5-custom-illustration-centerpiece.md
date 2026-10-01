### E5 · Custom illustration centrepiece

A hand-built SVG (tier B, the default) or a generated still (tier E, when characters demand it) as the hero's single illustrative element: the bakery's loaf, the studio's mascot, the diagram of how the workflow flows.

*Use when:* the brand has a story or a thing it makes that benefits from being drawn.
*Avoid when:* the brand is a generic "modern professional team"; illustrating that is the new template.

**Knobs:**
- Build method (tier A CSS · tier B SVG · tier E generated · tier F library)
- Animation (none · loop · scroll-linked)
- Scale (small accent · dominant)

**Example.** Maple Street Bread, a bakery (test 03-maple-bakery). Letter-style hero copy left ("Saturday, 6:14 a.m. The dough went in at midnight."), a 60-line hand-built SVG loaf right, three paths (body, shade, score marks). `@property --rise` lifts it 4px over 6s, alternating; the score marks draw themselves on first paint via `stroke-dasharray`. Tier B, dominant scale, animation: loop. Reduced motion shows the static loaf.

How to draw the loaf and animate it with `@property` is in [`custom-craft.md`](../custom-craft.md): the tier B file carries the bakery worked example, and the recipes cover a workflow diagram, a mascot, an architecture diagram and a botanical accent.
