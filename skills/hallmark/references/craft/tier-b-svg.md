## Tier B · Hand-built SVG illustration

**When.** Illustration CSS cannot express cleanly: characters, articulated figures, organic curves, multi-element scenes. The bakery's storefront, the studio mascot, a workflow diagram with seven labelled paths. Scales without limit, compresses to under 10 KB, animates; the cost is designing in Figma and cleaning the export. Typically 4 to 15 KB inline.

### Pipeline

1. **Design in Figma.** Constraints and variants; keep paths as paths, never rasterise. Name the layers; the export honours them.
2. **Export as SVG.** Outline strokes only when you need stroke-as-fill animation; otherwise keep them strokes.
3. **Run it through [SVGOMG](https://jakearchibald.github.io/svgomg/).** Removes Figma metadata, unused `<defs>` and redundant transforms; 30 to 60% smaller is typical.
4. **Inline the result** for animation, or save `static.svg` and reference it from `<img>` or `background-image` for caching.
5. **Animate declaratively:** CSS keyframes on `<path d="">`, `@property`-driven interpolation, or [Motion](https://motion.dev) for orchestrated sequences.

### A hand-built SVG with declarative animation

Fills and strokes come from the tokens: the crumb is the accent, the score marks are the accent darkened, the shadow is the ink at low alpha (48).

```html
<svg viewBox="0 0 200 100" class="loaf-svg" role="img" aria-label="A loaf of bread">
  <path class="loaf-body" d="M 20 70 Q 100 10 180 70 L 180 90 L 20 90 Z" />
  <path class="loaf-score" d="M 60 50 L 90 30 M 100 45 L 130 25 M 140 50 L 165 35" />
</svg>
```

```css
@property --bake {
  syntax: "<percentage>";
  initial-value: 0%;
  inherits: false;
}

.loaf-body {
  fill: var(--color-accent);
  filter: drop-shadow(0 4px 8px oklch(from var(--color-ink) l c h / 0.16));
  transform-origin: 100px 90px;
  animation: bake 6s var(--ease-in-out) infinite alternate;
}

.loaf-score {
  stroke: oklch(from var(--color-accent) calc(l - 0.3) c h);
  stroke-width: 2;
  stroke-linecap: round;
  fill: none;
  stroke-dasharray: 0 200;
  animation: score 1.6s 0.8s var(--ease-out) forwards;
}

@keyframes bake  { to { transform: scaleY(calc(1 + var(--bake) * 0.005)); --bake: 1%; } }
@keyframes score { to { stroke-dasharray: 200 200; } }

@media (prefers-reduced-motion: reduce) {
  .loaf-body, .loaf-score { animation: none; }
  .loaf-score { stroke-dasharray: 200 200; }
}
```

The breath comes from `@property --bake` interpolating a percentage; the score marks draw themselves once on load via `stroke-dasharray`. No JS, 18 lines of CSS, reduced-motion safe.

### Animation choices for SVG

| Method | When | Verdict |
| --- | --- | --- |
| **CSS keyframes on `<path d>`** | Path morphing where shapes have matching anchor counts | Use it; composable with the rest of CSS |
| **`@property` plus animated custom properties** | Smoothly interpolated colour, length, angle, percentage | Use it; declarative, predictable |
| **CSS keyframes on `transform` and `opacity`** | Position, rotation, fade | Always; composited, no layout thrash |
| **`stroke-dasharray` draw-on** | Line illustrations that build themselves | Yes; cheap and effective |
| **SMIL `<animate>`** | Attribute animation CSS cannot express | Only then; CSS composes, SMIL does not |
| **JS via Motion or GSAP** | Multi-element orchestrated entrances, scroll scrubbing, long timelines | When CSS is not enough; see tier C |

### Anti-patterns of hand-built SVG

- **Shipping the raw Figma export.** Always SVGOMG; untouched exports carry metadata, unused `<defs>` and doubled transforms.
- **A 300 KB SVG.** Over 30 KB is suspicious; most well-built illustrations sit at 4 to 15 KB. A 100 KB file has hidden raster embeds or thousands of needless path commands.
- **`viewBox` cruft.** Match the box to the design's bounds: no padding, no extra space.
- **Linear easing on everything.** `--ease-out` at minimum, or a cubic-bezier to two decimals.
- **Path morphing across mismatched anchor counts.** Browsers interpolate, but it jitters. Match the counts or use `clip-path`.

---

## The bakery worked example, end to end

**Brief:** "Build a landing page for a small bakery in Lisbon."

**Shape:** Long Document; the bakery is a story-led brand, not a product.
**Direction:** Atelier, dealt: warm paper, prose-led, intimate.
**Enrichment:** E5 custom illustration centrepiece, tier B.

**The output:** a 60-line SVG of a single loaf, three paths (crust, crumb, score marks), to the right of the headline at 40% column width. `@property --rise` lifts it 4px over 6s, ease-in-out, alternating; the score marks draw themselves on first paint. Reduced motion shows the static loaf.

```css
/* Hallmark · shape: Long Document · genre: editorial · theme: Atelier (deal 1/3, seed maple·2026-09-22·r0)
 * hero: Corridor · nav: wordmark and two links · footer: letter close · enrichment: E5 illustration, tier B SVG, 60 lines, @property --rise plus stroke-dasharray draw-on · signature: the loaf that breathes
 * axes: light/serif/warm · posture: restrained · contrast: pass · fold: pass · v2.1.0 */
```

The next bakery brief gets a different loaf: a different curvature, rise distance and score pattern, or a different subject altogether (a boule, a baguette, a flatbread). The knobs in [`hero-enrichment.md`](../hero-enrichment.md) make sure of it.
