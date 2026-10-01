### N1 · Wordmark and two links
A top bar: wordmark left, two text links right ("Pricing", "Sign in"). No logo image, no menu icon.
*Use when:* the page has two destinations, no more.
*Not:* N1b (a centre cluster and a button, the reflex bar, 42); N9 (one action and nothing else).

```html
<nav class="nav-min" aria-label="Primary">
  <a class="wordmark" href="/" aria-label="Studio, home">Studio</a>
  <ul><li><a href="/pricing">Pricing</a></li><li><a href="/sign-in">Sign in</a></li></ul>
</nav>
```
```css
.nav-min { display: flex; justify-content: space-between; align-items: center; padding: var(--space-md) var(--gutter); }
.nav-min ul { display: flex; gap: var(--space-lg); list-style: none; margin: 0; padding: 0; }
.nav-min a { font-size: var(--text-sm); text-decoration: none; }
```

## Knobs

- Placement: split · both right
- Sticky: yes · no
