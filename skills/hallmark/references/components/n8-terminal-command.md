### N8 · Terminal command
The nav is a command line: `> studio --catalog --voice --get`, the links are flags. A blinking cursor ends the line. It is legal because the line is a typed command and the cursor says "type next"; it is the page's only cursor, and nothing else on the page blinks (66).
*Use when:* the page is a CLI tool, developer docs, or a theme whose material is mono.
*Not:* N13 (a palette, not a bar). On a non-developer site the `>` prompt is set decoration.

```html
<header class="nav-term">
  <pre class="nav-term__line"><span class="prompt">&gt;</span> studio <a href="#catalog">--catalog</a> <a href="#voice">--voice</a> <a href="#get">--get</a><span class="caret" aria-hidden="true">▮</span></pre>
</header>
```
```css
.nav-term { padding: var(--space-sm) var(--gutter); border-bottom: var(--rule-hair) solid var(--color-rule); }
.nav-term__line { margin: 0; font-family: var(--font-outlier); font-size: var(--text-sm); }
.nav-term__line .prompt { color: var(--color-accent); padding-right: 0.4ch; }
.nav-term__line a { color: var(--color-ink); text-decoration: underline; text-underline-offset: 2px; }
.caret { display: inline-block; width: 1ch; color: var(--color-accent); animation: blink calc(var(--dur-long) * 2.5) steps(2) infinite; }
@keyframes blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .caret { animation: none; opacity: 1; } }
```

`--font-outlier` is the theme's mono face here; the theme names it.

## Knobs

- Prompt: `>` · `$` · `~/$`
- Cursor: at the line end · none
- Width: full bleed · content · 80ch

## Mobile

- Below 60rem: the flags wrap onto a second `>` line. Below 40rem: one flag, `--menu`, opens the disclosure; the cursor stays at the end.
