### N1b · Three-section product bar
Wordmark hard left, a centred cluster of three to five links (one or two opening small dropdowns), a sign-in link and one filled action hard right. Dense and balanced; the structural opposite of N1.
*Use when:* a product page has several real destinations and one clear primary action.
*Not:* N1 (two links, no centre); N5 (a detached pill); N11 (full width panels). This is the reflex bar (42): the stamp names it and one knob moves. The cluster never collides with the brand or the action; if it cannot sit centred with room, drop to three links or use N1. A dropdown opens on hover and on focus, and closes on Escape.

```html
<header class="nav"><div class="nav__inner">
  <a class="nav__brand" href="/" aria-label="Studio, home">Studio</a>
  <nav class="nav__center" aria-label="Primary">
    <div class="nav__item nav__item--menu">
      <button class="nav__link" type="button" aria-expanded="false">Product</button>
      <div class="nav__dropdown"><a class="nav__dropitem" href="/gateway"><b>Gateway</b><span>one endpoint</span></a></div>
    </div>
    <a class="nav__link" href="/docs">Docs</a><a class="nav__link" href="/pricing">Pricing</a>
  </nav>
  <div class="nav__right"><a class="btn btn--text" href="/sign-in">Sign in</a><a class="btn btn--accent" href="/start">Start</a></div>
</div></header>
```
```css
.nav { position: fixed; inset: 0 0 auto; z-index: var(--z-sticky-nav); background: transparent; border-bottom: var(--rule-hair) solid transparent;
  transition: background-color var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out); }
.nav.is-scrolled { background: color-mix(in oklab, var(--color-paper) 72%, transparent); backdrop-filter: blur(18px) saturate(160%); border-bottom-color: var(--color-rule); }
.nav__inner { max-width: var(--container); margin: 0 auto; padding-inline: var(--gutter); min-height: 64px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
.nav__brand { justify-self: start; } .nav__center { justify-self: center; display: flex; gap: var(--space-xs); } .nav__right { justify-self: end; display: flex; align-items: center; gap: var(--space-sm); }
.nav__link { font-size: var(--text-sm); padding: var(--space-xs) var(--space-sm); background: none; border: 0; color: inherit; text-decoration: none; }
.nav__dropdown { position: absolute; z-index: var(--z-dropdown); opacity: 0; visibility: hidden; transform: translateY(-6px);
  transition: opacity var(--dur-short) var(--ease-out), transform var(--dur-short) var(--ease-out), visibility 0s linear var(--dur-short); }
.nav__item--menu:hover .nav__dropdown, .nav__item--menu:focus-within .nav__dropdown { opacity: 1; visibility: visible; transform: none; transition-delay: 0s; }
```

Scroll state: transparent at rest over the hero; past 24px it frosts (blur, hairline) and its padding tightens by 8px (the outer height stays constant, 10b). The handler is rAF-throttled and passive.

## Knobs

- Centre links: 3 · 4 · 5
- Dropdowns: none · 1 · 2
- Scroll state: frost on scroll · always solid · transparent, fixed
- Right pair: sign in and fill · fill only

## Mobile

- Below 60rem: the centre cluster collapses behind a menu disclosure; sign in and the action stay. Below 40rem: wordmark left, menu and action right, 44px targets.
