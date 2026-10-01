### N6 · Newspaper masthead
A full width header: a large centred wordmark, an issue and date line in the body face above or below it, an optional link row beneath, a double rule under all of it.
*Use when:* the page is editorial, a magazine, framed as an issue or an edition.
*Not:* N9 (small, asymmetric). On a SaaS or developer product it reads as costume. The issue line is a fact in a `<time>`, never an eyebrow (54); the wordmark's capitals are the wordmark's and nothing else in the masthead is uppercase (67).

```html
<header class="nav-mast">
  <p class="mast-line"><time datetime="…">…</time></p>
  <a class="mast-name" href="/" aria-label="Studio, home">STUDIO</a>
  <nav class="mast-nav" aria-label="Primary">
    <ul><li><a href="/catalog">Catalog</a></li><li><a href="/voice">Voice</a></li><li><a href="/letters">Letters</a></li></ul>
  </nav>
  <hr class="mast-rule" aria-hidden="true">
</header>
```
```css
.nav-mast { display: grid; gap: var(--space-2xs); padding: var(--space-md) var(--gutter) 0; text-align: center; }
.mast-name { margin: 0; font-family: var(--font-display); font-size: clamp(2.25rem, 5vw, 3.75rem); letter-spacing: -0.01em; line-height: 1; text-decoration: none; }
.mast-line { margin: 0; font-size: var(--text-sm); color: var(--color-muted); }
.mast-nav ul { display: inline-flex; gap: var(--space-md); list-style: none; padding: 0; margin: var(--space-2xs) 0 0; }
.mast-rule { border: 0; border-top: var(--rule-hair) solid var(--color-rule); border-bottom: var(--rule-hair) solid var(--color-rule); height: var(--space-2xs); margin: var(--space-sm) 0 0; }
```

## Knobs

- Issue line: above · below · none
- Wordmark size: 3xl · 2xl · xl
- Rule: double · single · none

## Mobile

- Below 60rem: the link row wraps. Below 40rem: the wordmark steps down; the links go behind a menu disclosure.
