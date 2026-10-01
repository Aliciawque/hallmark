# Imagery kit

The kit is two things: the composition playbook below (the category vocabulary and the layered, off-centre, blend-mode patterns that make abstract imagery read intentional) and a REAL set of hosted assets at `https://www.usehallmark.com/imagery/<category>/<file>`, listed in the manifest section and served from the deployed site (`site/imagery/` in the repo).

**The hard rule: never emit a URL that is not listed in the manifest below.** Anything not listed is CONSTRUCTED in-page instead: washes and blobs via craft tier-a CSS or tier-b SVG (see [`custom-craft.md`](custom-craft.md)), textures via CSS gradients, generated stills via tier-e only when the user opted in and `TOGETHER_API_KEY` is set (`scripts/imagegen.mjs`). A URL that 404s in the shipped page is worse than no image; the constructed fallback stays in reach for every listed asset too.

**How to compose.** One large object behind the text, biased to one side, blended where it earns its place. A gradient centred behind a headline is the default the kit exists to avoid.

---

## Categories

| Category | What | Format | Example uses |
| --- | --- | --- | --- |
| **avatar** | Studio portraits, varied ages and skin tones, neutral grounds. Generated, provenance sidecars committed. | JPG | A team or byline slot the user will fill with the real person. Never given a name, a title or a quote (19, 46a, F9); the TODO comment above it names what replaces it. |
| **mark** | Geometric marks in four families (orbit, stack, field, stroke), `currentColor`. | SVG | The mark beside the brand name in a wordmark composition. Inline the SVG (an `<img>` cannot inherit `currentColor`). Never a wall of invented customers (46a). |
| **watercolor** | Full-bleed soft-edge painterly fields on white paper. Warm + cool. | JPG | Section background accent; hero-half flood; behind-quote wash; composites with `mix-blend-mode: multiply`. |
| **transparent** | Brushstroke / blob gestures on PURE WHITE ground - no faked alpha. Composite with `img { mix-blend-mode: multiply; }` over light papers (the white vanishes); skip the category on dark themes; true alpha = hand-built tier-b SVG. | JPG | Layered hero composition (large, off-centre, behind text). The masterclass move. |
| **texture** | Tile-able paper grain, riso dot, cross-hatch, weave; `currentColor` where sensible. | SVG | Grain via `mix-blend-mode: multiply` at the `texture.md` budget (0.08 page-wide, 0.15 on one plate); section banding. |
| **screens** | App-screenshot frames built on Hallmark tokens (sources committed beside outputs; re-render is one Chrome command). | PNG | h8/f5 screenshot slots; phone-figure slots. |
| **ornament** | Small stamps, plates, numerals, flourishes. | SVG | Beside a quote; the section-label gutter; a letter close. (Hand-built per page until listed.) |
| **silhouette** | Abstract product shapes for empty slots. | SVG | Hand-built tier-b per page until listed. |

**Naming:** `<category>-<palette-family>-<variant>.<ext>`, as in `watercolor-warm-01.jpg`, `transparent-brush-cool-02.jpg`, `texture-grain-paper-01.svg`. Palette families: `warm`, `cool`, `neutral`, `chromatic`.

---

## Manifest (the allowlist - only what is listed here may be referenced by URL)

Assets live in the repo at `site/imagery/<category>/` and serve at `https://www.usehallmark.com/imagery/<category>/<file>` once the site deploys. Picking logic: match the active theme's palette family + the brief's tone, reference the listed URL, keep the constructed fallback in reach. Provenance: `gen:flux-1.1-pro` files carry a committed `.json` sidecar (model, prompt, date); pages embedding kit imagery append `imagery: <file> · <provenance>` to their Hallmark stamp.

```
avatar-01.jpg .. avatar-16.jpg    768x768    studio portraits, varied age/skin/hair, neutral grounds    team or byline slot until the real photo arrives    gen:flux-1.1-pro
watercolor-warm-01.jpg   1440x800   sienna/ochre wash pooling lower-left on white     section wash, warm palettes    gen:flux-1.1-pro
watercolor-warm-02.jpg   1440x800   terracotta/apricot wash upper-right               section wash, warm palettes    gen:flux-1.1-pro
watercolor-cool-01.jpg   1440x800   prussian/grey wash lower-right                    section wash, cool palettes    gen:flux-1.1-pro
watercolor-cool-02.jpg   1440x800   viridian/slate wash from the left edge            section wash, cool palettes    gen:flux-1.1-pro
transparent-brush-warm-01.jpg   1216x1216   sienna diagonal brushstroke on white; multiply   layered hero art, light papers   gen:flux-1.1-pro
transparent-brush-warm-02.jpg   1216x1216   ochre torn-edge blob on white; multiply          layered hero art, light papers   gen:flux-1.1-pro
transparent-brush-cool-01.jpg   1216x1216   prussian brushstroke on white; multiply          layered hero art, light papers   gen:flux-1.1-pro
transparent-brush-cool-02.jpg   1216x1216   slate-teal blob on white; multiply               layered hero art, light papers   gen:flux-1.1-pro
texture-grain-paper-01.svg   512x512   feTurbulence paper grain; set opacity to the texture.md budget   body grain via multiply       hand-built
texture-riso-dot-01.svg      24x24     offset riso dot lattice, currentColor          section banding                hand-built
texture-crosshatch-01.svg    16x16     45/135deg hatch, currentColor                  panel texture                  hand-built
texture-weave-01.svg         20x20     over-under weave bars, currentColor            divider banding                hand-built
mark-orbit-01..03.svg   32x32   circle grammar (ring+satellite, vesica, wedge)   wordmark marks   hand-built
mark-stack-01..03.svg   32x32   bar grammar (steps, bar+counter, offset slab)    wordmark marks   hand-built
mark-field-01..03.svg   32x32   grid grammar (displaced dot, diagonal run, rotated square)   wordmark marks   hand-built
mark-stroke-01..03.svg  32x32   line grammar (chevrons, arc over baseline, oblique strokes)  wordmark marks   hand-built
screens/screen-dashboard-01.png    1280x800   analytics dashboard on Hallmark tokens   h8/f5 screenshot slots   hand-built
screens/screen-settings-01.png     1280x800   settings page on Hallmark tokens         h8/f5 screenshot slots   hand-built
screens/screen-feed-mobile-01.png  390x844    mobile card feed (uses kit avatars)      phone-figure slots       hand-built
```

**Wordmark placeholders are a composition, not files** (SVG text inside an `<img>` cannot inherit page fonts): inline a mark SVG beside the brand name set in the page's display token:

```html
<a class="wordmark"><svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" aria-hidden="true"><!-- mark-orbit-01 paths --></svg> Meridian</a>
```

---

## Usage patterns

(The `…/imagery/` paths in the examples below resolve against the manifest. For categories still unlisted (ornament, silhouette), swap in the constructed equivalent: inline tier-b SVG, gradient washes, CSS grain.)

### Layered hero composition

A transparent abstract object behind the hero text, set larger than feels safe: scale is what makes it read as intended rather than decorative.

```css
.hero { position: relative; isolation: isolate; }

.hero__art {
  position: absolute;
  top: 50%;
  right: -10%;
  transform: translateY(-50%);
  width: clamp(60%, 80vh, 1400px);
  height: auto;
  z-index: 0;
  pointer-events: none;
  /* Optional warmth: */
  mix-blend-mode: multiply;
  opacity: 0.85;
}

.hero__art--bias-left  { right: auto; left: -10%; }

.hero > * { position: relative; z-index: 1; }
```

Bias to one side (left or right, never centred). The text sits at `z-index: 1`, the art at `z-index: 0`. Test mobile: art may need to scale down or shift to avoid the headline at 320 px.

### Section background wash

A painterly field as a full-bleed section accent. One section per page, never global. The wash is constructed in CSS; a listed watercolor asset may replace the gradients in the same `background` line:

```css
.section--wash { position: relative; isolation: isolate; }
.section--wash::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(60% 48% at 22% 30%, oklch(from var(--color-accent) l c h / 0.14), transparent 70%),
    radial-gradient(50% 42% at 78% 72%, oklch(from var(--color-accent) calc(l + 0.08) calc(c * 0.6) h / 0.10), transparent 72%);
  z-index: -1;
  pointer-events: none;
}
```

### Decoration

Inline ornament beside a quote, or standing alone as a section divider. Small. No border, no shadow, no animation. Never inside a label above a heading, that is an eyebrow with a picture in it (gate 54); an ornament that opens a section stands on its own, as a rule does.

```html
<hr class="divider-mark" />
<h2>Opening hours</h2>
```

```css
.divider-mark { border: 0; height: auto; margin-block: var(--space-2xl); text-align: center; }
.divider-mark::before {
  content: ""; display: inline-block; width: 1.5rem; height: 1.5rem;
  background: var(--color-muted);
  mask: url("https://www.usehallmark.com/imagery/mark/mark-orbit-01.svg") center / contain no-repeat;
}
```

### Texture overlay

Grain over a solid colour, at the `texture.md` budget.

```css
.texture-grain {
  background-image: url("https://www.usehallmark.com/imagery/texture/texture-grain-paper-01.svg"), var(--color-paper);
  background-size: 256px 256px, cover;
  background-blend-mode: multiply;
  opacity: var(--texture-opacity, 0.08);
}
```

### Empty slot

An unfilled product or photo slot is a `data-slot` container with the designed placeholder from `craft.md` § 8, never a silhouette pretending to be the product.

---

## Anti-patterns

- **Don't use kit imagery as the literal subject.** An abstract wash is not a stand-in for a coffee-shop hero; that wants a photo slot (`assets.md` § Placeholder strategy). The kit is atmosphere, composition and decoration.
- **Don't layer 3+ kit pieces on one page.** Restraint. One transparent object in the hero + one wash in a later section is the cap.
- **Don't apply the same watercolor wash to multiple sections.** It's a section accent, not a global treatment.
- **Don't use kit imagery in the modern-minimal genre.** Its whole point is the absence of decorative imagery.
- **Don't centre the layered hero art.** Centred behind text is the AI-default move. Bias to one side, off-axis.
- **Don't use mix-blend-mode without testing on the active paper.** `multiply` over a dark canvas inverts; `screen` over light paper washes out. Eyeball the result per theme.

---

## Adding to the kit

Files live in `site/imagery/<category>/` and deploy with the site. A generated file carries a `.json` sidecar (model, prompt, date); a hand-built SVG uses `currentColor`. Every file stays under 200 KB. Add the file, add its line to the manifest above, and nothing else changes: the manifest is the allowlist, so a file that is not listed is not used.
