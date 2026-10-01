### Ft8 · Marquee scroll
A horizontal infinite-scroll line repeating one short phrase with a dot between repeats (the marquee's separator is the one legal middle dot, 63). Sentence case, untracked, in the display face. Pauses on hover and on focus (18).
*Use when:* the brand voice is loud and kinetic: sport, manifesto, playful.
*Don't confuse with:* Ft4 Dense colophon (which is static text).

```html
<footer class="foot-marquee" aria-label="Footer">
  <div class="foot-marquee__track" aria-hidden="true">
    <span>Open all summer · Open all summer · Open all summer · Open all summer · </span>
    <span>Open all summer · Open all summer · Open all summer · Open all summer · </span>
  </div>
  <p class="visually-hidden">Studio, open all summer. MIT licensed.</p>
</footer>
```
```css
.foot-marquee { overflow: clip; border-top: 2px solid var(--color-ink); }
.foot-marquee__track { display: flex; gap: var(--space-2xl); white-space: nowrap; padding-block: var(--space-md); animation: foot-marquee 32s linear infinite; }
.foot-marquee:hover .foot-marquee__track, .foot-marquee:focus-within .foot-marquee__track { animation-play-state: paused; }
.foot-marquee__track span { font-family: var(--font-display); font-weight: 700; font-size: clamp(1rem, 2.5vw, 1.5rem); }
@keyframes foot-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .foot-marquee__track { animation: none; } }
```

The two spans are identical so the loop is seamless at -50%. `html` and `body` still carry the page's `overflow-x: clip` (34); the footer's clip is local.

*Anti-pattern:* Ft8 in an editorial or quiet context, where the motion is noise. Pair it only with playful, sport or manifesto voices.

## Knobs

- Speed: 24s · 32s · 48s
- Direction: left · right

*Mobile:* below 60rem the speed slows by about a quarter; below 40rem the track height steps down.
