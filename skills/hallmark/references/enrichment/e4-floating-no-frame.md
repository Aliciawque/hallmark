### E4 · Screenshot in a figure

Display headline left, a real screenshot right in a `<figure>` whose `<figcaption>` states a fact (what the capture shows, where it was taken). No drawn chrome of any kind: no traffic lights, URL pill, toolbar or title bar (47a). The capture floats with a soft shadow and a card radius, optionally tilted, optionally annotated with numbered pins. The former E3 (browser-framed) lives here without its frame.

*Use when:* you are selling a web app and have a clean, well-lit capture.
*Avoid when:* you have no capture. The figure's image area is a `data-slot` that shows the designed placeholder (`craft.md` § 8) until the user's capture replaces it; never a styled-div dashboard with invented figures (47c).

**Knobs:**
- Shadow (hairline · card · none)
- Corner radius (0 · card)
- Tilt (0° · 1.5° · 3°), removed under 60rem
- Numbered pins (none · up to three), each a small numbered pin on the capture with its caption in the margin beside it, never arrows and labels; the annotated version is F5 in the cookbook
- Background (paper · tinted well)

**Example.** A code-formatting CLI. Headline left ("Format anything in eight lines."), one capture right of the before and after diff, card radius, card shadow, tilted 1.5°, on a `--color-paper-2` well. The caption reads "The diff view, run on this repository."

```html
<section class="hero hero--figure">
  <div class="hero__copy">
    <h1>Format anything in eight lines.</h1>
    <p>One config for every language your repository speaks.</p>
    <a class="btn" href="/docs/install">Install the CLI</a>
  </div>
  <figure class="hero__figure">
    <div data-slot="hero" style="--tilt: 1.5deg">
      <div class="slot__placeholder" aria-hidden="true"><span>your screenshot</span></div>
    </div>
    <figcaption>The diff view, run on this repository.</figcaption>
  </figure>
</section>
```

```css
.hero--figure {
  display: grid;
  grid-template-columns: minmax(20rem, 1fr) minmax(0, 1.2fr);
  gap: var(--space-2xl);
  align-items: center;
}
.hero__figure { margin: 0; }
.hero__figure [data-slot] {
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  transform: rotate(var(--tilt, 0deg));
}
.hero__figure figcaption {
  margin-block-start: var(--space-md);
  font-size: var(--text-sm);
  color: var(--color-muted);
}

@media (max-width: 60rem) {
  .hero--figure { grid-template-columns: 1fr; }
  .hero__figure [data-slot] { transform: none; }
}
```

The slot contract (`[data-slot] > img` absolute, placeholder hidden once an image is present) comes from the scaffold. The caption sits outside the slot so it survives the swap.
