#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const HERE = dirname(fileURLToPath(import.meta.url));
const THEMES = join(HERE, '..', 'references', 'themes');
const INDEX = join(THEMES, 'index.json');
const VERSION = '2.3.0';
const args = process.argv.slice(2);
const cmd = args[0];
const flag = (k, d = null) => { const i = args.indexOf('--' + k); const v = i >= 0 ? args[i + 1] : undefined; return v !== undefined && !String(v).startsWith('--') ? v : d; };
const has = (k) => args.includes('--' + k);

function usage() {
  console.error(`usage:
  node theme.mjs deal --genre <g> --brief "<brief>" [--log .hallmark/log.json] [--n 3] [--reroll 0] [--json]
  node theme.mjs scaffold <slug> [--dealt "<n>/3, seed <seed>"] [--dir .] [--force]
  node theme.mjs scaffold --custom [--dir .] [--force]
  node theme.mjs check --axes "<paper>/<display>/<accent>" [--face "<display face>"] [--hue <accent hue>] [--log .hallmark/log.json]
  node theme.mjs index
  node theme.mjs list
  node theme.mjs validate <files...>`);
}

function parseHeader(src, file) {
  const m = /^---\n([\s\S]*?)\n---/.exec(src);
  if (!m) throw new Error(`${file}: no header block`);
  const h = {};
  for (const line of m[1].split('\n')) {
    const mm = /^([a-z]+):\s*(.*)$/.exec(line.trim());
    if (mm) h[mm[1]] = mm[2].trim();
  }
  const need = ['name', 'slug', 'genre', 'paper', 'display', 'accent', 'posture', 'keywords', 'material', 'signature'];
  for (const k of need) if (!h[k]) throw new Error(`${file}: header is missing "${k}"`);
  const [pband, pL, phue] = h.paper.split(/\s+/);
  const [dclass, ...dface] = h.display.split(/\s+/);
  const [aband, ahue] = h.accent.split(/\s+/);
  return {
    name: h.name, slug: h.slug, genre: h.genre, posture: h.posture,
    paper: { band: pband, L: Number(pL), hue: Number(phue) },
    display: { class: dclass, face: dface.join(' ') },
    accent: { band: aband, hue: Number(ahue) },
    keywords: h.keywords.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
    material: h.material, signature: h.signature, file: `references/themes/${basename(file)}`,
    ...(h.pictured ? { pictured: h.pictured } : {}),
    ...(existsSync(join(THEMES, basename(file).replace(/\.md$/, '.jpg'))) ? { picture: `references/themes/${basename(file).replace(/\.md$/, '.jpg')}` } : {}),
  };
}

function buildIndex() {
  const files = readdirSync(THEMES).filter((f) => f.endsWith('.md') && f !== 'README.md').sort();
  const entries = files.map((f) => parseHeader(readFileSync(join(THEMES, f), 'utf8'), f));
  const slugs = new Set();
  for (const e of entries) {
    if (slugs.has(e.slug)) throw new Error(`duplicate slug ${e.slug}`);
    slugs.add(e.slug);
  }
  writeFileSync(INDEX, JSON.stringify({ built: new Date().toISOString().slice(0, 10), themes: entries }, null, 1) + '\n');
  return entries;
}

function loadIndex() {
  if (!existsSync(INDEX)) return buildIndex();
  return JSON.parse(readFileSync(INDEX, 'utf8')).themes;
}

function readLog(p) {
  if (!p || !existsSync(p)) return [];
  try { const j = JSON.parse(readFileSync(p, 'utf8')); return Array.isArray(j) ? j : (j.runs || []); } catch { return []; }
}

const triple = (t) => `${t.paper.band}/${t.display.class}/${t.accent.band}`;
const sameTriple = (a, b) => a === b;
const words = (s) => (s || '').toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
const ASK = new Set(['build', 'make', 'create', 'design', 'need', 'want', 'please', 'page', 'site', 'website', 'landing', 'called', 'for', 'and', 'the', 'with', 'that', 'this', 'our', 'your']);
const briefWords = (s) => words(s).filter((w) => !ASK.has(w));
const hueGap = (a, b) => { const d = Math.abs(((a - b) % 360 + 360) % 360); return Math.min(d, 360 - d); };

function seededRand(key) {
  let h = createHash('sha256').update(key).digest();
  let i = 0;
  return () => { if (i >= h.length - 4) { h = createHash('sha256').update(h).digest(); i = 0; } const v = h.readUInt32BE(i); i += 4; return v / 0xffffffff; };
}

function pickFrom(pool, n, exclude) {
  const avail = pool.filter((s) => !exclude.has(s.t.slug));
  const picked = [];
  const tripleOf = (s) => triple(s.t);
  if (!avail.length) return picked;
  picked.push(avail[0]);
  const rest = () => avail.filter((s) => !picked.includes(s));
  if (rest().length) {
    const best = rest()[0];
    const other = rest().find((s) => s.t.paper.band !== picked[0].t.paper.band && s.fit >= best.fit - 2 && tripleOf(s) !== tripleOf(picked[0]));
    picked.push(other || rest().find((s) => tripleOf(s) !== tripleOf(picked[0])) || best);
  }
  while (picked.length < n && rest().length) {
    const cand = rest().find((s) => picked.every((p) => tripleOf(p) !== tripleOf(s))) || rest()[0];
    picked.push(cand);
  }
  return picked;
}

function deal() {
  const genre = flag('genre', 'editorial');
  const brief = flag('brief', '');
  const n = Number(flag('n', 3));
  const reroll = Number(flag('reroll', 0));
  const log = readLog(flag('log', '.hallmark/log.json'));
  const themes = loadIndex();
  const recent = log.slice(0, 3);
  const recentNames = new Set(recent.map((r) => String(r.theme || '').toLowerCase()));
  const lastAxes = recent[0] && recent[0].axes ? String(recent[0].axes) : null;
  const occupiedAxes = new Set(recent.map((r) => r.axes).filter(Boolean));
  const bw = new Set(briefWords(brief));
  const slug = briefWords(brief).slice(0, 4).join('-') || 'brief';
  const seedBase = `${slug}·${new Date().toISOString().slice(0, 10)}`;
  const seedKey = `${seedBase}·r${reroll}`;
  const rand = seededRand(seedBase);

  const scored = themes.map((t) => {
    let fit = 0; const hits = [];
    for (const k of t.keywords) { const kw = k.split(/\s+/); if (kw.every((w) => bw.has(w))) { fit += 2; hits.push(k); } }
    if (t.genre === genre) fit += 3; else fit -= 2;
    const blocked = recentNames.has(t.name.toLowerCase()) || (lastAxes && sameTriple(lastAxes, triple(t)));
    const sibling = occupiedAxes.has(triple(t));
    if (sibling && !blocked) fit -= 1;
    return { t, fit, hits, blocked, sibling, r: rand() };
  });
  const pool = scored.filter((s) => !s.blocked).sort((a, b) => b.fit - a.fit || a.r - b.r);
  const previously = new Set();
  for (let r = 0; r < reroll; r++) for (const p of pickFrom(pool, n, previously)) previously.add(p.t.slug);
  const picked = pickFrom(pool, n, previously);

  if (has('json')) { console.log(JSON.stringify({ seed: seedKey, genre, deal: picked.map((s) => ({ ...s.t, fit: s.fit, hits: s.hits })), avoided: [...recentNames] })); return; }
  console.log(`deal: ${seedKey} · genre ${genre}${reroll ? ` · reroll ${reroll}` : ''}`);
  picked.forEach((s, i) => {
    const why = s.hits.length ? `fits: ${s.hits.slice(0, 4).join(', ')}` : (s.t.genre === genre ? 'genre fit' : 'adjacent genre');
    console.log(`${i + 1}. ${s.t.name} · ${triple(s.t)} · ${s.t.material} · ${why} · ${s.t.file}${s.t.picture ? ` + ${s.t.picture}` : ''}${s.t.pictured ? ` (pictured as ${s.t.pictured})` : ''}`);
  });
  if (recent.length) console.log(`avoid: ${recent.map((r) => `${r.theme || '?'} (${r.axes || 'no axes'})`).join(' · ')}`);
  else console.log('avoid: nothing logged yet (first run for this project)');
  console.log(`next: look at the three pictures side by side and pick the material this brief wants (a picture in your own shape asks for a different section order), then node <skill-dir>/scripts/theme.mjs scaffold <slug> --dealt "<n>/${n}, seed ${seedKey}"`);
}

const PAPER_BANDS = new Set(['light', 'mid', 'dark']);
const DISPLAY_CLASSES = new Set(['roman-serif', 'high-contrast-serif', 'slab-serif', 'grotesk-sans', 'grotesk-heavy', 'geometric-sans', 'rounded-sans', 'display-condensed', 'display-heavy', 'mono', 'pixel', 'handwritten', 'blackletter']);
const ACCENT_BAND = /^(warm|cool|neutral|chromatic-[a-z-]+)$/;
const listOf = (set) => [...set].join(', ');

function check() {
  const axes = flag('axes');
  if (!axes) { usage(); process.exit(2); }
  const [pb, dc, ab] = axes.split('/').map((s) => s.trim());
  const unknown = !PAPER_BANDS.has(pb) ? `paper band "${pb}" (valid: ${listOf(PAPER_BANDS)})`
    : !DISPLAY_CLASSES.has(dc) ? `display class "${dc}" (valid: ${listOf(DISPLAY_CLASSES)})`
    : !ACCENT_BAND.test(ab || '') ? `accent band "${ab}" (valid: warm, cool, neutral, chromatic-<hue name>)` : null;
  if (unknown) { console.error(`unknown ${unknown}`); process.exit(2); }
  const face = (flag('face', '') || '').toLowerCase().trim();
  const hue = flag('hue') != null ? Number(flag('hue')) : null;
  const themes = loadIndex();
  const log = readLog(flag('log', '.hallmark/log.json'));
  let bad = 0;
  for (const t of themes) {
    if (t.paper.band === pb && t.display.class === dc && t.accent.band === ab) { bad++; console.log(`collision: ${t.name} owns ${triple(t)} · move one axis, accent first`); }
  }
  if (face) for (const t of themes) {
    const tf = t.display.face.toLowerCase();
    if (tf === face || tf.includes(face) || face.includes(tf)) { bad++; console.log(`collision: ${t.name} already sets its display in ${t.display.face} · pick a face no theme uses (fonts.md)`); }
  }
  if (hue != null) for (const t of themes) {
    if (t.paper.band === pb && t.display.class === dc && hueGap(t.accent.hue, hue) <= 20) { bad++; console.log(`adjacent: ${t.name} is ${triple(t)} at hue ${t.accent.hue} · move the accent hue 40 degrees or more, or change the display class`); }
  }
  const recent = log.slice(0, 3).filter((r) => r.axes === axes);
  for (const r of recent) { bad++; console.log(`recent: ${r.theme || 'a build'} on ${r.date || '?'} used ${axes}`); }
  if (!bad) { console.log(`clear: ${axes}${face ? ` in ${face}` : ''}${hue != null ? ` at hue ${hue}` : ''} lands on no catalog theme and no recent build`); return; }
  process.exitCode = 1;
}

function list() {
  for (const t of loadIndex()) console.log(`${t.name.padEnd(12)} ${triple(t).padEnd(38)} ${t.genre.padEnd(15)} ${t.material}`);
}

function tokenBlockOf(src, file) {
  const m = /```css\s*\n:root\s*\{([\s\S]*?)\n\}\s*\n```/.exec(src);
  if (!m) throw new Error(`${file}: no :root block in a css fence`);
  return m[1].replace(/\/\*[\s\S]*?\*\//g, '').split('\n').map((l) => l.replace(/\s+$/, '')).filter((l) => l.trim()).join('\n');
}

const SCALE = `  --space-3xs: 2px; --space-2xs: 4px; --space-xs: 8px; --space-sm: 12px; --space-md: 16px; --space-lg: 24px; --space-xl: 40px; --space-2xl: 64px; --space-3xl: 96px; --space-4xl: 144px;
  --text-xs: 0.8125rem; --text-sm: 0.875rem; --text-md: 1rem; --text-lg: 1.25rem; --text-xl: 1.5625rem; --text-2xl: 1.953rem; --text-3xl: 2.441rem;
  --text-display-s: clamp(2.25rem, 4vw + 0.5rem, 3.75rem); --text-display: clamp(2.75rem, 5vw + 1rem, 5.25rem);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1); --ease-in: cubic-bezier(0.7, 0, 0.84, 0); --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms; --dur-short: 220ms; --dur-long: 420ms;
  --color-error: oklch(52% 0.19 27); --color-success: oklch(50% 0.12 150);
  --container: 1440px; --gutter: 64px; --gap-columns: 32px; --section-gap: 144px;
  --z-base: 1; --z-raised: 10; --z-dropdown: 100; --z-sticky: 200; --z-sticky-nav: 300; --z-modal: 400; --z-toast: 500; --z-tooltip: 600;`;

const CUSTOM_TOKENS = `  --color-paper: oklch(96% 0.010 80); --color-paper-2: oklch(93% 0.012 80); --color-paper-3: oklch(89% 0.014 80);
  --color-ink: oklch(20% 0.012 80); --color-ink-2: oklch(28% 0.012 80); --color-muted: oklch(46% 0.012 80);
  --color-rule: oklch(84% 0.010 80);
  --color-accent: oklch(58% 0.16 250); --color-accent-ink: oklch(98% 0.005 250); --color-focus: oklch(58% 0.20 250);
  --font-display: "FILL ME", ui-serif, serif; --font-body: "FILL ME", ui-sans-serif, system-ui, sans-serif; --font-outlier: var(--font-body);
  --radius-card: 4px; --radius-pill: 999px; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.02em;`;

const BASE = `html, body { overflow-x: clip; }
html { scrollbar-color: var(--color-muted) var(--color-paper); }
body { margin: 0; background: var(--color-paper); color: var(--color-ink); font-family: var(--font-body); font-size: var(--text-md); line-height: 1.55; -webkit-font-smoothing: antialiased; caret-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); color: var(--color-ink); }
:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
a { color: inherit; text-decoration-thickness: 1px; text-underline-offset: 0.16em; }
h1, h2, h3 { margin: 0; font-family: var(--font-display); letter-spacing: var(--tracking-display); line-height: 1.05; overflow-wrap: break-word; min-width: 0; text-wrap: balance; }
h1 { max-width: 20ch; } h2 { max-width: 30ch; } h3 { max-width: 40ch; }
p { margin: 0; text-wrap: pretty; max-width: 65ch; }
img, svg, video { max-width: 100%; height: auto; display: block; }
button, input, select, textarea { font: inherit; }
.container { width: 100%; max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter); box-sizing: border-box; }
.num, .figure, td.num { font-variant-numeric: tabular-nums; }
[data-slot] { position: relative; overflow: hidden; }
[data-slot] > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
[data-slot]:has(> img) > :not(img) { display: none !important; }
@media (max-width: 60rem) { :root { --gutter: 24px; --section-gap: 96px; } }
@media (max-width: 40rem) { :root { --gutter: 16px; --section-gap: 72px; --gap-columns: 16px; } }
@media (prefers-reduced-motion: reduce) { *:not(.keep-motion), *:not(.keep-motion)::before, *:not(.keep-motion)::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }`;

const SLOTS_JS = `window.hallmarkSlots = (m) => { for (const [k, v] of Object.entries(m)) { const s = document.querySelector(\`[data-slot="\${k}"]\`); if (!s) continue; const im = new Image(); im.src = typeof v === 'string' ? v : v.src; im.alt = (typeof v === 'object' && v.alt) || s.dataset.alt || ''; s.prepend(im); } };`;

function scaffold() {
  const custom = has('custom');
  const slug = custom ? null : args.slice(1).find((a) => !a.startsWith('--'));
  if (!custom && !slug) { usage(); process.exit(2); }
  const dir = resolve(flag('dir', '.'));
  let name = 'custom world';
  let tokens = CUSTOM_TOKENS;
  let header = null;
  if (!custom) {
    const file = join(THEMES, `${slug}.md`);
    if (!existsSync(file)) { console.error(`no theme at ${file}; run \`theme.mjs list\` for the slugs`); process.exit(1); }
    const src = readFileSync(file, 'utf8');
    header = parseHeader(src, file);
    name = header.name;
    tokens = tokenBlockOf(src, file);
  }
  const out = join(dir, 'tokens.css');
  if (existsSync(out) && !has('force')) { console.error(`${out} exists; pass --force to overwrite it`); process.exit(1); }
  mkdirSync(dir, { recursive: true });
  const scale = header && header.paper.band === 'dark' ? SCALE.replace('--color-error: oklch(52% 0.19 27); --color-success: oklch(50% 0.12 150);', '--color-error: oklch(72% 0.15 27); --color-success: oklch(76% 0.13 150);') : SCALE;
  const css = `:root {\n${scale}\n${tokens}\n}\n`;
  writeFileSync(out, css);
  const stamp = custom
    ? `/* Hallmark · shape: <shape> · genre: <genre> · custom: draw n/7 (seed <slug>·<date>·r0)\n * hero: <posture> · nav: <shape> · footer: <shape> · enrichment: <none or the file> · signature: <the one move>\n * axes: <paper>/<display>/<accent> · posture: <posture> · contrast: pass · fold: pass · v${VERSION} */`
    : `/* Hallmark · shape: <shape> · genre: ${header.genre} · theme: ${name} (${flag('dealt', '') ? `deal ${flag('dealt', '')}` : 'by request'})\n * hero: <posture> · nav: <shape> · footer: <shape> · enrichment: <none or the file> · signature: <the one move>\n * axes: ${triple(header)} · posture: ${header.posture} · contrast: pass · fold: pass · v${VERSION} */`;
  console.log(`wrote ${out} (${custom ? 'the shared scale; fill every --color-* and --font-* from direction.md § B and § C before building' : `${name} tokens plus the shared scale`})`);
  if (!custom) {
    const pic = join(THEMES, `${slug}.jpg`);
    if (existsSync(pic)) console.log(`look at ${pic}: the material at full size${header.pictured ? `, from a page built as ${header.pictured}` : ''}. Take its scale, density and objects; build a different hero and a different section order.`);
  }
  console.log('');
  console.log('paste under the stamp, before any rule of your own:');
  console.log('');
  console.log(stamp);
  console.log('/* Hallmark · pre-emit critique: P_ H_ E_ S_ R_ V_ · weakest: _, <what you did about it> */');
  console.log('@import url("./tokens.css");');
  console.log(BASE);
  console.log('');
  console.log('and, only if the page has data-slot containers, once before </body>:');
  console.log('');
  console.log(`<script>${SLOTS_JS}</script>`);
}

function validate(files) {
  let bad = 0;
  for (const f of files) {
    try {
      const src = readFileSync(f, 'utf8');
      const e = parseHeader(src, f);
      const problems = [];
      if (!PAPER_BANDS.has(e.paper.band)) problems.push(`paper band ${e.paper.band}`);
      if (!DISPLAY_CLASSES.has(e.display.class)) problems.push(`display class ${e.display.class}`);
      if (!ACCENT_BAND.test(e.accent.band)) problems.push(`accent band ${e.accent.band}`);
      if (!['editorial', 'modern-minimal', 'atmospheric', 'playful'].includes(e.genre)) problems.push(`genre ${e.genre}`);
      if (!['restrained', 'committed', 'full-palette', 'drenched'].includes(e.posture)) problems.push(`posture ${e.posture}`);
      if (e.keywords.length < 8) problems.push(`only ${e.keywords.length} keywords`);
      if (/[\u2014\u2013]/.test(src)) problems.push('contains an em or en dash');
      if (src.length > 7000) problems.push(`${src.length} bytes, over 7 KB`);
      if (!/^## Tokens/m.test(src) || !/^## Do-nots/m.test(src) || !/^## Build hint/m.test(src)) problems.push('missing a required section');
      if (/--tracking-label/.test(src)) problems.push('declares --tracking-label (labels are untracked, gate 67)');
      if (/font-variant(-caps)?:\s*[a-z-]*small-caps|small caps|small capitals|small-caps/i.test(src)) problems.push('prescribes small caps (gate 67)');
      if (/eyebrow|kicker|overline/i.test(src)) problems.push('names an eyebrow (gate 54)');
      if (/→|Learn more/.test(src)) problems.push('arrow or Learn-more copy (gate 63)');
      for (const m of src.matchAll(/^[^\n]*text-transform:\s*uppercase[^\n]*$/gm)) {
        const line = m[0];
        const ls = /letter-spacing:\s*(-?[\d.]+)em/.exec(line);
        const isDisplay = /\.display|h1|h2|\.marquee|wordmark/.test(line);
        if (ls && parseFloat(ls[1]) > 0.045) problems.push(`uppercase tracked ${ls[1]}em in the build hint (gate 67)`);
        else if (!isDisplay && /label|caption|meta|\bth\b|small|tag|chip|badge|nav|count/.test(line)) problems.push(`uppercase label rule in the build hint: ${line.trim().slice(0, 60)} (gate 67)`);
      }
      const fence = tokenBlockOf(src, f);
      if (/\/\*/.test(fence)) problems.push('comment inside the token block');
      if (!existsSync(f.replace(/\.md$/, '.jpg'))) console.log(`${f}: note, no picture yet (scripts/picture.mjs)`);
      if (!/waive 22/.test(src)) for (const m of fence.matchAll(/(--color-(?:paper|paper-2|paper-3|ink|ink-2|muted|rule|rule-2)):\s*oklch\(\s*[\d.]+%\s+([\d.]+)/g)) if (Number(m[2]) < 0.005) problems.push(`${m[1]} chroma ${m[2]} is under the 0.005 floor (gate 22), or the file names waive 22`);
      for (const k of ['--color-paper', '--color-ink', '--color-muted', '--color-rule', '--color-accent', '--color-accent-ink', '--color-focus', '--font-display', '--font-body', '--radius-card', '--tracking-display']) if (!fence.includes(k + ':')) problems.push(`token block lacks ${k}`);
      if (problems.length) { bad++; console.log(`${f}: ${problems.join('; ')}`); } else console.log(`${f}: ok (${e.name}, ${triple(e)}, ${src.length} bytes)`);
    } catch (err) { bad++; console.log(`${f}: ${err.message}`); }
  }
  process.exitCode = bad ? 1 : 0;
}

try {
  if (cmd === 'deal') deal();
  else if (cmd === 'check') check();
  else if (cmd === 'scaffold') scaffold();
  else if (cmd === 'index') { const e = buildIndex(); console.log(`indexed ${e.length} themes into ${INDEX}`); }
  else if (cmd === 'list') list();
  else if (cmd === 'validate') {
    const files = args.slice(1).filter((a) => !a.startsWith('--') && basename(a) !== 'README.md');
    if (!files.length) { usage(); process.exit(2); }
    validate(files);
  }
  else { usage(); process.exit(2); }
} catch (e) {
  console.error(String(e.message || e)); process.exit(1);
}
