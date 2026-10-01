### H7 · Demo video, clipped by the viewport edge
Headline left, a real demo video right, its rightmost 10 to 20% running past the viewport: the clip implies more product than fits the screen. The recipe (codecs, autoplay, poster, reduced motion) is [`enrichment/e1-clipped-demo-video.md`](../enrichment/e1-clipped-demo-video.md); this is the structural sketch.
*Use when:* the product has a screen and the user supplied real footage. Without footage the same slot holds a real capture or the theme's `data-slot` placeholder (47c), never a drawn mockup.
*Not:* H8 (a still, uncut); H4 (number led).

```html
<section class="hero hero--clipped">
  <div class="hero__copy"><h1>…</h1><p>…</p><a class="cta-outline" href="#">…</a></div>
  <figure class="hero__media" data-slot="hero">
    <video autoplay muted loop playsinline preload="metadata" poster="/hero-poster.webp" fetchpriority="high">
      <source src="/hero.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"'>
      <source src="/hero.h264.mp4" type="video/mp4">
    </video>
  </figure>
</section>
```
```css
.hero--clipped { min-height: 80dvh; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: var(--gap-columns); align-items: center; overflow: visible; }
.hero__media { margin: 0 calc(-1 * min(12vw, 12rem)) 0 0; aspect-ratio: 16 / 10; border-radius: min(1vw, 12px); overflow: hidden; }
@media (max-width: 60rem) { .hero--clipped { grid-template-columns: minmax(0, 1fr); } .hero__media { margin: 0; } }
```

The section keeps `overflow: visible`; the page clips at `html` and `body` (34).

## Knobs

- Clip side: right · left
- Ratio: 16/10 · 16/9
- Frame: none · hairline inset

## Mobile

- Below 60rem: the clip drops; one column, full width media. Below 40rem: 16/9, the poster shows and autoplay is off.
