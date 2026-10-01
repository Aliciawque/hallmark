### E1 · Demo video, clipped by the viewport edge

A display headline left, a real product capture right, and the rightmost 10 to 20% of the capture extending past the viewport so it is cut off on purpose. The clip is the design: it says there is more product than fits on this screen.

*Use when:* the brief is a SaaS, developer tool, dashboard or platform and you have real footage of the product.
*Avoid when:* you have no footage. The visual is a `data-slot` holding a real capture or the slot's designed placeholder (`craft.md` § 8); never a drawn mockup, a CSS-art chart or a stock clip standing in for the product (47c).

**Knobs:**
- Clip side (right · left · both)
- Aspect ratio (16/10 · 16/9 · 4/3)
- Frame (hairline · none); never drawn browser chrome (47a)

**Example.** Tracejam, an observability tool (test 05-tracejam-saas). Headline left ("Distributed tracing that explains itself."); the trace waterfall capture right in the hero slot, tilted -0.4°, extending 12vw past the viewport's right edge, aspect 16/10, hairline frame. Without footage the slot shows its designed placeholder. Under 60rem the clip goes and the two stack.

```html
<section class="hero hero--clipped">
  <div class="hero__copy">
    <h1>Plan, build, ship.</h1>
    <p>The project tracker your engineering team will keep open.</p>
    <a class="btn" href="/signup">Start a project</a>
  </div>
  <figure class="hero__media" data-slot="hero">
    <video autoplay muted loop playsinline preload="metadata"
           poster="/hero-poster.webp" fetchpriority="high"
           aria-label="Tour of the dashboard">
      <source src="/hero.av1.mp4"  type='video/mp4; codecs="av01.0.05M.08"'>
      <source src="/hero.vp9.webm" type="video/webm">
      <source src="/hero.h264.mp4" type="video/mp4">
    </video>
  </figure>
</section>
```

```css
.hero--clipped {
  display: grid;
  grid-template-columns: minmax(20rem, 1fr) minmax(0, 1.4fr);
  gap: var(--space-2xl);
  align-items: center;
  overflow: visible;        /* the media spills past the page edge; html and body carry overflow-x: clip (34) */
}
.hero__media {
  width: calc(100% + 12vw); /* the part of the viewport that sits beyond the right edge */
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-card);
  border: var(--rule-hair) solid var(--color-rule);
  overflow: hidden;
  margin: 0;
}
.hero__media video { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 60rem) {
  .hero--clipped { grid-template-columns: 1fr; }
  .hero__media { width: 100%; }    /* a clipped edge on a phone looks broken */
}

@media (prefers-reduced-motion: reduce) {
  .hero__media video { display: none; }
  .hero__media { background: url('/hero-poster.webp') center / cover; }
}
```

Never `loading="lazy"` on the hero video (28a); `preload="metadata"` and `fetchpriority="high"`. Always a `poster` and a `<track kind="captions">`. The hairline frame is the only chrome: never traffic lights, a URL pill or a title bar.
