### H9 · Custom illustration centrepiece
One built illustration beside the text: a hand-built SVG or a CSS shape that is the brand's thing (a loaf, a mark, a diagram). The build tiers, recipes and animation rules are [`enrichment/e5-custom-illustration-centerpiece.md`](../enrichment/e5-custom-illustration-centerpiece.md); this is the page-level sketch.
*Use when:* the brand has a thing worth drawing: a craft, a character, a process.
*Not:* H6 (photography); H8 (a capture). Never a library illustration (F10, 47c). The SVG carries an `aria-label` or `aria-hidden="true"` (33); its fills are tokens (48).

```html
<section class="hero-art">
  <div class="hero-art__copy"><h1>…</h1><p>…</p><a class="cta-outline" href="#">…</a></div>
  <svg class="hero-art__figure" viewBox="0 0 200 100" role="img" aria-label="…">…</svg>
</section>
```
```css
.hero-art { min-height: 80dvh; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: var(--gap-columns); align-items: center; }
.hero-art__figure { width: 100%; max-width: 36rem; justify-self: center; }
.hero-art__figure .fill { fill: var(--color-accent); }
.hero-art__figure .line { stroke: var(--color-ink); stroke-width: 2; fill: none; stroke-linecap: round; }
@media (max-width: 60rem) { .hero-art { grid-template-columns: minmax(0, 1fr); } }
```

## Knobs

- Build: pure CSS · hand-built SVG · generated still (when a character demands it)
- Motion: none · one loop that pauses on hover and focus · scroll linked (one per page)
- Scale: accent · dominant

## Mobile

- Below 60rem: one column; the figure sits beneath the text at 40% of the viewport width or less.
