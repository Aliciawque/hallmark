### H8 · Screenshot as a plate
Headline left, one real capture right, set like a plate in a catalogue: a `<figure>` with a `<figcaption>` carrying a fact (what is shown, which build, when), or the theme's `data-slot` placeholder until the user's capture arrives. No chrome, no tilt, no stack (47a, 47b).
*Use when:* the product is a web app and the user has a clean capture.
*Not:* H7 (video, clipped); a drawn mockup with invented figures (47c). One frame at most: a hairline inset outline, never a browser bar or an OS window.

```html
<section class="hero-plate">
  <div class="hero-plate__copy"><h1>…</h1><p>…</p><a class="cta-outline" href="#">…</a></div>
  <figure class="hero-plate__figure">
    <div class="hero-plate__capture" data-slot="hero"><!-- the user's capture, or the theme's placeholder (craft § 8) --></div>
    <figcaption>…</figcaption>
  </figure>
</section>
```
```css
.hero-plate { min-height: 80dvh; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: var(--gap-columns); align-items: center; padding-block: var(--space-2xl) var(--space-3xl); }
.hero-plate__figure { margin: 0; display: grid; gap: var(--space-sm); }
.hero-plate__capture { aspect-ratio: 16 / 10; border-radius: min(1vw, 12px); outline: 1px solid color-mix(in oklab, var(--color-ink) 8%, transparent); outline-offset: -1px; box-shadow: var(--shadow-card); }
.hero-plate__figure figcaption { font-size: var(--text-sm); color: var(--color-muted); }
@media (max-width: 60rem) { .hero-plate { grid-template-columns: minmax(0, 1fr); } }
```

The caption sits outside the slot so the slot script does not hide it when the image lands.

## Knobs

- Frame: none · hairline inset
- Caption: beneath · in the margin beside
- Capture: 16/10 · 4/3 · one phone-tall 9/16 with real content

## Mobile

- Below 60rem: one column, the plate beneath the text, full width.
