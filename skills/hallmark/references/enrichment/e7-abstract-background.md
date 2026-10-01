### E7 · Abstract background, subtle gradient plus grain

A two-colour CSS gradient at low chroma with SVG `<feTurbulence>` grain under 0.1 opacity. Not aurora, not a mesh, not floating orbs (29). Texture you can barely see: paper quality, not decoration. It never moves; parallax is banned (`craft.md` § 5) and scroll-linked motion lives only in `scroll-choreography.md`.

*Use when:* the page would feel synthetic on a flat surface.
*Avoid when:* the theme already has a paper feel (Specimen, Atelier, Riso); doubled grain is mud.

**Knobs:**
- Gradient direction (45° · 135° · radial)
- Grain (off · subtle · textured)

**Example.** A small podcast site. A two-stop gradient at 135° (warm cream to a faint orange, both under 0.04 chroma) over the hero only, never page-wide, with a `<feTurbulence>` grain overlay at 0.06 opacity in `multiply`.

```html
<section class="hero hero--bg">
  <div class="hero__bg" aria-hidden="true">
    <svg width="0" height="0" style="position: absolute;">
      <filter id="grain"><feTurbulence baseFrequency="0.9" numOctaves="2"/></filter>
    </svg>
  </div>
  <div class="hero__copy"> ... </div>
</section>
```
```css
.hero--bg { position: relative; isolation: isolate; }
.hero__bg {
  position: absolute; inset: 0;
  background:
    linear-gradient(135deg,
      color-mix(in oklab, var(--color-paper) 96%, var(--color-accent)),
      color-mix(in oklab, var(--color-paper) 50%, var(--color-paper-2)));
}
.hero__bg::after {
  content: ""; position: absolute; inset: 0;
  filter: url(#grain);
  opacity: 0.06;
  mix-blend-mode: multiply;
  pointer-events: none;
}
.hero__copy { position: relative; }   /* later in the DOM, so it paints above the backdrop without a z-index */
```
