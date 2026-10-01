### H1 · Marquee
A single statement fills the fold. No subhead. The page's one action is the nav's control, in view at the top of the same screen (44b).
*Use when:* the brand or person is the message.
*Not:* H4 (a number, not a statement); a marquee with a line of copy under it (58).

```html
<section class="hero-marquee">
  <h1 class="display-xxl">…</h1>
</section>
```
```css
.hero-marquee { min-height: 80dvh; display: grid; align-content: end; padding: 0 var(--gutter) var(--space-2xl); }
.display-xxl { font-size: clamp(3.5rem, 8vw, 7rem); line-height: 1; letter-spacing: -0.03em; max-width: 12ch; overflow-wrap: break-word; min-width: 0; text-wrap: balance; }
```

## Knobs

- Size: 7rem for a single word · 5.5rem for a line
- Alignment: left · centred · right
- Rule: none · one hairline above · one hairline below

## Mobile

- Below 40rem: the clamp floor drops to 2.75rem.
