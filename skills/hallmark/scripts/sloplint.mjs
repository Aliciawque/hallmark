#!/usr/bin/env node
/* sloplint: Hallmark's mechanical gate checker. Zero dependencies, Node 18+. Gate ids and tiers: references/gates.md. */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, dirname, basename, resolve } from 'node:path';

const GENRES = ['editorial', 'modern-minimal', 'atmospheric', 'playful'];
const args = process.argv.slice(2);
const opts = { genre: null, scope: 'page', json: false, render: false, tier: null, paths: [] };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--genre') { opts.genre = args[++i]; }
  else if (a === '--scope') { opts.scope = args[++i]; }
  else if (a === '--json') { opts.json = true; }
  else if (a === '--render') { opts.render = true; }
  else if (a === '--tier') { opts.tier = args[++i]; }
  else if (a === '--help' || a === '-h') { usage(); process.exit(0); }
  else if (a.startsWith('--')) { console.error(`unknown flag ${a}`); usage(); process.exit(2); }
  else opts.paths.push(a);
}
function usage() {
  console.error('usage: node sloplint.mjs <file-or-dir ...> [--genre editorial|modern-minimal|atmospheric|playful] [--scope page|component] [--json] [--render] [--tier floor]');
}
if (!opts.paths.length) { usage(); process.exit(2); }
if (opts.genre && !GENRES.includes(opts.genre)) {
  console.error(`--genre must be one of: ${GENRES.join(', ')}`); process.exit(2);
}
if (!['page', 'component'].includes(opts.scope)) {
  console.error('--scope must be page or component'); process.exit(2);
}

function collectFiles(paths) {
  const files = [];
  const seen = new Set();
  const visit = (p) => {
    const abs = resolve(p);
    if (seen.has(abs)) return;
    let st;
    try { st = statSync(abs); } catch { console.error(`sloplint: cannot read ${p}`); return; }
    if (st.isDirectory()) {
      const base = basename(abs);
      if (base === 'node_modules' || base.startsWith('.')) return;
      for (const e of readdirSync(abs)) visit(join(abs, e));
    } else {
      const ext = extname(abs).toLowerCase();
      if (ext === '.html' || ext === '.css') { seen.add(abs); files.push(abs); }
    }
  };
  for (const p of paths) visit(p);
  return files;
}

function stripComments(src) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    if (src[i] === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      const stop = end === -1 ? src.length : end + 2;
      out += src.slice(i, stop).replace(/[^\n]/g, ' ');
      i = stop;
    } else if (src[i] === '"' || src[i] === "'") {
      const q = src[i]; let j = i + 1;
      while (j < src.length && src[j] !== q) { if (src[j] === '\\') j++; j++; }
      out += src.slice(i, Math.min(j + 1, src.length)); i = j + 1;
    } else { out += src[i]; i++; }
  }
  return out;
}

function parseCss(source, file, lineOffset = 0) {
  const src = stripComments(source);
  const nl = [];
  for (let i = 0; i < src.length; i++) if (src[i] === '\n') nl.push(i);
  const lineOf = (pos) => {
    let lo = 0, hi = nl.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (nl[mid] < pos) lo = mid + 1; else hi = mid; }
    return lo + 1 + lineOffset;
  };
  const rules = [];
  const makeRule = (selector, s, e, media, keyframes) => {
    const body = src.slice(s, e);
    const decls = [];
    let off = 0;
    for (const part of body.split(';')) {
      const idx = part.indexOf(':');
      if (idx > 0) {
        const prop = part.slice(0, idx).trim().toLowerCase();
        const value = part.slice(idx + 1).trim().replace(/!important\s*$/i, '').trim();
        if (prop && value && /^-{0,2}[a-z]/.test(prop) && !/[{}]/.test(prop)) {
          decls.push({ prop, value, line: lineOf(s + off + idx) });
        }
      }
      off += part.length + 1;
    }
    return { selector, decls, media: media || null, keyframes: keyframes || null, file, line: lineOf(s) };
  };
  const walk = (start, end, media, keyframes) => {
    let i = start;
    while (i < end) {
      while (i < end && /[\s;]/.test(src[i])) i++;
      if (i >= end) break;
      let j = i;
      while (j < end && src[j] !== '{' && src[j] !== '}' && src[j] !== ';') j++;
      if (j >= end) break;
      if (src[j] === '}' || src[j] === ';') { i = j + 1; continue; }
      const selector = src.slice(i, j).trim().replace(/\s+/g, ' ');
      const blockStart = j + 1;
      let depth = 1, k = blockStart;
      while (k < end && depth > 0) {
        if (src[k] === '{') depth++;
        else if (src[k] === '}') depth--;
        k++;
      }
      const blockEnd = Math.max(blockStart, k - 1);
      if (selector.startsWith('@')) {
        if (/^@(media|supports|layer|container|scope)/i.test(selector)) {
          const q = /^@media/i.test(selector) ? selector.replace(/^@media/i, '').trim() : media;
          walk(blockStart, blockEnd, q, keyframes);
        } else if (/^@(-webkit-)?keyframes/i.test(selector)) {
          const name = selector.replace(/^@(-webkit-)?keyframes/i, '').trim();
          walk(blockStart, blockEnd, media, name || 'anon');
        } else if (/^@font-face/i.test(selector)) {
          rules.push(makeRule('@font-face', blockStart, blockEnd, media, null));
        }
      } else {
        rules.push(makeRule(selector, blockStart, blockEnd, media, keyframes));
      }
      i = k;
    }
  };
  walk(0, src.length, null, null);
  return rules;
}

const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function parseHtml(file, src) {
  const nl = [];
  for (let i = 0; i < src.length; i++) if (src[i] === '\n') nl.push(i);
  const lineOf = (pos) => {
    let lo = 0, hi = nl.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (nl[mid] < pos) lo = mid + 1; else hi = mid; }
    return lo + 1;
  };
  const styles = [];
  const styleRe = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = styleRe.exec(src))) {
    styles.push({ css: m[1], lineOffset: lineOf(m.index) - 1 });
  }
  let scripts = '';
  const scriptRe = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  while ((m = scriptRe.exec(src))) scripts += m[1] + '\n';

  const pad = (t) => t.replace(/[^\n]/g, ' ');
  const masked = src
    .replace(/<!--[\s\S]*?-->/g, pad)
    .replace(/(<(script|style)\b[^>]*>)([\s\S]*?)(<\/\2\s*>)/gi, (m0, open, tag, body, close) => open + pad(body) + close);
  const tags = [];
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
  while ((m = tagRe.exec(masked))) {
    tags.push({
      close: m[1] === '/', name: m[2].toLowerCase(), attrs: m[3] || '',
      pos: m.index, end: m.index + m[0].length,
      selfClosing: /\/\s*$/.test(m[3] || '') || VOID_TAGS.has(m[2].toLowerCase()),
      line: lineOf(m.index),
    });
  }
  const noScript = src.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  const text = noScript.replace(/<[^>]*>/g, ' ')
    .replace(/&quot;|&#0?34;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&hellip;|&#8230;/g, '\u2026').replace(/&mdash;|&#8212;/g, '\u2014')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/[ \t]+/g, ' ');
  return { file, src, masked, styles, scripts, tags, text, lineOf };
}

function getAttr(attrStr, name) {
  const re = new RegExp(`(?:^|\\s)${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>/]+))`, 'i');
  const m = re.exec(attrStr);
  if (!m) return null;
  return m[2] ?? m[3] ?? m[4] ?? '';
}
function hasAttr(attrStr, name) {
  return new RegExp(`(?:^|\\s)${name}(?=[\\s=/]|$)`, 'i').test(attrStr);
}

function directChildren(doc, idx) {
  const open = doc.tags[idx];
  if (open.close || open.selfClosing) return [];
  const children = [];
  let depth = 1;
  let childStart = -1, childOpen = null, childIdx = -1;
  for (let i = idx + 1; i < doc.tags.length; i++) {
    const t = doc.tags[i];
    if (t.close) {
      depth--;
      if (depth === 0) break;
      if (depth === 1 && childOpen) {
        children.push({ name: childOpen.name, open: doc.src.slice(childOpen.pos, childOpen.end), html: doc.src.slice(childStart, t.end), idx: childIdx });
        childOpen = null;
      }
      continue;
    }
    if (depth === 1) {
      if (t.selfClosing) {
        children.push({ name: t.name, open: doc.src.slice(t.pos, t.end), html: doc.src.slice(t.pos, t.end), idx: i });
      } else {
        childStart = t.pos; childOpen = t; childIdx = i;
      }
    }
    if (!t.selfClosing) depth++;
  }
  return children;
}

function ancestorMap(doc) {
  if (doc._anc) return doc._anc;
  const map = new Map();
  const stack = [];
  for (let i = 0; i < doc.tags.length; i++) {
    const t = doc.tags[i];
    if (t.close) { stack.pop(); continue; }
    map.set(i, stack.slice());
    if (!t.selfClosing) stack.push(t.name);
  }
  doc._anc = map;
  return map;
}

function plainText(html) {
  return html.replace(/<[^>]*>/g, ' ')
    .replace(/&middot;|&#0?183;/g, '·').replace(/&mdash;|&#8212;/g, '\u2014').replace(/&ndash;|&#8211;/g, '\u2013')
    .replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#\d+;|&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}

function innerOf(doc, idx) {
  const open = doc.tags[idx];
  if (open.close || open.selfClosing) return null;
  let depth = 1;
  for (let i = idx + 1; i < doc.tags.length; i++) {
    const t = doc.tags[i];
    if (t.selfClosing) continue;
    if (t.close) { depth--; if (depth === 0) return { inner: doc.src.slice(open.end, t.pos), endPos: t.pos }; }
    else depth++;
  }
  return { inner: doc.src.slice(open.end), endPos: doc.src.length };
}

function parseNum(s) { const v = parseFloat(s); return Number.isNaN(v) ? null : v; }

function parseColor(raw) {
  if (!raw) return null;
  const v = raw.trim().toLowerCase();
  if (v === 'white') return { r: 1, g: 1, b: 1, alpha: 1 };
  if (v === 'black') return { r: 0, g: 0, b: 0, alpha: 1 };
  if (v === 'transparent') return { r: 0, g: 0, b: 0, alpha: 0 };
  let m;
  if ((m = /^#([0-9a-f]{3,8})$/.exec(v))) {
    const h = m[1];
    if (h.length === 3 || h.length === 4) {
      const r = parseInt(h[0] + h[0], 16) / 255, g = parseInt(h[1] + h[1], 16) / 255, b = parseInt(h[2] + h[2], 16) / 255;
      const a = h.length === 4 ? parseInt(h[3] + h[3], 16) / 255 : 1;
      return { r, g, b, alpha: a };
    }
    if (h.length === 6 || h.length === 8) {
      const r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255;
      const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
      return { r, g, b, alpha: a };
    }
    return null;
  }
  if ((m = /^rgba?\(([^)]+)\)$/.exec(v))) {
    const parts = m[1].split('/');
    const nums = parts[0].split(/[\s,]+/).filter(Boolean);
    if (nums.length < 3) return null;
    const chan = (s) => s.endsWith('%') ? parseNum(s) / 100 : parseNum(s) / 255;
    let alpha = 1;
    if (parts[1] != null) alpha = parts[1].trim().endsWith('%') ? parseNum(parts[1]) / 100 : parseNum(parts[1]);
    else if (nums.length === 4) alpha = nums[3].endsWith('%') ? parseNum(nums[3]) / 100 : parseNum(nums[3]);
    const [r, g, b] = nums.slice(0, 3).map(chan);
    if ([r, g, b].some((x) => x == null)) return null;
    return { r, g, b, alpha: alpha ?? 1 };
  }
  if ((m = /^hsla?\(([^)]+)\)$/.exec(v))) {
    const parts = m[1].split('/');
    const nums = parts[0].split(/[\s,]+/).filter(Boolean);
    if (nums.length < 3) return null;
    const h = parseNum(nums[0]);
    const s = parseNum(nums[1]) / 100, l = parseNum(nums[2]) / 100;
    let alpha = 1;
    if (parts[1] != null) alpha = parts[1].trim().endsWith('%') ? parseNum(parts[1]) / 100 : parseNum(parts[1]);
    else if (nums.length === 4) alpha = nums[3].endsWith('%') ? parseNum(nums[3]) / 100 : parseNum(nums[3]);
    if ([h, s, l].some((x) => x == null)) return null;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hp = ((h % 360) + 360) % 360 / 60;
    const x = c * (1 - Math.abs((hp % 2) - 1));
    let rgb = [0, 0, 0];
    if (hp < 1) rgb = [c, x, 0]; else if (hp < 2) rgb = [x, c, 0];
    else if (hp < 3) rgb = [0, c, x]; else if (hp < 4) rgb = [0, x, c];
    else if (hp < 5) rgb = [x, 0, c]; else rgb = [c, 0, x];
    const mAdd = l - c / 2;
    return { r: rgb[0] + mAdd, g: rgb[1] + mAdd, b: rgb[2] + mAdd, alpha: alpha ?? 1 };
  }
  if ((m = /^oklch\(([^)]+)\)$/.exec(v))) {
    const parts = m[1].split('/');
    const nums = parts[0].split(/\s+/).filter(Boolean);
    if (nums.length < 3) return null;
    let L = parseNum(nums[0]);
    if (nums[0].endsWith('%')) L = L / 100;
    const C = parseNum(nums[1]);
    let H = nums[2] === 'none' ? 0 : parseNum(nums[2]);
    let alpha = 1;
    if (parts[1] != null) alpha = parts[1].trim().endsWith('%') ? parseNum(parts[1]) / 100 : parseNum(parts[1]);
    if (L == null || C == null || H == null) return null;
    const rgb = oklchToSrgb(L, C, H);
    return { ...rgb, alpha: alpha ?? 1, okl: { L, C, H } };
  }
  return null;
}

function oklchToSrgb(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr), b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, mm = m_ ** 3, s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * mm + 1.7076147010 * s,
  ].map((c) => Math.min(1, Math.max(0, c)));
  const enc = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
  return { r: enc(lin[0]), g: enc(lin[1]), b: enc(lin[2]) };
}

function srgbToOklch(col) {
  const dec = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const r = dec(col.r), g = dec(col.g), b = dec(col.b);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const b2 = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  const C = Math.sqrt(a * a + b2 * b2);
  let H = (Math.atan2(b2, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}

function luminance(col) {
  const dec = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * dec(col.r) + 0.7152 * dec(col.g) + 0.0722 * dec(col.b);
}
function contrastRatio(a, b) {
  const la = luminance(a), lb = luminance(b);
  const hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

function isTokenRule(rule) {
  return /:root|\[data-theme/i.test(rule.selector)
    || basename(rule.file).toLowerCase() === 'tokens.css'
    || rule.selector === '@font-face';
}

function buildTokens(rules) {
  const tokens = {};
  for (const r of rules) {
    if (!isTokenRule(r)) continue;
    for (const d of r.decls) if (d.prop.startsWith('--')) tokens[d.prop] = d.value;
  }
  return tokens;
}

function resolveVars(value, tokens, local = null, depth = 0) {
  if (!value || depth > 5 || !value.includes('var(')) return value;
  const out = value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*(?:\([^()]*\)[^()]*)*))?\)/g, (m0, name, fb) => {
    const v = (local && local[name] != null) ? local[name] : tokens[name];
    if (v != null) return v;
    if (fb != null) return fb.trim();
    return m0;
  });
  if (out === value) return out;
  return resolveVars(out, tokens, local, depth + 1);
}

function firstFamily(value) {
  const first = value.split(',')[0].trim().replace(/^['"]|['"]$/g, '').toLowerCase();
  return first;
}

function pxOf(value) {
  const m = /^(-?\d+(?:\.\d+)?)(px|rem|em)$/.exec(value.trim());
  if (!m) return null;
  const n = parseFloat(m[1]);
  return m[2] === 'px' ? n : n * 16;
}

const rel = (f) => f.startsWith(process.cwd()) ? f.slice(process.cwd().length + 1) : f;
const trunc = (s, n = 72) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

const PAGE_ONLY = new Set(['3', '4', '17', '18', '19', '20', '25', '28', '28a', '28b', '33', '34', '42', '46', '46a', '46b', '47', '47a', '47b', '47c', '49', '49a', '49b', '50', '53', '54', '55', '55a', '55b', '56', '58', '62', '63', '65', '66', 'F7', 'F8', 'F15', 'F16']);
const gateNumber = (id) => (/^(\d{1,2})/.exec(String(id)) || [])[1] || null;
const pageOnly = (id) => PAGE_ONLY.has(String(id)) || PAGE_ONLY.has(gateNumber(id));

const TIERS = new Map(Object.entries({
  '2': 'floor', '4': 'floor', '10': 'floor', '15': 'floor', '17': 'floor', '18': 'floor', '19': 'floor',
  '20': 'floor', '26': 'floor', '27': 'floor', '28': 'floor', '30': 'floor', '33': 'floor', '34': 'floor',
  '39': 'floor', '40': 'floor', '41': 'floor', '46': 'floor', '48': 'floor', '49': 'floor', '50': 'floor',
  '53': 'floor', '54': 'floor', '56': 'floor', '58': 'floor', '62': 'floor', '63': 'floor', '67': 'floor',
  '1': 'reflex', '3': 'reflex', '6': 'reflex', '7': 'reflex', '8': 'reflex', '9': 'reflex', '11': 'reflex',
  '12': 'reflex', '16': 'reflex', '22': 'reflex', '23': 'reflex', '24': 'reflex', '25': 'reflex', '29': 'reflex',
  '37': 'reflex', '38': 'reflex', '42': 'reflex', '44': 'reflex', '47': 'reflex', '55': 'reflex', '59': 'reflex',
  '64': 'reflex', '65': 'reflex', '66': 'reflex',
  '32': 'ledger',
  '2a': 'floor', '2b': 'reflex', '6a': 'floor', '6b': 'reflex', '7a': 'floor', '7b': 'reflex',
  '10a': 'floor', '10b': 'reflex', '24a': 'floor', '24b': 'reflex', '26a': 'floor', '26b': 'reflex',
  '28a': 'floor', '28b': 'reflex', '30a': 'floor', '30b': 'reflex', '38i': 'floor', '38ii': 'reflex', '38iii': 'reflex',
  '39a': 'floor', '39b': 'reflex', '44a': 'reflex', '44b': 'floor', '44c': 'reflex', '44d': 'floor',
  '46a': 'floor', '46b': 'reflex', '47a': 'floor', '47b': 'reflex', '47c': 'reflex', '49a': 'floor', '49b': 'reflex',
  '55a': 'floor', '55b': 'reflex',
}));

function baseGate(id) {
  const s = String(id).trim();
  if (/^F\d+$/i.test(s)) return s.toUpperCase();
  const m = /^(\d{1,2}(?:i{1,3}|[a-z])?)/.exec(s);
  return m ? m[1] : s;
}
function tierOf(gate) {
  const exact = TIERS.get(String(gate).trim());
  if (exact) return exact;
  const b = baseGate(gate);
  if (/^F\d+$/.test(b)) return 'finish';
  return TIERS.get(b) || 'floor';
}

function fontFamilyCount(ctx) {
  const fams = new Set();
  for (const [prop, val] of Object.entries(ctx.tokens || {})) {
    if (/^--font-/.test(prop)) fams.add(firstFamily(resolveVars(val, ctx.tokens)));
  }
  return fams.size;
}
const GUARDS = {
  '1': (ctx) => fontFamilyCount(ctx) >= 2 || 'fewer than two font families are declared',
  '2b': (ctx) => {
    for (const { r, grad } of gradientTextRules(ctx)) {
      if (!grad) return `${r.selector} clips text to a background that is not a gradient ramp`;
      if (/#[0-9a-f]{3,8}\b|oklch\(|rgba?\(|hsla?\(/i.test(grad.value)) return `${r.selector}: the ramp stops are literals, not tokens`;
      const hues = gradientHues(grad.value, ctx);
      if (hues.length >= 2 && Math.max(...hues) - Math.min(...hues) > 40) return `${r.selector}: ramp spans ${Math.round(Math.max(...hues) - Math.min(...hues))} degrees of hue`;
    }
    return true;
  },
  '7': (ctx) => /surface:\s*absolute/i.test(ctx.stampText) || 'the stamp does not declare surface: absolute',
  '23': (ctx) => /posture:\s*(restrained|committed|full-palette|drenched)/i.test(ctx.stampText)
    || 'the stamp declares no colour posture',
  '37': (ctx) => fontFamilyCount(ctx) <= 4 || 'five or more families is past the backstop',
  '26b': (ctx) => !ctx.docs.some((d) => d.tags.some((t) => !t.close && /aria-disabled/i.test(t.attrs))) || 'aria-disabled appears in the markup',
  '38': () => 'name the clause: 38ii (italic display) or 38iii (accented word)',
  '38ii': (ctx) => /font-synthesis\s*:\s*none/i.test(ctx.allCss) || 'font-synthesis: none is not declared',
  '38iii': (ctx) => accentedWordInHero(ctx),
  '42': (ctx) => (/(^|[·*])\s*nav:\s*\S/im.test(ctx.stampText) && /(^|[·*])\s*footer:\s*\S/im.test(ctx.stampText)) || 'the stamp has no nav: and footer: fields naming the chrome',
  '64': (ctx) => monoIsMaterial(ctx) || 'neither --font-display nor --font-body is a monospace face',
  '65': (ctx) => /by request|pinned|user named/i.test(ctx.stampText) || 'the stamp does not say the theme was asked for by name',
  '44': (ctx) => /(^|[·*])\s*hero:\s*\S/im.test(ctx.stampText) || 'the stamp names no hero: posture',
};

const WAIVER_MAX = 3;

const WAIVER_FILLER = /\b(a|an|the|is|it|this|that|was|are|and|but|so|very|just|really|here|quite|more|most)\b/gi;
const WAIVER_BOILERPLATE_PHRASES = [
  'design choice', 'design decision', 'intentionally', 'intentional', 'by design',
  'looks better', 'for the aesthetic', 'aesthetic', 'necessary here', 'necessary',
  'the brief requires it', 'brief requires', 'on purpose', 'deliberate', 'deliberately',
  'it works', 'works better', 'needed', 'required', 'fine', 'ok', 'okay',
];
function reasonIsBoilerplate(reason) {
  let r = reason.toLowerCase();
  for (const p of WAIVER_BOILERPLATE_PHRASES) r = r.split(p).join(' ');
  r = r.replace(WAIVER_FILLER, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
  return r.length < 12;
}

let WAIVED = new Set();
let ANSWERED = new Set();

const findings = [];
function report(gate, grade, file, line, evidence, fix) {
  const g = String(gate);
  if (opts.scope === 'component' && pageOnly(g)) return;
  const tier = tierOf(g);
  const b = baseGate(g);
  const waived = WAIVED.has(b) || WAIVED.has(gateNumber(b));
  if (grade === 'FAIL') {
    if (tier === 'ledger') grade = 'NOTE';
    else if (tier === 'reflex') grade = waived ? 'WAIVED' : 'REFLEX';
  }
  if (tier === 'finish' && ANSWERED.has(b)) grade = 'ANSWERED';
  findings.push({ gate: g, grade, tier, file: rel(file), line: line || 1, evidence: trunc(String(evidence)), fix });
}

function applyWaivers(ctx, dir) {
  WAIVED = new Set(); ANSWERED = new Set();
  const re = /\/\*\s*Hallmark\s*·\s*waive\s+(\d{1,2}[a-z]{0,3}|F\d+)\s*·\s*([^·*]+?)\s*·\s*([^*]+?)\s*\*\//gi;
  const claims = [...ctx.stampText.matchAll(re)].map((m) => ({
    id: m[1], evidence: m[2].trim(), reason: m[3].trim(), raw: m[0],
  }));

  const wellFormed = new Set(claims.map((c) => c.raw));
  const malformed = [...ctx.stampText.matchAll(/\/\*[^*]*Hallmark[^*]*·\s*waive\b[^*]*\*\//gi)]
    .map((m) => m[0]).filter((raw) => !wellFormed.has(raw));
  if (!claims.length && !malformed.length) return;
  const reasons = new Map();
  for (const c of claims) {
    const key = c.reason.toLowerCase();
    reasons.set(key, (reasons.get(key) || 0) + 1);
  }

  const pageWords = new Set(
    (ctx.stampText + ' ' + ctx.docs.map((d) => d.text).join(' '))
      .toLowerCase().match(/[a-z]{4,}/g) || []
  );
  const file = ctx.cssFiles[0]?.file || ctx.docs[0]?.file || dir;
  const rejectAt = (c, why) =>
    findings.push({
      gate: baseGate(c.id), grade: 'WAIVER', tier: tierOf(c.id), file: rel(file), line: 1,
      evidence: trunc(`waiver on ${c.id} REJECTED (${why})`),
      fix: 'Fix the gate, or satisfy the guard and say why in the page\'s own words',
    });

  for (const raw of malformed) {
    findings.push({
      gate: 'waive', grade: 'WAIVER', tier: 'reflex', file: rel(file), line: 1,
      evidence: trunc(`malformed waiver, ignored: ${raw.replace(/\s+/g, ' ')}`),
      fix: 'Three · -separated fields: /* Hallmark · waive <gate> · <guard evidence> · <reason> */',
    });
  }
  for (const c of claims) {
    const b = baseGate(c.id);
    const tier = tierOf(c.id);
    if (tier !== 'reflex') {
      rejectAt(c, tier === 'ledger' ? 'a Ledger note is bookkeeping, nothing to waive'
        : tier === 'finish' ? 'Finish findings are answered, not waived'
        : 'Floor is never waivable');
      continue;
    }
    if (WAIVED.has(b)) { rejectAt(c, 'one waiver per gate'); continue; }
    if (c.reason.length < 24) { rejectAt(c, 'reason under 24 characters'); continue; }
    if (reasonIsBoilerplate(c.reason)) { rejectAt(c, 'boilerplate reason'); continue; }
    if (reasons.get(c.reason.toLowerCase()) > 1) { rejectAt(c, 'reason reused on another waiver'); continue; }
    const words = c.reason.toLowerCase().match(/[a-z]{4,}/g) || [];
    if (!words.some((w) => pageWords.has(w))) { rejectAt(c, 'reason shares no word with the page'); continue; }
    const guard = GUARDS[b] || GUARDS[gateNumber(b)];
    const verdict = guard ? guard(ctx) : true;
    if (verdict !== true) { rejectAt(c, `guard: ${verdict}`); continue; }
    WAIVED.add(b);
  }

  if (WAIVED.size > WAIVER_MAX) {
    findings.push({
      gate: 'waive', grade: 'NOTE', tier: 'ledger', file: rel(file), line: 1,
      evidence: trunc(`${WAIVED.size} reflex gates waived (${[...WAIVED].join(', ')}): that is a house style, not a set of exceptions`),
      fix: 'Lock it into a design.md so later pages inherit it instead of re-arguing it',
    });
  }

  const ansRe = /\/\*\s*Hallmark\s*·\s*answered\s+(\d{1,2}[a-z]{0,3}|F\d+)\s*·\s*([^*]+?)\s*\*\//gi;
  for (const m of ctx.stampText.matchAll(ansRe)) {
    const id = baseGate(m[1]);
    const reason = m[2].trim();
    const bad = tierOf(id) !== 'finish' ? 'only Finish findings are answered; Reflex is waived and Floor is fixed'
      : reason.length < 24 ? 'reason under 24 characters'
      : reasonIsBoilerplate(reason) ? 'boilerplate reason' : null;
    if (bad) {
      findings.push({
        gate: id, grade: 'WAIVER', tier: tierOf(id), file: rel(file), line: 1,
        evidence: trunc(`answer on ${m[1]} REJECTED (${bad})`),
        fix: 'Two · -separated fields: /* Hallmark · answered <check> · <reason> */',
      });
      continue;
    }
    ANSWERED.add(id);
  }
}

const GRADE_RANK = { FAIL: 0, REFLEX: 1, WAIVER: 2, WARN: 3, WAIVED: 4, ANSWERED: 5, NOTE: 6 };

function gateSortKey(g) {
  const f = /^F(\d+)$/.exec(g);
  if (f) return 900 + Number(f[1]);
  const n = parseFloat(g);
  return Number.isNaN(n) ? 999 : n;
}

function selectorIsInteractive(sel) {
  return /(^|[\s,>+~(])(a|button|input|select|textarea|summary)\b|\.(btn|button|cta|link|tab|chip|control)/i.test(sel);
}
const HEADING_SEL = /(^|[\s,>+~(])h[1-6]\b|__title|__display|__headline|hero__(title|display|headline|h\d)|wordmark|masthead|display/i;
const GENERIC_FAMILIES = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-monospace', 'ui-serif', 'ui-sans-serif', 'ui-rounded', 'math', 'emoji', 'fangsong', 'inherit', 'initial', 'unset']);

function mergedDeclsBySelector(ctx) {
  if (ctx._merged) return ctx._merged;
  const map = new Map();
  for (const r of ctx.rules) {
    if (r.keyframes || r.selector === '@font-face') continue;
    const key = r.selector + '@@' + (r.media || '');
    if (!map.has(key)) map.set(key, { selector: r.selector, media: r.media, decls: [], file: r.file, line: r.line });
    map.get(key).decls.push(...r.decls);
  }
  ctx._merged = [...map.values()];
  return ctx._merged;
}

function styleIndex(ctx) {
  if (ctx._styleIdx) return ctx._styleIdx;
  const entries = [];
  for (const r of ctx.rules) {
    if (r.keyframes || r.selector === '@font-face') continue;
    if (r.media && /max-width/i.test(r.media)) continue;
    for (const part of r.selector.split(',')) {
      const compound = part.trim().split(/[\s>+~]+/).filter(Boolean).pop();
      if (!compound) continue;
      const cleaned = compound.replace(/::?[a-z-]+(\([^)]*\))?/gi, '').replace(/\[[^\]]*\]/g, '');
      const classes = (cleaned.match(/\.[a-zA-Z_][\w-]*/g) || []).map((c) => c.slice(1));
      const tagM = /^([a-zA-Z][\w-]*)/.exec(cleaned);
      const tag = tagM ? tagM[1].toLowerCase() : null;
      if (!classes.length && !tag) continue;
      entries.push({ classes, tag, decls: r.decls });
    }
  }
  ctx._styleIdx = entries;
  return entries;
}

function styleFor(ctx, classAttr, tagName) {
  const have = new Set(String(classAttr || '').split(/\s+/).filter(Boolean));
  const decls = [];
  for (const e of styleIndex(ctx)) {
    if (e.tag && e.tag !== tagName) continue;
    if (!e.classes.every((c) => have.has(c))) continue;
    decls.push(...e.decls);
  }
  return decls;
}

function declValue(ctx, decls, prop) {
  let v = null;
  for (const d of decls) if (d.prop === prop) v = d.value;
  return v == null ? null : resolveVars(v, ctx.tokens);
}

function fontPxOf(ctx, decls) {
  const v = declValue(ctx, decls, 'font-size');
  if (!v) return null;
  const clamped = /clamp\(\s*([^,]+),/.exec(v);
  return pxOf(clamped ? clamped[1].trim() : v);
}

function trackingEmOf(ctx, decls, fontPx) {
  const v = declValue(ctx, decls, 'letter-spacing');
  if (!v) return null;
  const m = /^(-?\d*\.?\d+)em$/.exec(v.trim());
  if (m) return parseFloat(m[1]);
  const px = pxOf(v);
  if (px == null || !fontPx) return null;
  return px / fontPx;
}

function check1(ctx) {
  const banned = new Set(['inter', 'roboto', 'open sans', 'poppins', 'lato', 'system-ui', '-apple-system', 'arial', 'helvetica', 'helvetica neue', 'segoe ui']);
  const seen = new Set();
  const flag = (fam, file, line, where) => {
    if (banned.has(fam) && !seen.has(fam + where)) {
      seen.add(fam + where);
      report(1, 'FAIL', file, line, `display font "${fam}" (${where})`, 'Pick a display face from the typography catalog');
    }
  };
  for (const [prop, val] of Object.entries(ctx.tokens)) {
    if (/^--font-(display|heading|title|hero)/.test(prop)) {
      const tr = ctx.rules.find((r) => isTokenRule(r) && r.decls.some((d) => d.prop === prop));
      flag(firstFamily(resolveVars(val, ctx.tokens)), tr ? tr.file : ctx.rules[0]?.file || '?', tr ? tr.decls.find((d) => d.prop === prop)?.line : 1, prop);
    }
  }
  for (const r of ctx.rules) {
    if (isTokenRule(r) || !HEADING_SEL.test(r.selector)) continue;
    for (const d of r.decls) {
      if (d.prop === 'font-family') flag(firstFamily(resolveVars(d.value, ctx.tokens)), r.file, d.line, r.selector);
    }
  }
}

const hueIn = (h, lo, hi) => (lo <= hi ? h >= lo && h <= hi : h >= lo || h <= hi);
function gradientHues(value, ctx) {
  const resolved = resolveVars(value, ctx.tokens);
  const stops = [];
  const colRe = /#[0-9a-fA-F]{3,8}\b|oklch\([^)]*\)|rgba?\([^)]*\)|hsla?\([^)]*\)/g;
  let cm;
  while ((cm = colRe.exec(resolved))) {
    const c = parseColor(cm[0]);
    if (c && c.alpha > 0.05) {
      const ok = c.okl || srgbToOklch(c);
      if (ok.C > 0.04) stops.push(ok.H);
    }
  }
  return stops;
}
function paperIsDark(ctx) {
  const p = parseColor(resolveVars(ctx.tokens['--color-paper'] || '', ctx.tokens));
  return !!p && (p.okl || srgbToOklch(p)).L < 0.4;
}
function bannedGradient(stops, ctx) {
  const purple = stops.some((h) => hueIn(h, 265, 330));
  const blue = stops.some((h) => hueIn(h, 200, 264));
  const pink = stops.some((h) => hueIn(h, 331, 25));
  const cyan = stops.some((h) => hueIn(h, 170, 230));
  if (purple && blue) return 'purple-to-blue';
  if (purple && pink) return 'purple-to-pink';
  if (cyan && paperIsDark(ctx)) return 'cyan-on-dark';
  return null;
}
function gradientTextRules(ctx) {
  const out = [];
  for (const r of mergedDeclsBySelector(ctx)) {
    const clip = r.decls.find((d) => /background-clip/.test(d.prop) && /\btext\b/i.test(d.value));
    if (!clip) continue;
    const grad = r.decls.find((d) => /^background(-image)?$/.test(d.prop) && /gradient\(/i.test(d.value));
    const transparent = r.decls.find((d) => (d.prop === 'color' || d.prop === '-webkit-text-fill-color') && /transparent/i.test(d.value));
    if (grad || transparent) out.push({ r, clip, grad });
  }
  return out;
}
function check2(ctx) {
  const textRules = new Set();
  for (const { r, clip, grad } of gradientTextRules(ctx)) {
    textRules.add(r.selector);
    const banned = grad ? bannedGradient(gradientHues(grad.value, ctx), ctx) : null;
    if (banned) report('2a', 'FAIL', r.file, clip.line, `${banned} gradient text on ${r.selector}`, 'One anchor hue, solid ink');
    else report('2b', 'FAIL', r.file, clip.line, `gradient text on ${r.selector}`, 'Solid ink; weight or a display face. Guard: a single-hue ramp from two tokens with 40 and 41 passing');
  }
  for (const r of ctx.rules) {
    if (textRules.has(r.selector)) continue;
    for (const d of r.decls) {
      if (!/gradient\(/i.test(d.value)) continue;
      const banned = bannedGradient(gradientHues(d.value, ctx), ctx);
      if (banned) report('2a', 'FAIL', r.file, d.line, `${banned} gradient on ${r.selector}`, 'One anchor hue; drop the gradient');
    }
  }
}

function check3(ctx) {
  for (const r of ctx.rules) {
    for (const d of r.decls) {
      if (d.prop !== 'grid-template-columns') continue;
      const v = resolveVars(d.value, ctx.tokens).trim();
      if (/^repeat\(\s*3\s*,\s*(minmax\(\s*0(px)?\s*,\s*1fr\s*\)|1fr)\s*\)$/.test(v)
        || /^(1fr|minmax\(\s*0(px)?\s*,\s*1fr\s*\))(\s+(1fr|minmax\(\s*0(px)?\s*,\s*1fr\s*\))){2}$/.test(v)) {

        const classes = (r.selector.match(/\.[a-zA-Z][\w-]*/g) || []).map((c) => c.slice(1));
        let iconTiles = !ctx.docs.length && !classes.length;
        for (const doc of ctx.docs) {
          for (let i = 0; i < doc.tags.length; i++) {
            const t = doc.tags[i];
            if (t.close || t.selfClosing) continue;
            const cls = getAttr(t.attrs, 'class') || '';
            if (!classes.some((c) => cls.split(/\s+/).includes(c))) continue;
            const inner = innerOf(doc, i);
            if (inner && (/class\s*=\s*["'][^"']*icon/i.test(inner.inner) || /<svg\b/i.test(inner.inner)) && /<h[2-6]\b/i.test(inner.inner)) {
              iconTiles = true;
            }
          }
        }
        if (iconTiles) {
          report(3, 'WARN', r.file, d.line, `3 equal icon-tile columns on ${r.selector}`, 'Vary column widths or drop the icon tiles');
        }
      }
    }
  }
}

function check4(ctx) {

  const cardWord = /(^|-)card(--[\w-]+)?$/i;
  const containerish = /(grid|list|rail|row|wrap|deck|group|stack|container|section|scroller|track)/i;
  for (const doc of ctx.docs) {
    const stack = [];
    for (const t of doc.tags) {
      if (t.close) {
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i].name === t.name) { stack.splice(i); break; }
        }
        continue;
      }
      if (t.selfClosing) continue;
      const cls = getAttr(t.attrs, 'class') || '';
      const isCard = cls.split(/\s+/).some((c) => cardWord.test(c) && !containerish.test(c));
      if (isCard && stack.some((s) => s.isCard)) {
        report(4, 'FAIL', doc.file, t.line, `card nested in card: class="${trunc(cls, 40)}"`, 'Keep one containment layer');
      }
      stack.push({ name: t.name, isCard });
    }
  }
}

function check3Stripe(ctx) {
  for (const r of ctx.rules) {
    for (const d of r.decls) {
      if (!/^border-(left|right|inline-start|inline-end)$/.test(d.prop)) continue;
      const m = /(\d+(?:\.\d+)?)px/.exec(d.value);
      if (m && parseFloat(m[1]) >= 3 && !/transparent|none/i.test(d.value)) {
        report(3, 'WARN', r.file, d.line, `side stripe ${d.prop}: ${trunc(d.value, 32)} on ${r.selector}`, 'Hairline all round, none, or an accent square');
      }
    }
  }
}

function heroClasses(ctx) {
  const out = new Set();
  for (const doc of ctx.docs) {
    const h1 = doc.tags.findIndex((t) => !t.close && t.name === 'h1');
    if (h1 < 0) continue;
    for (let i = h1 - 1; i >= 0; i--) {
      const t = doc.tags[i];
      if (t.close || !/^(section|header)$/.test(t.name)) continue;
      for (const c of (getAttr(t.attrs, 'class') || '').split(/\s+/)) if (c) out.add(c);
      break;
    }
  }
  return out;
}
function check6a(ctx) {
  const heroCls = heroClasses(ctx);
  const isHero = (sel) => /hero/i.test(sel) || [...heroCls].some((c) => sel.includes('.' + c));
  const seen = new Set();
  for (const r of ctx.rules) {
    if (r.keyframes || isTokenRule(r) || !isHero(r.selector)) continue;
    for (const d of r.decls) {
      if (!/^(min-)?height$/.test(d.prop)) continue;
      const v = resolveVars(d.value, ctx.tokens);
      if (!/\d\s*vh\b/i.test(v) || seen.has(r.selector)) continue;
      seen.add(r.selector);
      report('6a', 'FAIL', r.file, d.line, `hero sized in vh: ${d.prop}: ${trunc(v, 24)} on ${r.selector}`, 'dvh or svh');
    }
  }
}

function check7(ctx) {
  const props = /^(color|background|background-color|border-color|outline-color)$|^--color-/;
  for (const r of ctx.rules) {
    if (r.selector === '@font-face') continue;
    for (const d of r.decls) {
      if (!props.test(d.prop)) continue;
      const resolved = resolveVars(d.value, ctx.tokens).trim();
      const c = parseColor(resolved);
      if (!c || c.alpha < 1) continue;
      const isWhite = c.r > 0.999 && c.g > 0.999 && c.b > 0.999;
      const isBlack = c.r < 0.001 && c.g < 0.001 && c.b < 0.001;
      if (isWhite && ctx.genre === 'modern-minimal') continue;
      if (isWhite || isBlack) {

        const viaToken = d.prop.startsWith('--') || /var\(/.test(d.value);
        report(viaToken ? '7b' : '7a', 'FAIL', r.file, d.line, `pure ${isBlack ? '#000' : '#fff'}: ${d.prop}: ${trunc(d.value, 28)} (${r.selector})`, 'Tint the base toward the anchor hue');
      }
    }
  }
}

function check10(ctx) {
  for (const r of ctx.rules) {
    for (const d of r.decls) {
      if (d.prop === 'transition' && /(^|,)\s*all[\s,]|^all$|^all\s/.test(d.value.trim())) {
        report(10, 'FAIL', r.file, d.line, `transition: all on ${r.selector}`, 'List the transitioned properties explicitly');
      }
      if (d.prop === 'transition-property' && /\ball\b/.test(d.value)) {
        report(10, 'FAIL', r.file, d.line, `transition-property: all on ${r.selector}`, 'List the transitioned properties explicitly');
      }
    }
  }
  for (const doc of ctx.docs) {
    if (/class\s*=\s*["'][^"']*\btransition-all\b/.test(doc.src)) {
      report(10, 'FAIL', doc.file, 1, 'class "transition-all" in markup', 'List the transitioned properties explicitly');
    }
  }
}

function check11(ctx) {
  const byScale = new Map();
  for (const r of ctx.rules) {
    if (!/:hover/.test(r.selector)) continue;
    for (const d of r.decls) {
      if (d.prop !== 'transform') continue;
      const m = /scale\(\s*([\d.]+)\s*\)/.exec(d.value);
      if (m && parseFloat(m[1]) !== 1) {
        const k = m[1];
        if (!byScale.has(k)) byScale.set(k, []);
        byScale.get(k).push({ sel: r.selector, file: r.file, line: d.line });
      }
    }
  }
  for (const [k, list] of byScale) {
    const distinct = new Set(list.map((x) => x.sel));
    if (distinct.size >= 2) {
      report(11, 'WARN', list[0].file, list[0].line, `hover scale(${k}) on ${distinct.size} selectors`, 'One hover signal per element');
    }
  }
  for (const r of ctx.rules) {
    if (!/:hover/.test(r.selector) || !/(^|[\s>+~,])(img|picture|figure|video)\b|__(img|image|photo|thumb|cover)\b|\.(img|image|photo|thumb|cover)\b/i.test(r.selector)) continue;
    const t = r.decls.find((d) => d.prop === 'transform' && /scale|rotate/.test(d.value));
    if (t) report(11, 'WARN', r.file, t.line, `image transforms on hover (${r.selector})`, 'Imagery sits still; give the container the feedback');
  }
}

function check12(ctx) {
  const uiSel = /:hover|:active|:focus|\b(btn|button|modal|dialog|tooltip|dropdown|menu|popover|toast|tab|input|select|switch|toggle|accordion)\b/i;
  for (const r of ctx.rules) {
    if (!uiSel.test(r.selector)) continue;
    for (const d of r.decls) {
      if (!/transition|animation/.test(d.prop)) continue;
      const re = /cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/g;
      let m;
      while ((m = re.exec(resolveVars(d.value, ctx.tokens)))) {
        const y1 = parseFloat(m[2]), y2 = parseFloat(m[4]);
        if (y1 > 1.05 || y2 > 1.05 || y1 < -0.05 || y2 < -0.05) {
          report(12, 'FAIL', r.file, d.line, `overshoot easing ${m[0]} on ${r.selector}`, 'Use exponential ease-out on UI state changes');
        }
      }
    }
  }
}

function check10Motion(ctx) {
  const hardRe = /(?<![\w-])(width|height|top|left|right|bottom|inset(?:-[a-z-]+)?|flex-basis|grid-template-(?:columns|rows))(?![\w-])/;
  const softRe = /(?<![\w-])(margin(?:-[a-z]+)?|padding(?:-[a-z]+)?)(?![\w-])/;
  const a11ySel = /skip|sr-only|visually-hidden/i;
  for (const r of ctx.rules) {
    if (a11ySel.test(r.selector)) continue;
    if (r.keyframes) {
      for (const d of r.decls) {
        if (/^(min|max)-/.test(d.prop)) continue;
        if (hardRe.test(d.prop)) {
          report('10a', 'FAIL', r.file, d.line, `@keyframes ${r.keyframes} animates ${d.prop}`, 'Animate transform or opacity instead');
        } else if (softRe.test(d.prop)) {
          report('10b', 'WARN', r.file, d.line, `@keyframes ${r.keyframes} animates ${d.prop}`, 'Animate transform or opacity instead');
        }
      }
      continue;
    }
    for (const d of r.decls) {
      if (d.prop === 'transition' || d.prop === 'transition-property') {
        const hard = hardRe.exec(d.value);
        const soft = softRe.exec(d.value);
        if (hard) {
          report('10a', 'FAIL', r.file, d.line, `transitioning ${hard[1]} on ${r.selector}`, 'Animate transform or opacity instead');
        } else if (soft) {
          report('10b', 'WARN', r.file, d.line, `transitioning ${soft[1]} on ${r.selector}`, 'Animate transform or opacity instead');
        }
      }
    }
  }
}

function check15(ctx) {
  for (const r of ctx.rules) {
    if (!/:focus(-visible|-within)?\b/.test(r.selector)) continue;
    for (const d of r.decls) {
      if (d.prop === 'transition' && /outline|box-shadow|opacity|all/.test(d.value)) {
        report(15, 'FAIL', r.file, d.line, `focus ring transition on ${r.selector}`, 'Remove the transition; rings appear instantly');
      }
    }
  }
}

function check17(ctx) {
  const tips = ctx.rules.filter((r) => /tooltip|tip\b/i.test(r.selector));
  const delayed = (r) => r.decls.find((d) => /^transition(-delay)?$/.test(d.prop) && /(\d{3,})ms|([1-9][\d.]*)s\b/.test(d.value));
  const hover = tips.filter((r) => /:hover/.test(r.selector)).map(delayed).find(Boolean);
  const focus = tips.filter((r) => /:focus/.test(r.selector)).map(delayed).find(Boolean);
  if (hover && focus) {
    report(17, 'WARN', tips[0].file, focus.line, 'tooltip focus delay matches hover delay', 'Hover delay 800-1000ms; focus delay 0');
  }
}

function check18(ctx) {
  const autoish = /carousel|marquee|ticker|rotate|slider|scroll|auto/i;
  const paused = ctx.rules.some((r) => /:hover|:focus/.test(r.selector) && r.decls.some((d) => d.prop === 'animation-play-state' && /paused/.test(d.value)));
  for (const r of ctx.rules) {
    if (r.keyframes || !autoish.test(r.selector)) continue;
    for (const d of r.decls) {
      if (/^animation(-iteration-count)?$/.test(d.prop) && /\binfinite\b/.test(d.value) && !paused) {
        report(18, 'WARN', r.file, d.line, `infinite animation on ${r.selector} with no pause state`, 'Pause on hover and focus');
      }
    }
  }
}

function check19(ctx) {
  for (const doc of ctx.docs) {
    const t = maskedProse(doc);
    const patterns = [
      [/\b(jane doe|john smith|john doe|example user)\b/i, 'placeholder name'],
      [/\bAcme\b/, 'startup cliche name'],
      [/\bNexus\b/, 'startup cliche name'],
      [/\bUnleash\b/, 'startup cliche name'],
    ];
    for (const [re, label] of patterns) {
      const m = re.exec(t);
      if (m) report(19, 'FAIL', doc.file, doc.lineOf(m.index), `${label}: "${m[0]}"`, 'Use plausible audience-fitting names');
    }
  }
}

function check20(ctx) {
  if (ctx.tokensOnly) return;
  const stamped = (src) => {
    const lines = src.split('\n').map((l) => l.trim()).filter(Boolean);
    let i = 0;
    while (i < lines.length && /^@charset\b/i.test(lines[i])) i++;
    return i < lines.length && /^\/\*\s*Hallmark/.test(lines[i]);
  };
  let ok = false;
  const cssSources = [];
  for (const f of ctx.cssFiles) cssSources.push(f.raw);
  for (const doc of ctx.docs) for (const s of doc.styles) cssSources.push(s.css);
  for (const s of cssSources) if (stamped(s)) { ok = true; break; }
  if (!ok && cssSources.length) {
    const where = ctx.cssFiles[0]?.file || ctx.docs[0]?.file;
    report(20, 'FAIL', where, 1, 'no Hallmark stamp on the first non-empty line of any CSS', 'The stamp comment is line 1 of the CSS; only @charset may precede it');
  }
}

function check22(ctx) {
  if (ctx.genre === 'modern-minimal') return;
  const MASK_PROPS = /(^|-)mask(-image|-composite|-mode)?$|^filter$|^backdrop-filter$/;
  for (const r of ctx.rules) {
    for (const d of r.decls) {
      if (MASK_PROPS.test(d.prop)) continue;
      const re = /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+[\d.]+(?:deg)?\s*(?:\/\s*([\d.]+%?))?\s*\)/g;
      let m;
      while ((m = re.exec(d.value))) {
        const chroma = parseFloat(m[2]);
        const alpha = m[3] ? (m[3].endsWith('%') ? parseFloat(m[3]) / 100 : parseFloat(m[3])) : 1;
        if (chroma === 0 && alpha >= 1) {
          report(22, 'FAIL', r.file, d.line, `zero-chroma ${m[0]} (${d.prop} on ${r.selector})`, 'Give neutrals at least 0.005 chroma');
        }
      }
    }
  }
}

function check23(ctx) {
  if (ctx.posture === 'drenched') return;
  const ACC = /var\(\s*--color-accent(?:-2)?\s*[,)]/;
  const SURFACE = /(^|[\s,>~+])(body|html|main|section|header|footer|aside)(\b|$)|\bhero\b|__hero|banner|\bstrip\b|\bband\b/i;
  const big = (r) => r.decls.some((d) =>
    (/^(min-)?height$/.test(d.prop) && (parseFloat((/([\d.]+)\s*(vh|dvh|svh)/.exec(d.value) || [])[1] || 0) >= 40 || (pxOf(d.value) ?? 0) >= 320)) ||
    (d.prop === 'inset' && /^0(px)?(\s|$)/.test(d.value.trim())));
  for (const r of ctx.rules) {
    if (isTokenRule(r) || r.keyframes) continue;
    for (const d of r.decls) {
      if (!/^background(-color|-image)?$/.test(d.prop) || !ACC.test(d.value)) continue;
      if (/\/\s*0?\.[0-2]\d*/.test(d.value)) continue;
      if (ctx.genre === 'atmospheric' && /radial-gradient/i.test(d.value)) continue;
      if (SURFACE.test(r.selector) || big(r)) {
        report(23, 'WARN', r.file, d.line,
          `accent background on viewport-scale rule "${trunc(r.selector, 44)}"`,
          'Accent stays <= 5% of a viewport; large fills belong to paper/field tokens or a declared posture in the stamp');
      }
    }
    const col = r.decls.find((d) => d.prop === 'color' && ACC.test(d.value));
    const fsDecl = r.decls.find((d) => d.prop === 'font-size');
    if (col && fsDecl) {
      const rv = resolveVars(fsDecl.value, ctx.tokens);
      const clampMax = /,\s*([^,()]+)\)\s*$/.exec(rv);
      const maxPx = pxOf(rv) ?? (clampMax ? pxOf(clampMax[1].trim()) : null);
      if ((maxPx != null && maxPx >= 48) || /--text-display\b/.test(fsDecl.value)) {
        report(23, 'WARN', r.file, col.line,
          `display-size text set in accent on "${trunc(r.selector, 44)}"`,
          'Accent marks emphasis; set display type in ink and keep accent for small signals');
      }
    }
  }
}

function check24(ctx) {
  const props = /^(padding|margin|gap|row-gap|column-gap)(-[a-z]+)?$/;
  for (const r of ctx.rules) {
    for (const d of r.decls) {
      if (!props.test(d.prop)) continue;
      const re = /(-?\d+(?:\.\d+)?)px/g;
      let m;
      while ((m = re.exec(d.value))) {
        const v = Math.abs(parseFloat(m[1]));
        if (v > 2 && (v % 4 !== 0 || !Number.isInteger(v))) {
          report('24b', 'FAIL', r.file, d.line, `${d.prop}: ${trunc(d.value, 28)} (off the 4px scale) on ${r.selector}`, 'Use the 4px spacing scale');
        }
      }
    }
  }
}

function check24a(ctx) {
  const spaceVals = new Map();
  for (const [k, v] of Object.entries(ctx.tokens)) {
    if (!/^--space-/.test(k)) continue;
    const px = pxOf(resolveVars(v, ctx.tokens));
    if (px != null && px > 0) spaceVals.set(px, k);
  }
  if (!spaceVals.size) return;
  const props = /^(padding|margin|gap|row-gap|column-gap)(-[a-z]+)?$/;
  const counts = new Map();
  for (const r of ctx.rules) {
    if (r.keyframes || isTokenRule(r)) continue;
    for (const d of r.decls) {
      if (!props.test(d.prop)) continue;
      const raw = d.value.replace(/var\([^)]*\)/g, ' ');
      for (const m of raw.matchAll(/(?<![\w.-])(-?\d+(?:\.\d+)?)(px|rem)\b/g)) {
        const px = Math.abs(pxOf(m[1] + m[2]) ?? 0);
        if (!px || !spaceVals.has(px)) continue;
        const n = (counts.get(r.file) || 0) + 1;
        counts.set(r.file, n);
        if (n <= 8) report('24a', 'FAIL', r.file, d.line, `${d.prop}: ${trunc(d.value, 28)} on ${trunc(r.selector, 32)} where ${spaceVals.get(px)} exists`, `Use var(${spaceVals.get(px)})`);
        break;
      }
    }
  }
  for (const [file, n] of counts) if (n > 8) report('24a', 'FAIL', file, 1, `+${n - 8} more raw spacing lengths with a matching --space-* token in this file`, 'Use the tokens');
}

function check25(ctx) {
  const proseish = /(^|[\s,>+~(])p\b|lede|prose|copy|__body|__text|__desc|paragraph/i;
  for (const r of ctx.rules) {
    if (!proseish.test(r.selector) || HEADING_SEL.test(r.selector)) continue;
    for (const d of r.decls) {
      if (d.prop !== 'max-width') continue;
      const m = /^([\d.]+)ch$/.exec(resolveVars(d.value, ctx.tokens).trim());
      if (m) {
        const ch = parseFloat(m[1]);
        if (ch < 45 || ch > 75) {
          report(25, 'WARN', r.file, d.line, `measure ${ch}ch on ${r.selector} (45-75ch range)`, 'Set prose measure between 45 and 75ch');
        }
      }
    }
  }
}

function check26(ctx) {
  const hasInteractive = ctx.docs.some((doc) => /<(a|button|input|select|textarea)\b|role\s*=\s*["']button/i.test(doc.src))
    || ctx.rules.some((r) => selectorIsInteractive(r.selector));
  if (!hasInteractive) return;
  const has = (pseudo) => ctx.rules.some((r) => r.selector.includes(pseudo));
  const file = ctx.cssFiles[0]?.file || ctx.docs[0]?.file || '?';
  if (!has(':focus-visible') && !has(':focus')) {
    report('26a', 'FAIL', file, 1, 'no :focus-visible styling anywhere', 'A focus ring at 3:1 or better, instant');
  }
  if (!has(':active')) {
    report('26b', 'FAIL', file, 1, 'no :active styling anywhere', 'All eight states; guard: not a form control, no aria-disabled anywhere');
  }
  const hasFormish = ctx.docs.some((doc) => /<(button|input|select|textarea)\b/i.test(doc.src));
  if (hasFormish && !has(':disabled') && !ctx.rules.some((r) => /\[disabled\]|aria-disabled/.test(r.selector))) {
    report('26b', 'FAIL', file, 1, 'no :disabled styling anywhere', 'All eight states; guard: not a form control, no aria-disabled anywhere');
  }
}

function check27(ctx) {
  const hasMotion = ctx.rules.some((r) => r.keyframes)
    || ctx.rules.some((r) => r.decls.some((d) => /^transition/.test(d.prop) && /transform/.test(d.value)));
  if (!hasMotion) return;
  const hasPRM = ctx.rules.some((r) => r.media && /prefers-reduced-motion/i.test(r.media))
    || ctx.cssFiles.some((f) => /prefers-reduced-motion/i.test(stripComments(f.raw)))
    || ctx.docs.some((doc) => doc.styles.some((s) => /prefers-reduced-motion/i.test(stripComments(s.css))));
  if (!hasPRM) {
    const kf = ctx.rules.find((r) => r.keyframes);
    const file = kf ? kf.file : (ctx.cssFiles[0]?.file || ctx.docs[0]?.file || '?');
    report(27, 'FAIL', file, kf ? kf.line : 1, 'motion present, no prefers-reduced-motion block', 'Add a prefers-reduced-motion fallback');
  }
}

function check28(ctx) {
  for (const doc of ctx.docs) {
    let firstMedia = true;
    for (const t of doc.tags) {
      if (t.close) continue;
      if (t.name === 'video') {
        if (hasAttr(t.attrs, 'autoplay') && !hasAttr(t.attrs, 'muted')) {
          report('28a', 'FAIL', doc.file, t.line, 'autoplay video without muted', 'autoplay muted loop playsinline, with poster');
        }
        if (!getAttr(t.attrs, 'poster')) {
          report('28b', 'FAIL', doc.file, t.line, 'video without poster', 'Add a poster frame; guard: below the fold and not the LCP');
        }
        if ((getAttr(t.attrs, 'loading') || '').toLowerCase() === 'lazy' && firstMedia) {
          report('28a', 'WARN', doc.file, t.line, 'lazy-loaded hero video', 'fetchpriority=high on the LCP element');
        }
        firstMedia = false;
      }
      if (t.name === 'img') {
        if (firstMedia && (getAttr(t.attrs, 'loading') || '').toLowerCase() === 'lazy') {
          report('28a', 'WARN', doc.file, t.line, 'lazy-loaded first image (likely LCP)', 'fetchpriority=high on the LCP element');
        }
        firstMedia = false;
      }
    }
  }
}

function check30(ctx) {
  const EMOJI = /(?![\u00a9\u00ae\u2122\u203c\u2049\u2190-\u21ff])\p{Extended_Pictographic}/u;
  for (const doc of ctx.docs) {
    for (let i = 0; i < doc.tags.length; i++) {
      const t = doc.tags[i];
      if (t.close || t.selfClosing) continue;
      const cls = getAttr(t.attrs, 'class') || '';
      const iconish = /icon|card|step|tier|feature|value|prop|badge/i.test(cls);
      const inner = innerOf(doc, i);
      if (!inner) continue;
      const content = inner.inner.replace(/<[^>]*>/g, '').trim();
      if (content && content.length <= 4 && EMOJI.test(content) && (iconish || !/<[a-z]/.test(inner.inner))) {
        report('30a', 'FAIL', doc.file, t.line, `emoji icon "${content}" in <${t.name} class="${trunc(cls, 28)}">`, 'One icon library or custom SVG');
      }
    }
  }
  const libs = new Map([
    ['material', /material-icons|material-symbols/i],
    ['heroicons', /heroicon/i],
    ['lucide', /lucide/i],
    ['phosphor', /phosphor|\bph-(?:bold|fill|light|duotone|[a-z]+-[a-z]+)/i],
    ['font-awesome', /font-?awesome|\bfa-(solid|regular|brands|light)\b/i],
    ['feather', /feather-icons|\bfeather\b/i],
    ['tabler', /tabler-icons/i],
    ['bootstrap-icons', /bootstrap-icons|\bbi-[a-z]/i],
  ]);
  const found = new Set();
  const hay = ctx.docs.map((d) => d.src).join('\n') + ctx.cssFiles.map((f) => f.raw).join('\n');
  for (const [name, re] of libs) if (re.test(hay)) found.add(name);
  if (found.size >= 2) {
    report('30b', 'WARN', ctx.docs[0]?.file || ctx.cssFiles[0]?.file, 1, `icon libraries mixed: ${[...found].join(' + ')}`, 'One icon library per page; guard: the second is a brand mark in at most two slots');
  }
}

function check33(ctx) {
  const labeledAttrs = (a) => hasAttr(a, 'aria-hidden') || getAttr(a, 'aria-label') != null
    || getAttr(a, 'aria-labelledby') != null
    || ['img', 'presentation', 'none'].includes((getAttr(a, 'role') || '').toLowerCase());
  for (const doc of ctx.docs) {
    const stack = [];
    for (const t of doc.tags) {
      if (t.close) {
        for (let i = stack.length - 1; i >= 0; i--) {
          if (stack[i].name === t.name) { stack.splice(i); break; }
        }
        continue;
      }
      if (t.name === 'svg' || t.name === 'canvas') {
        const ancestorLabeled = stack.some((s) => s.labeled);
        const titled = t.name === 'svg' && !t.selfClosing && /<title\b[^>]*>\s*\S/i.test(innerOf(doc, doc.tags.indexOf(t))?.inner || '');
        if (!labeledAttrs(t.attrs) && !ancestorLabeled && !titled) {
          report(33, 'FAIL', doc.file, t.line, `<${t.name}> without aria-hidden or aria-label`, 'Add aria-hidden or an aria-label');
        }
      }
      if (!t.selfClosing) stack.push({ name: t.name, labeled: labeledAttrs(t.attrs) });
    }
  }
}

function check34(ctx) {
  const clipped = new Set();
  let hidden = null;
  for (const r of ctx.rules) {
    if (!/(^|[\s,])(html|body)\b/.test(r.selector)) continue;
    const targets = r.selector.split(',').map((p) => (/^\s*(html|body)\s*$/.exec(p) || [])[1]).filter(Boolean);
    for (const d of r.decls) {
      if (d.prop === 'overflow-x' || d.prop === 'overflow') {
        if (/\bclip\b/.test(d.value)) for (const t of targets) clipped.add(t);
        else if (/\bhidden\b/.test(d.value)) hidden = { file: r.file, line: d.line, sel: r.selector };
      }
    }
  }
  const file = ctx.cssFiles[0]?.file || ctx.docs[0]?.file;
  const both = clipped.has('html') && clipped.has('body');
  if (!both && hidden) {
    report(34, 'WARN', hidden.file, hidden.line, `overflow-x: hidden on ${hidden.sel} (breaks sticky)`, 'Use overflow-x: clip on both html and body, never hidden');
  } else if (!both && file && ctx.docs.length) {
    const where = clipped.size ? `overflow-x: clip on ${[...clipped][0]} only` : 'no overflow-x: clip on html and body';
    report(34, 'FAIL', file, 1, where, 'overflow-x: clip on both html and body');
  }
  for (const r of ctx.rules) {
    for (const d of r.decls) {
      if (/^(width|min-width)$/.test(d.prop) && /^100vw$/.test(d.value.trim())) {
        report(34, 'WARN', r.file, d.line, `${d.prop}: 100vw on ${r.selector} (scrollbar overflow)`, 'width: 100% with container padding');
      }
    }
  }
}

function check37(ctx) {
  const families = new Map();
  const generic = GENERIC_FAMILIES;
  for (const r of ctx.rules) {
    if (r.selector === '@font-face') continue;
    for (const d of r.decls) {
      if (d.prop !== 'font-family' && !/^--font-/.test(d.prop)) continue;
      if (/^--font-/.test(d.prop) && !isTokenRule(r)) continue;
      const fam = firstFamily(resolveVars(d.value, ctx.tokens));
      if (!fam || generic.has(fam) || fam.startsWith('var(')) continue;
      if (!families.has(fam)) families.set(fam, { file: r.file, line: d.line });
    }
  }
  if (families.size > 3) {
    const list = [...families.keys()].join(', ');
    const first = [...families.values()][3];
    report(37, 'FAIL', first.file, first.line, `${families.size} font families: ${trunc(list, 56)}`, 'Drop the extra family; three is the ceiling');
  }
}

function check38a(ctx) {
  for (const r of ctx.rules) {
    if (!HEADING_SEL.test(r.selector)) continue;
    for (const d of r.decls) {
      if (d.prop === 'font-style' && /italic|oblique/.test(d.value)) {
        report('38ii', 'FAIL', r.file, d.line, `italic display type on ${r.selector}`, 'Roman headers; emphasis via weight or accent');
      }
    }
  }

  const emNormalized = ctx.rules.some((r) =>
    /(^|[\s,])(em|i)\b/.test(r.selector)
    && r.decls.some((d) => d.prop === 'font-style' && /normal/.test(d.value)));
  if (emNormalized) return;
  for (const doc of ctx.docs) {
    const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
    let m;
    while ((m = re.exec(doc.src))) {
      if (/<(em|i)\b/i.test(m[2])) {
        report('38i', 'FAIL', doc.file, doc.lineOf(m.index), `<em>/<i> inside <h${m[1]}>`, 'Roman headers; emphasis via weight or accent');
      }
    }
  }
}

function check39(ctx) {
  const hasInputs = ctx.docs.some((doc) => /<(input|textarea|select)\b/i.test(doc.src))
    || ctx.rules.some((r) => /(^|[\s,>+~])(input|textarea|select)\b/.test(r.selector));
  if (!hasInputs) return;
  const inputSel = /(^|[\s,>+~])(input|textarea|select)\b|__input|__field|\.(input|field)\b/;
  const widthOf = (v) => { const m = /(\d+(?:\.\d+)?)px/.exec(v); return m ? parseFloat(m[1]) : null; };
  let baseW = null, baseWhere = null;
  for (const r of ctx.rules) {
    if (!inputSel.test(r.selector) || /:hover|:focus|:active|:disabled|\[|:checked/.test(r.selector)) {
      continue;
    }
    for (const d of r.decls) {
      if (d.prop === 'border' || d.prop === 'border-width') {
        const w = widthOf(d.value);
        if (w != null && baseW == null) { baseW = w; baseWhere = { file: r.file, line: d.line }; }
      }
    }
  }
  for (const r of ctx.rules) {
    if (!inputSel.test(r.selector)) continue;
    const stateful = /:hover|:focus|\.is-error|\[aria-invalid/.test(r.selector);
    if (!stateful) continue;
    for (const d of r.decls) {
      if (d.prop === 'border' || d.prop === 'border-width') {
        const w = widthOf(d.value);
        if (w != null && baseW != null && w !== baseW) {
          report('39a', 'FAIL', r.file, d.line, `border-width ${baseW}px -> ${w}px on ${r.selector} (layout shift)`, 'Keep border-width constant; move state to outline');
        }
      }
    }
    if (/:focus/.test(r.selector)) {
      const setsBorder = r.decls.some((d) => /^border(-color)?$/.test(d.prop));
      const setsOutline = r.decls.some((d) => /^outline/.test(d.prop));
      if (setsBorder && !setsOutline) {
        report('39a', 'FAIL', r.file, r.line, `focus state via border on ${r.selector}`, 'Focus ring via outline, not border');
      }
    }
  }
  for (const r of ctx.rules) {
    if (!/:disabled|\[disabled\]/.test(r.selector)) continue;
    const hasOpacity = r.decls.some((d) => d.prop === 'opacity');
    const hasCursor = r.decls.some((d) => d.prop === 'cursor' && /not-allowed/.test(d.value));
    if (hasOpacity && !hasCursor) {
      report('39a', 'FAIL', r.file, r.line, `disabled via opacity alone on ${r.selector}`, 'Three disabled channels: fill, ink and cursor, plus the disabled attribute');
    }
  }
}

function check40_41(ctx) {
  const bySel = mergedDeclsBySelector(ctx);
  const resolveColor = (value, local) => {
    const resolved = resolveVars(value, ctx.tokens, local).trim();
    return parseColor(resolved);
  };
  for (const r of bySel) {
    const local = {};
    for (const d of r.decls) if (d.prop.startsWith('--')) local[d.prop] = d.value;
    const colorD = r.decls.find((d) => d.prop === 'color');
    const bgD = r.decls.find((d) => d.prop === 'background-color')
      || r.decls.find((d) => d.prop === 'background' && !/gradient|url\(/i.test(d.value));
    if (colorD && bgD && !/::selection|::placeholder|::-moz/.test(r.selector)) {
      const fg = resolveColor(colorD.value, local);
      const bg = resolveColor(bgD.value, local);
      if (fg && bg && fg.alpha >= 1 && bg.alpha >= 1) {
        const sizeD = r.decls.find((d) => d.prop === 'font-size');
        const weightD = r.decls.find((d) => d.prop === 'font-weight');
        const sizePx = sizeD ? pxOf(resolveVars(sizeD.value, ctx.tokens, local)) : null;
        const weight = weightD ? parseInt(weightD.value, 10) || 400 : 400;
        const large = (sizePx != null && sizePx >= 24) || (sizePx != null && sizePx >= 18 && weight >= 700);
        const threshold = large ? 3.0 : 4.5;
        const ratio = contrastRatio(fg, bg);
        if (ratio < threshold - 0.05) {
          report(40, 'WARN', r.file, colorD.line, `${ratio.toFixed(2)}:1 < ${threshold}:1 on ${r.selector}`, 'Raise the contrast to threshold');
        }
        const okFg = srgbToOklch(fg), okBg = srgbToOklch(bg);
        const btnish = /btn|button|cta|pill|chip/i.test(r.selector);
        if (btnish && Math.abs(okFg.L - okBg.L) < 0.05 && Math.abs(okFg.C - okBg.C) < 0.05) {
          report(41, 'WARN', r.file, colorD.line, `button text ~ button fill on ${r.selector} (dL ${Math.abs(okFg.L - okBg.L).toFixed(3)})`, 'Use accent-ink or paper for the label');
        }
      }
    }
    const faceProp = Object.keys(local).find((k) => /(face|fill|bg)$/.test(k));
    const inkProp = Object.keys(local).find((k) => /(ink|text)$/.test(k));
    if (faceProp && inkProp) {
      const face = resolveColor(local[faceProp], local);
      const ink = resolveColor(local[inkProp], local);
      if (face && ink && face.alpha >= 1 && ink.alpha >= 1) {
        const a = srgbToOklch(face), b = srgbToOklch(ink);
        if (Math.abs(a.L - b.L) < 0.05 && Math.abs(a.C - b.C) < 0.05) {
          report(41, 'WARN', r.file, r.line, `${inkProp} ~ ${faceProp} on ${r.selector}`, 'Use accent-ink or paper for the label');
        }
      }
    }
  }
  if (ctx.tokens['--color-accent'] && !ctx.tokens['--color-accent-ink']) {
    const used = ctx.rules.some((r) => !isTokenRule(r) && r.decls.some((d) =>
      /^background(-color)?$/.test(d.prop) && /var\(\s*--color-accent\s*[),]/.test(d.value)));
    if (used) {
      const file = ctx.cssFiles[0]?.file || ctx.docs[0]?.file;
      report(41, 'WARN', file, 1, 'accent fills a surface but --color-accent-ink is undefined', 'Define and apply --color-accent-ink');
    }
  } else if (ctx.tokens['--color-accent'] && ctx.tokens['--color-accent-ink']) {
    const a = parseColor(resolveVars(ctx.tokens['--color-accent'], ctx.tokens));
    const i = parseColor(resolveVars(ctx.tokens['--color-accent-ink'], ctx.tokens));
    if (a && i && contrastRatio(a, i) < 4.45) {
      const file = ctx.cssFiles[0]?.file || ctx.docs[0]?.file;
      report(41, 'WARN', file, 1, `accent-ink vs accent only ${contrastRatio(a, i).toFixed(2)}:1`, 'Accent-ink needs 4.5:1 against accent');
    }
  }
  const sectionish = /section|panel|hero|footer|band|block|col\b|__col|card|cta|dark|invert/i;
  for (const r of bySel) {
    if (!sectionish.test(r.selector) || /:hover|:focus|:active|::|@font-face/.test(r.selector)) continue;
    const local = {};
    for (const d of r.decls) if (d.prop.startsWith('--')) local[d.prop] = d.value;
    const bgD = r.decls.find((d) => d.prop === 'background-color')
      || r.decls.find((d) => d.prop === 'background' && !/gradient|url\(/i.test(d.value));
    if (!bgD) continue;
    const bg = resolveColor(bgD.value, local);
    if (!bg || bg.alpha < 1) continue;
    const okl = srgbToOklch(bg);
    if (okl.L < 0.5) {
      const hasColor = r.decls.some((d) => d.prop === 'color');
      if (!hasColor) {
        report(41, 'WARN', r.file, bgD.line, `dark surface (L ${(okl.L * 100).toFixed(0)}%) on ${r.selector} sets no text colour`, 'Swap text to paper in the same rule');
      }
    }
  }
}

function check42(ctx) {
  for (const doc of ctx.docs) {
    const navIdx = doc.tags.findIndex((t) => !t.close && (t.name === 'nav' || (t.name === 'header' && /banner|nav/i.test(t.attrs))));
    if (navIdx === -1) continue;
    const inner = innerOf(doc, navIdx);
    if (!inner) continue;
    const links = (inner.inner.match(/<a\b/gi) || []).length;
    const navTag = doc.tags[navIdx];
    const navCls = (getAttr(navTag.attrs, 'class') || '').split(/\s+/)[0];
    const hairline = ctx.rules.some((r) => (navCls && r.selector.includes(navCls) || /(^|[\s,])(nav|header)\b/.test(r.selector))
      && r.decls.some((d) => /^border(-bottom)?$/.test(d.prop) && /\b1px\b/.test(d.value)));
    const hasCta = /btn|cta|button/i.test(inner.inner);
    if (links >= 4 && links <= 6 && hairline && hasCta) {
      report(42, 'WARN', doc.file, navTag.line, `default nav shape: ${links} links + CTA + 1px hairline`, 'Route the nav via the cookbook variants');
    }
  }
}

function check42Footer(ctx) {
  for (const doc of ctx.docs) {
    const idx = doc.tags.findIndex((t) => !t.close && t.name === 'footer');
    if (idx === -1) continue;
    const inner = innerOf(doc, idx);
    if (!inner) continue;
    const uls = (inner.inner.match(/<ul\b/gi) || []).length;

    const fourEqualCol = ctx.rules.some((r) => /footer/i.test(r.selector) && r.decls.some((d) =>
      d.prop === 'grid-template-columns'
      && (/repeat\(\s*4\s*,/.test(d.value)
        || /^(1fr|minmax\([^)]*\))(\s+(1fr|minmax\([^)]*\))){3,}$/.test(d.value.trim()))));

    let linkGroups = 0;
    const colRe = /<(ul|div|p|nav)\b[^>]*class\s*=\s*"[^"]*(col|column|links|group)[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi;
    let cm;
    while ((cm = colRe.exec(inner.inner))) {
      if ((cm[3].match(/<a\b/gi) || []).length >= 3) linkGroups++;
    }
    for (const um of inner.inner.matchAll(/<ul\b[^>]*>([\s\S]*?)<\/ul>/gi)) {
      if ((um[1].match(/<a\b/gi) || []).length >= 3) linkGroups++;
    }
    if (uls >= 4 || (fourEqualCol && linkGroups >= 3)) {
      report(42, 'WARN', doc.file, doc.tags[idx].line, `default footer shape: ${uls >= 4 ? uls + ' link columns' : '4 equal columns of links'}`, 'Decide the footer and name it in the stamp, or build another shape');
    }
  }
}

function check46(ctx) {
  const shapes = [
    /\b\d+(\.\d+)?\s*[x×]\s*faster\b/i,
    /trusted by [\d,.]+\s*\+?/i,
    /\b99\.9+\s*%/,
    /\b[\d,]{4,}\s*\+\s*(teams|users|customers|developers|companies|creators)\b/i,
    /\b\d+(\.\d+)?\s*%\s*(faster|uptime|conversion|accuracy|retention|growth|fewer|less|more)\b/i,
    /\+\s*\d+(\.\d+)?\s*%\s*(conversion|growth|revenue|retention)\b/i,
    /\bsaves?\s+\d+\s+hours?\b/i,
  ];
  for (const doc of ctx.docs) {
    const prose = maskedProse(doc);
    const lines = new Set();
    for (const re of shapes) {
      const m = re.exec(prose);
      if (!m) continue;
      const line = doc.lineOf(m.index);
      if (lines.has(line)) continue;
      lines.add(line);
      report('46a', 'WARN', doc.file, line, `metric "${m[0].trim()}": verify the user supplied this number`, 'Confirm the metric or drop the slot');
    }
  }
}

const CHROME_47 = [
  ['47a', /(browser|window|mac|osx)[-_]?(bar|chrome|dots|controls)|traffic[-_]?light|title[-_]?bar|window[-_]?(dots|buttons)|url[-_]?(bar|pill)/i],
  ['47b', /phone[-_]?(frame|mock(up)?)|device[-_]?frame|\bnotch\b|terminal[-_]?(chrome|frame|bar|dots|header)|(ide|editor)[-_]?(chrome|frame)|(browser|window)[-_]?frame/i],
];
function check47(ctx) {
  for (const [gate, re] of CHROME_47) {
    for (const doc of ctx.docs) {
      for (const t of doc.tags) {
        if (t.close) continue;
        const cls = getAttr(t.attrs, 'class');
        const m = cls ? re.exec(cls) : null;
        if (m) { report(gate, 'FAIL', doc.file, t.line, `re-drawn chrome class "${m[0]}" (class="${trunc(cls, 32)}")`, 'Use a real screenshot in a figure'); break; }
      }
    }
    for (const r of ctx.rules) {
      const m = re.exec(r.selector);
      if (m) {
        report(gate, 'FAIL', r.file, r.line, `re-drawn chrome selector ${r.selector}`, 'Use a real screenshot in a figure');
        break;
      }
    }
  }
}

function check48(ctx) {
  const colorLit = /#[0-9a-fA-F]{3,8}\b|(?<![\w-])rgba?\(|(?<![\w-])hsla?\(|(?<![\w-])oklch\(/;
  const oklchCount = new Map();
  const warnOklch = (file, line, evidence) => {
    const n = (oklchCount.get(file) || 0) + 1;
    oklchCount.set(file, n);
    if (n <= 6) report(48, 'WARN', file, line, evidence, 'Lift the value into the token block');
  };
  for (const [prop, val] of Object.entries(ctx.tokens)) {
    if (/^--font-/.test(prop) && /FILL ME/i.test(val)) {
      const tr = ctx.rules.find((r) => isTokenRule(r) && r.decls.some((d) => d.prop === prop));
      report(48, 'FAIL', tr ? tr.file : ctx.cssFiles[0]?.file || ctx.docs[0]?.file, tr ? tr.decls.find((d) => d.prop === prop)?.line : 1, `${prop} is still the scaffold placeholder "FILL ME"`, 'Fill the face from direction.md § C before building');
    }
  }
  for (const r of ctx.rules) {
    if (isTokenRule(r)) continue;
    for (const d of r.decls) {
      if (d.prop === 'font-family') {
        const v = d.value;
        if (/FILL ME/i.test(resolveVars(v, ctx.tokens))) {
          report(48, 'FAIL', r.file, d.line, `font-family on ${r.selector} resolves to the placeholder "FILL ME"`, 'Fill the face from direction.md § C before building');
          continue;
        }
        if (!v.includes('var(')) {
          const fam = firstFamily(v);
          if (!GENERIC_FAMILIES.has(fam)) {
            report(48, 'FAIL', r.file, d.line, `font-family literal "${trunc(v, 36)}" on ${r.selector}`, 'Lift the value into the token block');
          }
        }
        continue;
      }
      if (!colorLit.test(d.value)) continue;
      const re = /#[0-9a-fA-F]{3,8}\b|oklch\([^)]*\)|rgba?\([^)]*\)|hsla?\([^)]*\)/g;
      let m;
      while ((m = re.exec(d.value))) {
        const c = parseColor(m[0]);
        if (!c) continue;
        if (c.alpha === 0) continue;
        const isOklch = m[0].toLowerCase().startsWith('oklch');
        const ev = `${isOklch ? 'oklch' : 'colour'} literal ${trunc(m[0], 30)} outside tokens (${d.prop} on ${trunc(r.selector, 30)})`;
        if (isOklch) warnOklch(r.file, d.line, ev);
        else report(48, 'FAIL', r.file, d.line, ev, 'Lift the value into the token block');
      }
    }
  }
  for (const doc of ctx.docs) {
    const re = /style\s*=\s*"([^"]*)"/gi;
    let m;
    while ((m = re.exec(doc.src))) {
      const lit = /#[0-9a-fA-F]{3,8}\b|oklch\([^)]*\)|rgba?\([^)]*\)|hsla?\([^)]*\)/.exec(m[1]);
      if (lit && parseColor(lit[0])) {
        const isOklch = lit[0].toLowerCase().startsWith('oklch');
        const ev = `inline-style colour literal ${trunc(lit[0], 30)}`;
        if (isOklch) warnOklch(doc.file, doc.lineOf(m.index), ev);
        else report(48, 'FAIL', doc.file, doc.lineOf(m.index), ev, 'Lift the value into the token block');
      }
    }
  }
  for (const [file, n] of oklchCount) {
    if (n > 6) {
      report(48, 'WARN', file, 1, `+${n - 6} more oklch literals outside tokens in this file`, 'Lift the values into the token block');
    }
  }
}

function check49(ctx) {
  const nowrapSelectors = ctx.rules.filter((r) => r.decls.some((d) => d.prop === 'white-space' && /nowrap/.test(d.value)));
  const covered = (cls, tag) => nowrapSelectors.some((r) =>
    (cls && cls.split(/\s+/).some((c) => c && r.selector.includes('.' + c))) || new RegExp(`(^|[\\s,>+~])${tag}\\b`).test(r.selector));
  for (const doc of ctx.docs) {
    for (let i = 0; i < doc.tags.length; i++) {
      const t = doc.tags[i];
      if (t.close || t.selfClosing) continue;
      const cls = getAttr(t.attrs, 'class') || '';
      const clickable = t.name === 'button' || (t.name === 'a' && /btn|cta|button|nav/i.test(cls))
        || /(^|\s)(btn|cta|button)(\s|$|__|--)/i.test(cls);
      if (!clickable) continue;
      const inner = innerOf(doc, i);
      if (!inner) continue;
      const label = inner.inner.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      if (label.length > 24 && !covered(cls, t.name)) {
        report(49, 'WARN', doc.file, t.line, `long clickable label "${trunc(label, 36)}" without nowrap`, 'Shorten the label or set nowrap');
      }
    }
  }
}

function check50(ctx) {
  for (const r of ctx.rules) {
    for (const d of r.decls) {
      if (!/^grid-template-(columns|rows)$/.test(d.prop)) continue;
      const flat = resolveVars(d.value, ctx.tokens).replace(/minmax\([^)]*\)/g, 'MM');
      const bare = /(?<![\w.-])\d*\.?\d+fr\b/.exec(flat);
      if (!bare) continue;
      const classes = (r.selector.match(/\.[a-zA-Z][\w-]*/g) || []).map((c) => c.slice(1));
      let hit = null;
      for (const doc of ctx.docs) {
        for (let i = 0; i < doc.tags.length; i++) {
          const t = doc.tags[i];
          if (t.close || t.selfClosing) continue;
          const cls = getAttr(t.attrs, 'class') || '';
          if (!classes.some((c) => cls.split(/\s+/).includes(c))) continue;
          const inner = innerOf(doc, i);
          if (inner && /<(img|picture|video)\b/i.test(inner.inner)) { hit = { doc, t }; break; }
        }
        if (hit) break;
      }
      if (hit) {
        report(50, 'FAIL', r.file, d.line, `bare ${bare[0]} track holds images (${r.selector})`, 'Use minmax(0, 1fr) for image tracks');
      }
    }
  }
}

function check50Wrap(ctx) {
  const wrapCovered = (cls, tag) => ctx.rules.some((r) => {
    const has = r.decls.some((d) =>
      (d.prop === 'overflow-wrap' && /anywhere|break-word/.test(d.value))
      || (d.prop === 'word-break' && /break-word|break-all/.test(d.value))
      || (d.prop === 'hyphens' && /auto/.test(d.value)));
    if (!has) return false;
    if (/^\*|:where\(|html|body/.test(r.selector)) return true;
    return (cls && cls.split(/\s+/).some((c) => c && r.selector.includes('.' + c)))
      || new RegExp(`(^|[\\s,>+~])${tag}\\b`).test(r.selector);
  });
  for (const doc of ctx.docs) {
    for (let i = 0; i < doc.tags.length; i++) {
      const t = doc.tags[i];
      if (t.close || t.selfClosing) continue;
      const cls = getAttr(t.attrs, 'class') || '';
      const displayish = /^h[12]$/.test(t.name) || /hero__(title|display)|section__title|__display/.test(cls);
      if (!displayish) continue;
      const inner = innerOf(doc, i);
      if (!inner) continue;
      const textContent = inner.inner.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      let risky = null;
      for (const word of textContent.split(' ')) {
        for (const seg of word.split('-')) {
          if (seg.replace(/[^\w]/g, '').length >= 16) { risky = word; break; }
        }
        if (risky) break;
      }
      if (risky && !wrapCovered(cls, t.name)) {
        report(50, 'FAIL', doc.file, t.line, `display header word "${trunc(risky, 30)}" with no overflow-wrap`, 'Add overflow-wrap: break-word and min-width: 0');
      }
    }
  }
}

function check53(ctx) {
  const radios = ctx.rules.filter((r) => /input\[type=["']?radio["']?\]|\.(radio|tab-input|tab-radio)\b/i.test(r.selector));
  for (const r of radios) {
    const abs = r.decls.some((d) => d.prop === 'position' && /absolute|fixed/.test(d.value));
    const topZero = r.decls.some((d) => d.prop === 'top' && /^0(px|rem)?$/.test(d.value.trim()));
    if (abs && topZero) {
      const guarded = ctx.docs.some((doc) => /preventScroll/.test(doc.scripts));
      if (!guarded) {
        report(53, 'FAIL', r.file, r.line, `radio tabs at position:absolute top:0 (${r.selector}), no JS guard`, 'Keep radios in flow or add a JS guard');
      }
    }
  }
}

const EYEBROW_CONTAINER = /^(div|header|section|article|aside|hgroup|li|main|figure|a|body|blockquote)$/;

const EYEBROW_SKIP_TAGS = /^(figcaption|label|legend|caption|th|dt|summary|option|code|kbd|button|select|nav|time)$/;
const EYEBROW_ANCESTOR_SKIP = /^(form|fieldset|table|thead|tbody|nav|menu|dl|select|figcaption|label|button)$/;

const EYEBROW_BLOCKY = /<(p|ul|ol|hr|h[1-6]|img|table|figure|section|article|blockquote|form|dl)\b/i;
const EYEBROW_CLASS = /\b(eyebrow|kicker|overline|superhead|suphead|rubric|strap(line)?|pre-?(title|head(ing)?)|section-?label|num-?label|chapter|ordinal|topic|category|dept)\b|__(num|label|tag|kicker|chip|badge|meta|index|caps|micro)\b|\b(tag|chip|badge|meta|caps|micro|label|index)\b/i;
const EYEBROW_ANNOUNCE = /^(features?|benefits?|introducing|new|how it works?|the (process|tour)|our (process|story|work|team|approach|values?)|why (us|choose|we)|pricing|plans?|faq|questions?|testimonials?|reviews?|trusted by|as seen in|what we do|about( us)?|services?|solutions?|use cases?|get started|contact|team|work|projects?|gallery|blog|news|resources?|examples?|overview)$/i;

function capsRatio(s) {
  const letters = s.replace(/[^A-Za-z]/g, '');
  if (!letters) return 0;
  return (letters.match(/[A-Z]/g) || []).length / letters.length;
}

function eyebrowHeadingBearing(ctx, B, aPx) {
  if (/^h[1-6]$/.test(B.name)) return true;
  if (/<h[1-6][\s>]/i.test(B.html)) return true;

  const cls = getAttr(B.open, 'class') || '';
  if (!/__(title|display|head(line)?|h\d)\b|hero__|masthead|wordmark/i.test(cls)) return false;
  const bPx = fontPxOf(ctx, styleFor(ctx, cls, B.name));
  return bPx != null && aPx != null && bPx >= 1.5 * aPx;
}

function eyebrowHit(ctx, A, B, inOrderedList) {
  if (EYEBROW_SKIP_TAGS.test(A.name)) return null;
  if (/(^|\s)for\s*=/i.test(A.open)) return null;
  if (/role\s*=\s*["']status|aria-live|aria-current|aria-hidden\s*=\s*["']true/i.test(A.open)) return null;
  const inner = A.html.slice(A.open.length);
  if (EYEBROW_BLOCKY.test(inner) || /<br\b/i.test(inner)) return null;
  if (/<time\b[^>]*\sdatetime\s*=/i.test(A.html)) return null;
  if (/<img\b[^>]*\salt\s*=\s*["'][^"']+/i.test(A.html)) return null;

  const ownHref = A.name === 'a' ? getAttr(A.open, 'href') : null;
  if (ownHref && !/^#?$/.test(ownHref.trim())) return null;
  const innerHref = /<a\b[^>]*\shref\s*=\s*["']([^"']*)["']/i.exec(inner);
  if (innerHref && !/^#?$/.test(innerHref[1].trim())) return null;

  const text = plainText(A.html);
  if (!text) return null;
  const words = text.split(/[\s·/|\u2014\u2013]+/).filter(Boolean);
  if (words.length > 7 || text.length > 56) return null;
  if (/[\w/-]+\.[a-z]{1,4}$/i.test(text)) return null;

  if (/^[\d.,]+\s*(?:[%°+]|[a-z]{1,3})$/i.test(text)) return null;
  const stripped = text.replace(/^\s*(?:no\.?\s*)?\d{1,3}(?:\s*[·./\u2014\u2013-]\s*|\s+|$)/i, '').trim();
  if ((stripped.match(/\d/g) || []).length >= 2) return null;

  if (inOrderedList && stripped && !EYEBROW_ANNOUNCE.test(stripped)) return null;

  const cls = getAttr(A.open, 'class') || '';
  const aDecls = styleFor(ctx, cls, A.name);

  const pos = declValue(ctx, aDecls, 'position');
  if (pos && /absolute|fixed/.test(pos)) return null;
  const aPx = fontPxOf(ctx, aDecls);
  if (!eyebrowHeadingBearing(ctx, B, aPx)) return null;

  if (EYEBROW_CLASS.test(cls)) return { text };
  let signals = 0;
  const tt = declValue(ctx, aDecls, 'text-transform');
  if ((tt && /uppercase/.test(tt)) || (capsRatio(text) >= 0.6 && /[A-Z]/.test(text))) signals++;
  const tr = trackingEmOf(ctx, aDecls, aPx || 16);
  if (tr != null && tr >= 0.04) signals++;
  if (aPx != null && aPx <= 15) signals++;
  const ff = declValue(ctx, aDecls, 'font-family');
  if (ff && /mono|--font-label/i.test(ff)) signals++;
  const fv = declValue(ctx, aDecls, 'font-variant-caps');
  if (fv && /small-caps/.test(fv)) signals++;
  if (signals >= 2) return { text };
  if (EYEBROW_ANNOUNCE.test(stripped)) return { text };
  return null;
}

function check54(ctx) {
  for (const doc of ctx.docs) {
    const anc = ancestorMap(doc);
    for (let i = 0; i < doc.tags.length; i++) {
      const t = doc.tags[i];
      if (t.close || t.selfClosing || !EYEBROW_CONTAINER.test(t.name)) continue;
      const ancestors = anc.get(i) || [];
      if (ancestors.some((n) => EYEBROW_ANCESTOR_SKIP.test(n))) continue;
      const inOl = ancestors.includes('ol') || t.name === 'li';
      const kids = directChildren(doc, i);
      for (let k = 0; k < kids.length - 1; k++) {
        const A = kids[k];
        let B = null;
        for (let j = k + 1; j < Math.min(kids.length, k + 3); j++) {
          const c = kids[j];
          if (c.name === 'hr' || /aria-hidden\s*=\s*["']true/i.test(c.open)) continue;
          B = c; break;
        }
        if (!B) continue;
        const hit = eyebrowHit(ctx, A, B, inOl);
        if (hit) {
          report(54, 'FAIL', doc.file, doc.tags[A.idx]?.line || t.line,
            `eyebrow "${trunc(hit.text, 32)}" before <${B.name}>`,
            'Cut it; the heading already says this (references/section-entry.md has twelve other openings)');
          break;
        }
      }
    }
  }
  check54Unheaded(ctx);
}

function check54Unheaded(ctx) {
  for (const doc of ctx.docs) {
    for (let i = 0; i < doc.tags.length; i++) {
      const t = doc.tags[i];
      if (t.close || t.selfClosing || !/^(section|article)$/.test(t.name)) continue;
      const labelledBy = getAttr(t.attrs, 'aria-labelledby');
      if (!labelledBy) continue;
      const body = innerOf(doc, i);
      if (!body || /<h[1-6][\s>]/i.test(body.inner)) continue;
      const idRe = new RegExp(`<([a-z][\\w-]*)\\b[^>]*\\sid\\s*=\\s*["']${labelledBy.split(/\s+/)[0]}["'][^>]*>`, 'i');
      const m = idRe.exec(body.inner);
      if (!m || /^h[1-6]$/i.test(m[1])) continue;
      report(54, 'WARN', doc.file, doc.lineOf(body.endPos - body.inner.length + m.index),
        `section labelled by <${m[1].toLowerCase()}> with no heading element`,
        'Promote it to <h2>; a label doing heading duty should be a heading');
    }
  }
}

function check55(ctx) {
  const bySel = mergedDeclsBySelector(ctx);
  for (const r of bySel) {
    const upper = r.decls.find((d) => d.prop === 'text-transform' && /uppercase/.test(d.value));
    if (!upper) continue;
    const displayish = HEADING_SEL.test(r.selector);
    const lhD = r.decls.find((d) => d.prop === 'line-height');
    if (!lhD) continue;
    const lh = parseFloat(resolveVars(lhD.value, ctx.tokens));
    if (Number.isNaN(lh) || lh >= 1.0) continue;
    const bigType = r.decls.some((d) => d.prop === 'font-size' && (pxOf(resolveVars(d.value, ctx.tokens)) ?? 0) >= 28);
    if (!displayish && !bigType) continue;
    const nowrap = r.decls.some((d) => d.prop === 'white-space' && /nowrap/.test(d.value));
    report(nowrap ? '55b' : '55a', 'FAIL', r.file, lhD.line, `uppercase + line-height ${lh} on ${r.selector} (cap collision)`, 'Line-height 1.0 minimum for caps heads');
  }
}

function check56(ctx) {
  const bySel = mergedDeclsBySelector(ctx);
  const sticky = [];
  for (const r of bySel) {
    const isSticky = r.decls.some((d) => d.prop === 'position' && /sticky/.test(d.value));
    const topZero = r.decls.some((d) => d.prop === 'top' && /^(0|0px|0rem|-1px)$/.test(resolveVars(d.value, ctx.tokens).trim()));
    if (isSticky && topZero) sticky.push(r);
  }
  if (sticky.length >= 2) {
    const sels = sticky.map((r) => r.selector).join(' + ');
    report(56, 'FAIL', sticky[1].file, sticky[1].line, `two sticky top:0 elements: ${trunc(sels, 52)}`, 'Offset the second sticky by banner height');
  }
}

function checkCopyTell(ctx) {
  for (const doc of ctx.docs) {
    const prose = maskedProse(doc);
    const m = /\w\s--\s\w|[\u2014\u2013]|&mdash;|&ndash;|&#8212;|&#8211;/.exec(prose);
    if (m) report(19, 'FAIL', doc.file, doc.lineOf(m.index), `dash "${m[0]}" in copy`, 'A comma, a colon, a full stop or parentheses; never a dash');
    const buzz = /\b(seamless(ly)?|robust|empower(s|ing)?|supercharge[sd]?|elevate[sd]?|effortless(ly)?|unlock(s|ing)?|next[- ]generation|world[- ]class|cutting[- ]edge|streamline[sd]?|revolutioni[sz]e[sd]?|game[- ]chang(er|ing)|enterprise[- ]grade|quietly (trusted|in use)|built for the modern|in today's)\b/i.exec(prose);
    if (buzz) report(19, 'FAIL', doc.file, doc.lineOf(buzz.index), `buzzword "${buzz[0]}"`, 'Say what the product does, in its own nouns');
    const cadence = prose.match(/(^|[.!?]\s+)(not|no)\s+[a-z][^.!?\n]{0,40}[.]\s+(just|only|a|an)?\s*[a-z][^.!?\n]{0,40}[.]/gi) || [];
    if (cadence.length >= 3) report(19, 'FAIL', doc.file, doc.lineOf(prose.indexOf(cadence[0].trim()) || 0), `rebuttal cadence repeated ${cadence.length} times ("${trunc(cadence[0].trim(), 40)}")`, 'Once is voice; three times is a tic');
  }
}

function monoIsMaterial(ctx) {
  const mono = (v) => v && /mono|code|courier|silkscreen|jetbrains|plex mono|geist mono|commit|fira code|space mono|dm mono|roboto mono|source code|ibm plex mono|press start|vt323|share tech/i.test(firstFamily(resolveVars(v, ctx.tokens)));
  return mono(ctx.tokens['--font-display']) || mono(ctx.tokens['--font-body']);
}

const HIDE_OK = /tooltip|popover|menu|dropdown|modal|dialog|toast|overlay|backdrop|sheet|drawer|panel|:hover|:focus|:not\(|::before|::after|\.is-|\[hidden|\[aria-hidden|sr-only|visually-hidden|skip|placeholder|::marker|\[data-slot/i;
function check62(ctx) {
  const hasStartingStyle = /@starting-style/i.test(ctx.allCss);
  const jsScoped = (sel) => /(^|[\s,])(html|body)?\.js\b|\[data-js|\.no-js|html\.has-js/i.test(sel);
  const animatedNames = new Map();
  for (const r of ctx.rules) if (r.keyframes) {
    const arr = animatedNames.get(r.keyframes) || [];
    arr.push(r); animatedNames.set(r.keyframes, arr);
  }
  const animatesVisible = (name) => (animatedNames.get(name) || []).some((r) => /to|100%/.test(r.selector) && r.decls.some((d) => d.prop === 'opacity' && parseFloat(d.value) === 1));
  const seen = new Set();
  for (const r of ctx.rules) {
    if (r.keyframes || r.media || r.selector === '@font-face') continue;
    const hidden = r.decls.find((d) => (d.prop === 'opacity' && parseFloat(resolveVars(d.value, ctx.tokens)) === 0) || (d.prop === 'visibility' && /hidden/.test(d.value)));
    if (!hidden) continue;
    if (HIDE_OK.test(r.selector) || jsScoped(r.selector) || hasStartingStyle) continue;
    const revealish = /reveal|fade|animate|aos|in-view|inview|appear|enter|rise|slide|stagger|observe|lazy/i.test(r.selector) || r.decls.some((d) => d.prop === 'transform' && /translate|scale/.test(d.value));
    if (!revealish) continue;
    const anim = r.decls.find((d) => d.prop === 'animation' || d.prop === 'animation-name');
    const animName = anim ? anim.value.split(/\s+/).find((w) => animatedNames.has(w)) : null;
    if (animName && animatesVisible(animName)) continue;
    const key = r.selector;
    if (seen.has(key)) continue; seen.add(key);
    report(62, 'FAIL', r.file, hidden.line, `${r.selector} is hidden at rest (${hidden.prop}: ${hidden.value}) and depends on a script to appear`, 'Visible by default: scope the hidden state under a .js class the script adds, or animate from visible with @starting-style');
  }
}

const TEXT_TAGS = new Set(['p', 'span', 'li', 'small', 'a', 'div', 'figcaption', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'time', 'dd', 'dt', 'cite', 'strong', 'em', 'b', 'label', 'button', 'summary']);
function check63(ctx) {
  for (const doc of ctx.docs) {
    const dotLines = new Set(); const arrowLines = new Set(); let dotCount = 0;
    for (let i = 0; i < doc.tags.length; i++) {
      const t = doc.tags[i];
      if (t.close || t.selfClosing || !TEXT_TAGS.has(t.name)) continue;
      const cls = getAttr(t.attrs, 'class') || '';
      if (/marquee|ticker|tape|crawl/i.test(cls)) continue;
      const inner = innerOf(doc, i);
      if (!inner) continue;
      if (/<(p|div|li|section|article|ul|ol|table)\b/i.test(inner.inner)) continue;
      const text = plainText(inner.inner);
      if (!text) continue;
      const dots = (text.match(/\s[·•]\s/g) || []).length;
      if (dots >= 2 && !dotLines.has(t.line)) { dotLines.add(t.line); report(63, 'FAIL', doc.file, t.line, `middle-dot meta string "${trunc(text, 50)}"`, 'Line breaks, columns or hairlines; one dot in a byline at most'); }
      if ((t.name === 'a' || t.name === 'button') && /(\u2192|->|\u203a|\u00bb|\u27f6)\s*$/.test(text) && !arrowLines.has(t.line)) { arrowLines.add(t.line); report(63, 'FAIL', doc.file, t.line, `arrow glued to the label "${trunc(text, 40)}"`, 'A verb as the label; the link already says it goes somewhere'); }
      if (/^[A-Z]{3,}\s+-\s+\S/.test(text) && text.length < 60) report(63, 'FAIL', doc.file, t.line, `WORD - fragment label "${trunc(text, 40)}"`, 'Say the thing as a sentence or a heading');
    }
    for (let i = 0; i < doc.tags.length; i++) {
      const t = doc.tags[i];
      if (t.close || !/^(span|i|b|em|s)$/.test(t.name)) continue;
      const cls = getAttr(t.attrs, 'class') || '';
      if (!/(^|\s)(dot|status-dot|indicator|bullet|pip|blip)(\s|$|__|-)/i.test(cls)) continue;
      if (/aria-live|role\s*=\s*"status"/i.test(t.attrs)) continue;
      const inner = innerOf(doc, i);
      if (inner && plainText(inner.inner)) continue;
      dotCount++;
      if (dotCount === 3) report(63, 'FAIL', doc.file, t.line, `decorative status dots (${cls.trim()}) repeated across the page`, 'Delete them; a dot means live state, and only where it is one');
    }
  }
}

function check64(ctx) {
  if (monoIsMaterial(ctx)) return;
  const monoFam = (v) => /mono|courier|jetbrains|plex mono|geist mono|commit|fira code|space mono|dm mono|roboto mono|source code|silkscreen/i.test(firstFamily(resolveVars(v, ctx.tokens)));
  const LABELISH = /label|caption|meta|eyebrow|kicker|tag\b|badge|chip|small|folio|footnote|legend|\bth\b|thead|figcaption|overline|dateline|byline|credit|note\b/i;
  const DATAISH = /code|pre\b|kbd|samp|num|figure|stat|price|value|data|tabular|counter|timer|clock|coord|amount|total|score|version|hash|\bid\b|sku/i;
  const seen = new Set();
  for (const r of ctx.rules) {
    if (r.keyframes || r.selector === '@font-face' || isTokenRule(r)) continue;
    if (!LABELISH.test(r.selector) || DATAISH.test(r.selector)) continue;
    const fam = r.decls.find((d) => d.prop === 'font-family' || (d.prop === 'font' && /var\(--font|mono/i.test(d.value)));
    if (!fam) continue;
    const raw = fam.prop === 'font' ? (/var\(--font-[\w-]+\)/.exec(fam.value) || [fam.value])[0] : fam.value;
    if (!monoFam(raw)) continue;
    const key = baseSelector(r.selector);
    if (seen.has(key)) continue; seen.add(key);
    report(64, 'FAIL', r.file, fam.line, `monospace label voice on ${r.selector}`, 'Labels in the body face, a step smaller, sentence case; mono only for code and figures');
  }
}

function check65(ctx) {
  const paper = parseColor(resolveVars(ctx.tokens['--color-paper'] || '', ctx.tokens));
  const accent = parseColor(resolveVars(ctx.tokens['--color-accent'] || '', ctx.tokens));
  if (!paper || !accent) return;
  const p = paper.okl || srgbToOklch(paper); const a = accent.okl || srgbToOklch(accent);
  const cream = p.L >= 0.9 && p.C >= 0.006 && p.H >= 55 && p.H <= 105;
  const clay = a.C >= 0.08 && a.H >= 15 && a.H <= 55;
  const disp = firstFamily(resolveVars(ctx.tokens['--font-display'] || '', ctx.tokens));
  const hcSerif = /bodoni|didot|didone|playfair|fraunces|instrument serif|cormorant|dm serif|libre caslon display|abril|prata|gloock|newsreader|editorial new|gt sectra|canela|freight/i.test(disp);
  if (cream && clay && hcSerif) report(65, 'FAIL', ctx.cssFiles[0]?.file || ctx.docs[0]?.file, 1, `the named look: cream paper (L ${Math.round(p.L * 100)}%, hue ${Math.round(p.H)}) + ${disp} + a clay accent (hue ${Math.round(a.H)})`, 'Move one axis, the accent first; or stamp the theme as asked for by name');
}

function checkF15(ctx) {
  const widths = new Map();
  for (const r of ctx.rules) {
    if (r.keyframes || r.media || !/container|wrap|inner|shell|content|section|page|main/i.test(r.selector)) continue;
    for (const d of r.decls) if (d.prop === 'max-width') { const px = maxPxIn(resolveVars(d.value, ctx.tokens)); if (px && px >= 900) widths.set(px, r.selector); }
  }
  if (widths.size > 2) report('F15', 'WARN', ctx.cssFiles[0]?.file || ctx.docs[0]?.file, 1, `${widths.size} container widths on one page (${[...widths.keys()].join(', ')}px)`, 'One container width, applied by the same two-element pattern in every section');
  const gaps = new Map();
  for (const r of ctx.rules) {
    if (r.keyframes || r.media) continue;
    const cols = r.decls.find((d) => d.prop === 'grid-template-columns' && /\s/.test(d.value.trim()) && !/^repeat\(\s*auto/.test(d.value.trim()));
    if (!cols) continue;
    const gap = r.decls.find((d) => /^(gap|column-gap)$/.test(d.prop));
    if (gap) { const v = resolveVars(gap.value, ctx.tokens).split(/\s+/).pop(); const px = maxPxIn(v); if (px != null && px >= 16) gaps.set(v, r.selector); }
  }
  if (gaps.size > 2) report('F15', 'WARN', ctx.cssFiles[0]?.file || ctx.docs[0]?.file, 1, `${gaps.size} different column gaps across multi-column sections (${[...gaps.keys()].join(', ')})`, 'One column gap for every multi-column section');
}

function checkF16(ctx) {
  if (ctx.tokensOnly || !ctx.tokens['--color-accent']) return;
  const missing = [];
  if (!/::selection/.test(ctx.allCss)) missing.push('::selection');
  if (!/scrollbar-color|::-webkit-scrollbar/.test(ctx.allCss)) missing.push('scrollbar-color');
  const hasInputs = ctx.docs.some((d) => /<(input|textarea)\b/i.test(d.src));
  if (hasInputs && !/caret-color/.test(ctx.allCss)) missing.push('caret-color');
  if (missing.length) report('F16', 'WARN', ctx.cssFiles[0]?.file || ctx.docs[0]?.file, 1, `browser surfaces unthemed: ${missing.join(', ')}`, 'Theme the parts you did not draw from the palette');
}

function maskedProse(doc) {
  if (doc._prose == null) {
    const pad = (m) => m.replace(/[^\n]/g, ' ');
    doc._prose = doc.src
      .replace(/<(script|style|pre|code|kbd|samp|textarea)\b[^>]*>[\s\S]*?<\/\1>/gi, pad)
      .replace(/<!--[\s\S]*?-->/g, pad)
      .replace(/<[^>]*>/g, pad);
  }
  return doc._prose;
}

function maxPxIn(value) {
  let best = null;
  for (const m of String(value).matchAll(/(-?\d+(?:\.\d+)?)(px|rem|em)/g)) {
    const px = m[2] === 'px' ? parseFloat(m[1]) : parseFloat(m[1]) * 16;
    if (best == null || px > best) best = px;
  }
  return best;
}

function baseSelector(sel) {
  return sel.replace(/::?[a-z-]+(\([^)]*\))?/gi, '').replace(/\s+/g, ' ').trim();
}

function checkF1(ctx) {
  const dq = /(?:"|&quot;|&#0?34;)(?=[A-Za-z])|[A-Za-z](?:"|&quot;|&#0?34;)/g;
  const ap = /[A-Za-z](?:'|&#0?39;|&apos;)(?=[A-Za-z])/g;
  for (const doc of ctx.docs) {
    const prose = maskedProse(doc);
    const hits = [...prose.matchAll(dq), ...prose.matchAll(ap)].sort((a, b) => a.index - b.index);
    if (!hits.length) continue;
    const around = prose.slice(Math.max(0, hits[0].index - 16), hits[0].index + 16).replace(/\s+/g, ' ').trim();
    report('F1', 'WARN', doc.file, doc.lineOf(hits[0].index),
      `straight quote in prose x${hits.length} (first: ${trunc(around, 40)})`, 'Use typographic quotes: \u201C \u201D \u2019');
  }
}

function checkF2(ctx) {
  for (const doc of ctx.docs) {
    const prose = maskedProse(doc);
    const hits = [...prose.matchAll(/\.{3,}/g)];
    if (!hits.length) continue;
    report('F2', 'WARN', doc.file, doc.lineOf(hits[0].index),
      `three-period ellipsis in prose x${hits.length}`, 'Use a true ellipsis character (\u2026)');
  }
}

function checkF3(ctx) {
  const H12 = /(^|[\s,>+~(])h[12]\b/i;
  const targets = [];
  let satisfied = false;
  for (const r of mergedDeclsBySelector(ctx)) {
    const isH12 = H12.test(r.selector);
    const isDisplayClass = HEADING_SEL.test(r.selector)
      && r.decls.some((d) => d.prop === 'font-size' && (maxPxIn(resolveVars(d.value, ctx.tokens)) ?? 0) >= 40);
    if (!isH12 && !isDisplayClass) continue;
    targets.push(r);
    if (r.decls.some((d) => /^text-wrap(-style)?$/.test(d.prop) && /balance|pretty/.test(d.value))) satisfied = true;
  }
  if (targets.length && !satisfied) {
    report('F3', 'WARN', targets[0].file, targets[0].line,
      `no text-wrap: balance on any display head (${targets.length} head rule(s), e.g. ${trunc(targets[0].selector, 32)})`,
      'Add text-wrap: balance to h1/h2-level heads');
  }
}

function checkF4(ctx) {
  const BTN = /\b(btn|button|cta)\b|__(btn|button|cta)\b/i;
  const filled = new Map();
  for (const r of mergedDeclsBySelector(ctx)) {
    if (isTokenRule(r) || /:hover|:active|:focus|:disabled|\.is-|\[disabled/i.test(r.selector)) continue;
    const first = baseSelector(r.selector.split(',')[0]);
    if (!BTN.test(first)) continue;
    for (const d of r.decls) {
      if (!/^background(-color)?$/.test(d.prop)) continue;
      const rv = resolveVars(d.value, ctx.tokens);
      if (/transparent|none/i.test(rv)) continue;
      if (/var\(\s*--color-(accent|ink)\b/.test(d.value) && !filled.has(first)) filled.set(first, { r, d });
    }
  }
  if (filled.size >= 2) {
    const sels = [...filled.keys()];
    const second = filled.get(sels[1]);
    report('F4', 'WARN', second.r.file, second.d.line,
      `${filled.size} filled primary-button recipes: ${trunc(sels.join(' + '), 52)}`,
      'One filled primary per page; demote the rest to outline/quiet variants');
  }
}

function checkF5(ctx) {
  for (const r of mergedDeclsBySelector(ctx)) {
    if (isTokenRule(r) || !/icon|\bico\b/i.test(r.selector)) continue;
    const radius = r.decls.find((d) => d.prop === 'border-radius');
    if (!radius) continue;
    const rv = resolveVars(radius.value, ctx.tokens);
    const pct = /(\d+(?:\.\d+)?)%/.exec(rv);
    const round = (pct && parseFloat(pct[1]) >= 50) || ((maxPxIn(rv) ?? 0) >= 999);
    if (!round) continue;
    const bg = r.decls.find((d) => /^background(-color)?$/.test(d.prop)
      && !/^(none|transparent)$/i.test(resolveVars(d.value, ctx.tokens).trim()));
    if (!bg) continue;
    const small = r.decls.some((d) => (d.prop === 'width' || d.prop === 'height')
      && (pxOf(resolveVars(d.value, ctx.tokens)) ?? 999) <= 64);
    if (small) {
      report('F5', 'WARN', r.file, bg.line, `icon-in-coloured-circle coin: ${trunc(r.selector, 40)}`,
        'Drop the tinted coin; set the icon at text size in currentColor');
    }
  }
}

function checkF6(ctx) {
  const NUM_SEL = /\b(stat|price|table|figure|count|num)[\w-]*/i;
  const hasTnum = (r) => r.decls.some((d) => d.prop === 'font-variant-numeric'
    || (d.prop === 'font-feature-settings' && /tnum/.test(d.value)));
  if (ctx.rules.some((r) => /^(html|body|:root)\b/i.test(r.selector.trim()) && hasTnum(r))) return;
  const bySel = mergedDeclsBySelector(ctx);
  const covered = new Set(bySel.filter(hasTnum).map((r) => baseSelector(r.selector)));
  const warned = new Set();
  for (const r of bySel) {
    if (isTokenRule(r) || !NUM_SEL.test(r.selector)) continue;
    const base = baseSelector(r.selector);
    if (warned.has(base) || covered.has(base)) continue;
    const fs2 = r.decls.find((d) => d.prop === 'font-size');
    if (!fs2 || (maxPxIn(resolveVars(fs2.value, ctx.tokens)) ?? 0) < 24) continue;
    warned.add(base);
    report('F6', 'WARN', r.file, fs2.line,
      `numeric selector ${trunc(base, 36)} at display size without tabular figures`,
      'Add font-variant-numeric: tabular-nums');
  }
}

function checkF7(ctx) {
  const byKey = new Map();
  for (const r of mergedDeclsBySelector(ctx)) {
    if (isTokenRule(r) || /::(before|after)/.test(r.selector)) continue;
    const get = (re) => {
      const d = r.decls.filter((x) => re.test(x.prop)).pop();
      return d ? resolveVars(d.value, ctx.tokens).replace(/\s+/g, ' ').trim() : '';
    };
    const border = get(/^border$/)
      || [get(/^border-width$/), get(/^border-style$/), get(/^border-color$/)].filter(Boolean).join(' ');
    const radius = get(/^border-radius$/);
    const surface = get(/^background(-color)?$/) || '';
    const shadow = get(/^box-shadow$/);
    if (!radius || (!border && !surface && !shadow)) continue;
    const key = [border, radius, surface, shadow].join(' | ');
    if (!byKey.has(key)) byKey.set(key, { sels: new Set(), r });
    for (const part of r.selector.split(',')) byKey.get(key).sels.add(baseSelector(part));
  }
  for (const v of byKey.values()) {
    if (v.sels.size >= 6) {
      report('F7', 'WARN', v.r.file, v.r.line,
        `same container recipe on ${v.sels.size} selectors (${trunc([...v.sels].slice(0, 4).join(', '), 48)}...)`,
        'Vary weight, radius, or fill by role; not every box is the same box');
    }
  }
}

function checkF8(ctx) {
  const famOf = (sel) => {
    const m = /\.([a-z][\w-]*)/i.exec(sel) || /(^|[\s>+~])([a-z][\w-]*)/i.exec(sel);
    const name = m ? (m[1] || m[2]) : sel;
    return name.split('__')[0].split('--')[0].toLowerCase();
  };
  const NAVISH = /^(nav|header|topbar|masthead|banner)$/;
  const timeline = new Map(), sticky = new Map(), animated = new Set();
  for (const r of ctx.rules) {
    if (r.keyframes || isTokenRule(r)) continue;
    for (const d of r.decls) {
      if (d.prop === 'animation-timeline' && !/^(none|auto)$/i.test(d.value.trim())
        && !timeline.has(famOf(r.selector))) timeline.set(famOf(r.selector), { r, d });
      if (d.prop === 'animation' || d.prop === 'animation-name') animated.add(famOf(r.selector));
      if (d.prop === 'position' && /sticky/i.test(d.value)) sticky.set(famOf(r.selector), { r, d });
    }
  }
  const families = new Map(timeline);
  for (const [fam, v] of sticky) {
    if (!families.has(fam) && animated.has(fam) && !NAVISH.test(fam)) families.set(fam, v);
  }
  if (families.size > 1) {
    const names = [...families.keys()];
    const second = families.get(names[1]);
    report('F8', 'WARN', second.r.file, second.d.line,
      `${families.size} scroll-choreography patterns on one page (${trunc(names.join(', '), 44)})`,
      'Budget is one scroll pattern per page (scroll-choreography.md); cut the rest');
  }
}

function checkF9(ctx) {
  const FAKE = /(i\.pravatar\.cc|pravatar\.cc|api\.dicebear\.com|dicebear\.com|randomuser\.me|thispersondoesnotexist\.com|ui-avatars\.com)/i;
  const UNSPLASH = /https?:\/\/[^"'()\s]*unsplash\.com[^"'()\s]*/gi;
  const PERSONY = /person|face|portrait|people|headshot/i;
  const scan = (text, file, lineAt) => {
    const f = FAKE.exec(text);
    if (f) report('F9', 'FAIL', file, lineAt(f.index), `fake-human avatar service ${f[1]}`,
      'Use the Hallmark avatar kit or drop the face; a generated stranger is fabricated social proof');
    for (const m of text.matchAll(UNSPLASH)) {
      if (PERSONY.test(m[0])) report('F9', 'WARN', file, lineAt(m.index),
        `unsplash person-keyword URL ${trunc(m[0], 44)}`,
        'Faces as social proof need real people; keep unsplash for scenery and objects');
    }
  };
  for (const doc of ctx.docs) scan(doc.src, doc.file, (i) => doc.lineOf(i));
  for (const c of ctx.cssFiles) scan(c.raw, c.file, (i) => c.raw.slice(0, i).split('\n').length);
}

function fontSizePxOf(r, ctx) {
  const fs = r.decls.find((d) => d.prop === 'font-size');
  if (fs) return pxOf(resolveVars(fs.value, ctx.tokens));
  const f = r.decls.find((d) => d.prop === 'font');
  if (!f) return null;
  const m = /(?:^|\s)(\d+(?:\.\d+)?(?:px|rem|em))(?:\/[\d.]+(?:px|rem|em)?)?\s/.exec(resolveVars(f.value, ctx.tokens) + ' ');
  return m ? pxOf(m[1]) : null;
}

const LABEL67 = /label|caption|meta|eyebrow|kicker|tag\b|badge|chip|small|folio|footnote|legend|\bth\b|thead|figcaption|overline|dateline|byline|credit|note\b|\bnav\b|menu|link|pill|status|unit|smallcaps|count|stamp|placard/i;
const CONTROL67 = /btn|button|cta|\.sign\b|plate|control/i;
const EXEMPT67_NAME = /^(wordmark|marquee|ticker|logo|brand|abbr|logo-?(mark|type|text)|brand-?(mark|name|type))$/i;
const exemptName67 = (n) => !!n && EXEMPT67_NAME.test(n.split('--')[0].split('__').pop());
function exempt67(sel) {
  return sel.split(',').some((part) => {
    const comp = baseSelector(part).split(/[\s>+~]+/).filter(Boolean).pop() || '';
    const names = (comp.match(/\.[a-zA-Z_][\w-]*/g) || []).map((c) => c.slice(1));
    names.push((/^[a-zA-Z][\w-]*/.exec(comp) || [''])[0]);
    return names.some(exemptName67);
  });
}
function inherited67(bySel, sel, prop) {
  const base = baseSelector(sel);
  let best = null, bestLen = 0;
  for (const o of bySel) {
    if (/:hover|:focus|:active/.test(o.selector) || (o.media && /max-width/i.test(o.media))) continue;
    for (const part of o.selector.split(',')) {
      const ob = baseSelector(part);
      if (!ob || ob === base || ob.length <= bestLen || !base.startsWith(ob) || !/[\s>+~]/.test(base[ob.length] || '')) continue;
      const d = o.decls.filter((x) => x.prop === prop).pop();
      if (d) { best = d.value; bestLen = ob.length; }
    }
  }
  return best;
}
const isSmallCaps67 = (prop, v) => (/^font-variant(-caps)?$/.test(prop) && /\b(all-)?(small|petite)-caps\b/.test(v))
  || (prop === 'font-feature-settings' && /\b(smcp|c2sc)\b/.test(v));
function check67(ctx) {
  const bySel = mergedDeclsBySelector(ctx);
  const upperDisplay = bySel.some((r) => HEADING_SEL.test(r.selector) && !LABEL67.test(r.selector) && r.decls.some((d) => d.prop === 'text-transform' && /uppercase/.test(d.value)));
  const isUpper = (v) => v != null && /uppercase/.test(resolveVars(v, ctx.tokens));
  const seen = new Set();
  for (const r of bySel) {
    if (isTokenRule(r) || exempt67(r.selector) || /::first-letter\s*(,|$)/.test(r.selector)) continue;
    const ownTT = r.decls.filter((d) => d.prop === 'text-transform').pop();
    const ownUpper = ownTT ? isUpper(ownTT.value) : null;
    const ownSmallCaps = r.decls.some((d) => isSmallCaps67(d.prop, resolveVars(d.value, ctx.tokens)));
    const px = fontSizePxOf(r, ctx);
    const ownEm = trackingEmOf(ctx, r.decls, px || 16);
    const ownSignal = ownUpper === true || ownSmallCaps || (ownEm != null && ownEm > 0.03);
    if (!ownSignal) continue;
    const upper = ownUpper != null ? ownUpper : isUpper(inherited67(bySel, r.selector, 'text-transform'));
    const smallCaps = ownSmallCaps || ['font-variant', 'font-variant-caps', 'font-feature-settings'].some((prop) => {
      const v = inherited67(bySel, r.selector, prop);
      return v != null && isSmallCaps67(prop, resolveVars(v, ctx.tokens));
    });
    let em = ownEm;
    if (em == null) {
      const v = inherited67(bySel, r.selector, 'letter-spacing');
      if (v != null) em = trackingEmOf(ctx, [{ prop: 'letter-spacing', value: v }], px || 16);
    }
    const tracked = em != null && em > 0.03;
    const labelish = LABEL67.test(r.selector);
    const control = CONTROL67.test(r.selector);
    const heading = HEADING_SEL.test(r.selector) && !labelish;
    if (heading && !control) continue;
    const key = baseSelector(r.selector);
    if (seen.has(key)) continue;
    const small = px != null && px < 15;
    if (control && !labelish) {
      if (!upper && !smallCaps) { if (!(tracked && small)) continue; }
      else if (upperDisplay && (em == null || em <= 0.045)) continue;
      seen.add(key);
      report(67, 'FAIL', r.file, r.line, upperDisplay ? `${r.selector}: uppercase control tracked ${em}em` : `${r.selector}: uppercase control on a page whose display is not uppercase`, 'Controls follow the display voice: sentence case here, or tracking 0.04em at most where the display itself is uppercase');
      continue;
    }
    const caps = upper || smallCaps;
    if ((caps && (labelish || smallCaps || tracked || small)) || (tracked && (labelish || small))) {
      seen.add(key);
      const what = smallCaps ? 'small caps' : upper ? 'uppercase' : 'letter-spaced';
      report(67, 'FAIL', r.file, r.line, `${r.selector}: ${what}${tracked ? ` tracked ${em}em` : ''}${px != null ? ` at ${Math.round(px)}px` : ''} in a label role`, 'Labels, captions, table heads, nav links and meta are the body face, a step smaller, sentence case, untracked');
    }
  }
  check67Html(ctx);
}

const CAPS_TAGS = /^(p|span|small|a|li|div|figcaption|td|th|dt|dd|label|time|cite|strong|b|em|button|summary)$/;
function check67Html(ctx) {
  for (const doc of ctx.docs) {
    const anc = ancestorMap(doc);
    const seen = new Set();
    for (let i = 0; i < doc.tags.length; i++) {
      const t = doc.tags[i];
      if (t.close || t.selfClosing || !CAPS_TAGS.test(t.name)) continue;
      const cls = getAttr(t.attrs, 'class') || '';
      if (cls.split(/\s+/).some(exemptName67)) continue;
      if ((anc.get(i) || []).some((n) => /^(svg|pre|code|abbr|kbd|samp)$/.test(n))) continue;
      const inner = innerOf(doc, i);
      if (!inner || /<(p|div|ul|ol|h[1-6]|table|section|article|svg|img|abbr|code|kbd)\b/i.test(inner.inner)) continue;
      const text = plainText(inner.inner);
      const letters = text.replace(/[^A-Za-z]/g, '');
      if (letters.length < 5 || capsRatio(text) < 0.95 || /^[A-Z]{2,5}$/.test(text)) continue;
      const decls = styleFor(ctx, cls, t.name);
      const px = fontPxOf(ctx, decls);
      const em = trackingEmOf(ctx, decls, px || 16);
      const tracked = em != null && em > 0.03;
      if (!((px != null && px <= 15) || tracked)) continue;
      const key = cls || t.name;
      if (seen.has(key)) continue;
      seen.add(key);
      report(67, 'FAIL', doc.file, t.line, `"${trunc(text, 32)}" typed in capitals${px != null ? ` at ${Math.round(px)}px` : ''}${tracked ? ` tracked ${em}em` : ''} (<${t.name}${cls ? ` class="${trunc(cls, 24)}"` : ''}>)`, 'Sentence case in the body face; capitals survive only as a wordmark or as the display voice');
    }
  }
}

const ACCENT38 = /(?:^|[\s,])((?:h[1-3]|\.display|\.headline|\.title|[.\w-]*__(?:title|display|headline))[^\s,>+~]*)\s*(?:>|\s)\s*(em|i|b|strong|span|mark|\.[\w-]+)(?::nth-child\([^)]*\))?(?:::?[\w-]+)?\s*$/i;
const INHERITED38 = /^(inherit|currentcolor|unset|initial|normal)$/i;
function accentedHeads(ctx) {
  if (ctx._acc38) return ctx._acc38;
  const out = [];
  const seen = new Set();
  for (const r of ctx.rules) {
    if (r.keyframes || isTokenRule(r)) continue;
    const m = ACCENT38.exec(r.selector);
    if (!m) continue;
    const marked = r.decls.some((d) =>
      (/^(color|background|background-color|-webkit-text-stroke|font-weight|text-decoration|text-decoration-color|border-bottom|box-shadow)$/.test(d.prop) && !INHERITED38.test(d.value.trim()))
      || (d.prop === 'font-style' && !INHERITED38.test(d.value.trim())));
    if (!marked || seen.has(r.selector)) continue;
    seen.add(r.selector);
    out.push({ r, head: m[1] });
  }
  ctx._acc38 = out;
  return out;
}
function accentedWordInHero(ctx) {
  const heads = accentedHeads(ctx);
  if (!heads.length) return true;
  const sels = new Set(heads.map((h) => baseSelector(h.r.selector)));
  if (sels.size > 1) return `the accented word sits on ${sels.size} selectors (${trunc([...sels].join(', '), 48)}); the signature appears once`;
  const { r, head } = heads[0];
  if (/hero/i.test(r.selector) || /^h1\b/i.test(head)) return true;
  const cls = (/\.([\w-]+)/.exec(head) || [])[1];
  if (!cls || !ctx.docs.length) return true;
  let count = 0, aboveFirstH2 = false;
  for (const doc of ctx.docs) {
    let h2Seen = false;
    for (const t of doc.tags) {
      if (t.close) continue;
      if (t.name === 'h2') h2Seen = true;
      if ((getAttr(t.attrs, 'class') || '').split(/\s+/).includes(cls)) { count++; if (!h2Seen) aboveFirstH2 = true; }
    }
  }
  if (count === 1 && aboveFirstH2) return true;
  return count !== 1 ? `.${cls} appears ${count} times in the markup; the signature appears once, in the hero` : `.${cls} sits below the first h2, outside the hero`;
}
function check38c(ctx) {
  for (const { r } of accentedHeads(ctx)) {
    report('38iii', 'FAIL', r.file, r.line, `accented word inside a heading (${r.selector})`, 'Set the whole head one way: a line break, a second line at a second size, or the whole head in the accent. Guard: the theme names the coloured word as its signature and it appears once on the page, in the hero');
  }
}

function heroIndexOf(doc, h1Idx) {
  for (let i = h1Idx - 1; i >= 0; i--) {
    const t = doc.tags[i];
    if (t.close || !/^(section|header)$/.test(t.name)) continue;
    const inner = innerOf(doc, i);
    if (inner && inner.endPos > doc.tags[h1Idx].pos) return i;
  }
  return -1;
}
const wordsOf = (t) => plainText(t).split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));

const TELLS19 = [
  [/\bwhether you'?re\b/i, 'filler opener'],
  [/\bwe'?ve got you covered\b/i, 'cliche'],
  [/\bsay goodbye to\b/i, 'cliche'],
  [/\bno credit card required\b/i, 'template line'],
  [/\beverything you need to\b/i, 'cliche'],
  [/\ball in one place\b/i, 'cliche'],
  [/\blorem ipsum\b/i, 'placeholder text'],
  [/\ball rights reserved\b/i, 'template footer line'],
  [/\bmade with\s*(?:♥|❤|\u{1f9e1}|\u{1f49b}|\u{1f49a}|\u{1f499}|\u{1f49c}|\u{1f5a4}|\u{1f90d}|&hearts;|&#9829;|&#10084;|<3)/iu, 'made with a heart'],
];
function check19Tells(ctx) {
  for (const doc of ctx.docs) {
    const prose = maskedProse(doc);
    const lines = new Set();
    const tell = (idx, what, text) => {
      const line = doc.lineOf(idx);
      if (lines.has(line)) return;
      lines.add(line);
      report(19, 'FAIL', doc.file, line, `${what}: "${trunc(text, 40)}"`, 'Say what the product does, in its own nouns');
    };
    for (const [re, what] of TELLS19) {
      const m = re.exec(prose);
      if (m) tell(m.index, what, m[0]);
    }
    for (let i = 0; i < doc.tags.length; i++) {
      const t = doc.tags[i];
      if (t.close || !/^h[1-6]$/.test(t.name)) continue;
      const text = plainText(innerOf(doc, i)?.inner || '');
      if (/^Meet\s+[A-Z][\w-]*[.!]?$/.test(text)) tell(t.pos, 'the "Meet <Name>" heading', text);
      else if (/^[A-Z][a-z]+\.\s+[A-Z][a-z]+\.\s+[A-Z][a-z]+\.$/.test(text)) tell(t.pos, 'the three-word triad heading', text);
    }
  }
}

function check58Static(ctx) {
  for (const doc of ctx.docs) {
    const h1 = doc.tags.findIndex((t) => !t.close && t.name === 'h1');
    if (h1 >= 0) {
      const words = wordsOf(innerOf(doc, h1)?.inner || '');
      if (words.length > 7) report(58, 'WARN', doc.file, doc.tags[h1].line, `h1 runs ${words.length} words ("${trunc(words.join(' '), 40)}")`, 'Seven words or fewer, 50 characters or fewer');
      const heroIdx = heroIndexOf(doc, h1);
      const hero = heroIdx >= 0 ? innerOf(doc, heroIdx) : null;
      if (hero) {
        for (let i = h1 + 1; i < doc.tags.length && doc.tags[i].pos < hero.endPos; i++) {
          const t = doc.tags[i];
          if (t.close || t.name !== 'p') continue;
          const pw = wordsOf(innerOf(doc, i)?.inner || '');
          if (pw.length > 12) report(58, 'WARN', doc.file, t.line, `hero paragraph runs ${pw.length} words`, 'One sentence, twelve words or fewer');
          break;
        }
      }
    }
    const sections = doc.tags.filter((t) => !t.close && t.name === 'section').length;
    const fullPage = sections >= 5 || doc.tags.some((t) => !t.close && t.name === 'footer');
    if (!fullPage) continue;
    const total = doc.text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
    if (total < 250 || total > 450) report(58, 'WARN', doc.file, 1, `${total} visible words on the page (250 to 450 expected)`, total > 450 ? 'Cut copy: one idea per screen, sections become objects' : 'A page this short is a section; fill the slots or cut the sections');
  }
}

const SECOND_CTA = /^(learn more|see how it works|watch (the )?demo|get started|book a demo)$/i;
function check42TwoButton(ctx) {
  for (const doc of ctx.docs) {
    const h1 = doc.tags.findIndex((t) => !t.close && t.name === 'h1');
    if (h1 < 0) continue;
    const heroIdx = heroIndexOf(doc, h1);
    const hero = heroIdx >= 0 ? innerOf(doc, heroIdx) : null;
    if (!hero) continue;
    const anc = ancestorMap(doc);
    const controls = [];
    for (let i = heroIdx + 1; i < doc.tags.length && doc.tags[i].pos < hero.endPos; i++) {
      const t = doc.tags[i];
      if (t.close || t.selfClosing || !(t.name === 'button' || t.name === 'a')) continue;
      const cls = getAttr(t.attrs, 'class') || '';
      if (t.name === 'a' && !/btn|cta|button/i.test(cls)) continue;
      if ((anc.get(i) || []).includes('nav')) continue;
      controls.push({ t, cls, label: plainText(innerOf(doc, i)?.inner || '').trim() });
    }
    if (controls.length < 2 || !SECOND_CTA.test(controls[1].label)) continue;
    const decls = styleFor(ctx, controls[0].cls, controls[0].t.name);
    const bg = declValue(ctx, decls, 'background-color') || declValue(ctx, decls, 'background');
    if (bg && /^(none|transparent)$/i.test(bg.trim())) continue;
    report(42, 'WARN', doc.file, controls[1].t.line, `the two-button hero: "${trunc(controls[0].label, 20)}" then "${controls[1].label}"`, 'One action in the hero; the second button is the template speaking');
  }
}

const PLACEHOLDER_IMG = /placehold\.co|via\.placeholder\.com|source\.unsplash\.com\/random|dummyimage\.com/i;
function check47Placeholders(ctx) {
  for (const doc of ctx.docs) {
    const m = PLACEHOLDER_IMG.exec(doc.src);
    if (m) report('47c', 'WARN', doc.file, doc.lineOf(m.index), `placeholder image service ${m[0]}`, 'A labelled data-slot in the theme colours, or a real asset');
  }
  for (const c of ctx.cssFiles) {
    const m = PLACEHOLDER_IMG.exec(c.raw);
    if (m) report('47c', 'WARN', c.file, c.raw.slice(0, m.index).split('\n').length, `placeholder image service ${m[0]}`, 'A labelled data-slot in the theme colours, or a real asset');
  }
}

const TAILWIND_HEX = /#(0f172a|1e293b|6366f1|8b5cf6|3b82f6|f8fafc|64748b)\b/i;
function check65Tailwind(ctx) {
  for (const r of ctx.rules) {
    if (!isTokenRule(r) || r.selector === '@font-face') continue;
    for (const d of r.decls) {
      const m = TAILWIND_HEX.exec(d.value);
      if (m) report(65, 'WARN', r.file, d.line, `default Tailwind palette ${m[0]} on ${d.prop}`, 'Mix the colour for this page in OKLCH; a stock swatch is the AI look');
    }
  }
}

function splitTop(v) {
  const out = [];
  let depth = 0, cur = '';
  for (const ch of v) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { out.push(cur); cur = ''; } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}
const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|oklch\([^)]*\)|rgba?\([^)]*\)|hsla?\([^)]*\)|color-mix\((?:[^()]|\([^()]*\))*\)|\b(white|black|transparent)\b/i;
const lengthPx = (x) => (x === '0' ? 0 : pxOf(x));
function check29Glow(ctx) {
  const seen = new Set();
  const once = (key, file, line, ev, fix) => { if (seen.has(key)) return; seen.add(key); report(29, 'WARN', file, line, ev, fix); };
  for (const r of mergedDeclsBySelector(ctx)) {
    if (isTokenRule(r)) continue;
    const local = {};
    for (const d of r.decls) if (d.prop.startsWith('--')) local[d.prop] = d.value;
    const bf = r.decls.find((d) => /^(-webkit-)?backdrop-filter$/.test(d.prop) && /blur\(/i.test(d.value));
    if (bf) {
      const bgD = r.decls.filter((d) => /^background(-color)?$/.test(d.prop)).pop();
      const rv = bgD ? resolveVars(bgD.value, ctx.tokens, local).trim() : '';
      const c = parseColor(rv);
      const mixed = /color-mix\([^)]*\b(white|black|--color-(paper|ink))\b[^)]*\btransparent\b/i.test(rv);
      const nearWhite = c && c.r > 0.85 && c.g > 0.85 && c.b > 0.85;
      const nearBlack = c && c.r < 0.15 && c.g < 0.15 && c.b < 0.15;
      if ((c && c.alpha < 0.95 && (nearWhite || nearBlack)) || (!c && mixed)) {
        once('glass:' + r.selector, r.file, bf.line, `glass panel: backdrop-filter blur over a translucent ${nearBlack ? 'black' : 'white'} on ${trunc(r.selector, 36)}`, 'Solid or grained surface; elevation by lightness');
      }
    }
    for (const d of r.decls) {
      if (d.prop !== 'box-shadow') continue;
      for (const part of splitTop(resolveVars(d.value, ctx.tokens, local))) {
        const cm = COLOR_RE.exec(part);
        if (!cm) continue;
        const c = parseColor(cm[0]);
        if (!c || c.alpha <= 0.05) continue;
        const ok = c.okl || srgbToOklch(c);
        if (ok.C <= 0.04) continue;
        const lens = part.replace(cm[0], ' ').replace(/\binset\b/, ' ').trim().split(/\s+/).filter(Boolean).map(lengthPx);
        if (lens.length >= 3 && lens[0] === 0 && lens[1] === 0 && lens[2] != null && lens[2] > 20) {
          once('glow:' + r.selector, r.file, d.line, `chromatic zero-offset glow (blur ${Math.round(lens[2])}px) on ${trunc(r.selector, 36)}`, 'Shadows carry offset and blur in a neutral; colour is not depth');
          break;
        }
      }
    }
    if (/::(before|after)/.test(r.selector) && r.decls.some((d) => d.prop === 'position' && /absolute|fixed/.test(d.value))) {
      const f = r.decls.find((d) => d.prop === 'filter' && /blur\(\s*(\d+(?:\.\d+)?)px/i.test(d.value));
      const n = f ? parseFloat(/blur\(\s*(\d+(?:\.\d+)?)px/i.exec(f.value)[1]) : 0;
      if (n > 40) once('orb:' + r.selector, r.file, f.line, `blurred orb: filter blur(${n}px) on the positioned ${trunc(r.selector, 36)}`, 'Delete the wash; a surface is paper or ground, not a light show');
    }
  }
}

function check11Lift(ctx) {
  const lifts = new Map();
  for (const r of mergedDeclsBySelector(ctx)) {
    if (!/:hover/.test(r.selector)) continue;
    const t = r.decls.find((d) => (d.prop === 'transform' && /translateY\(\s*-\s*\d/.test(resolveVars(d.value, ctx.tokens))) || (d.prop === 'translate' && /^0(px)?\s+-\d/.test(resolveVars(d.value, ctx.tokens))));
    const sh = r.decls.find((d) => d.prop === 'box-shadow');
    if (t && sh) for (const part of r.selector.split(',')) lifts.set(baseSelector(part), { r, t });
  }
  if (lifts.size < 3) return;
  const third = [...lifts.values()][2];
  report(11, 'WARN', third.r.file, third.t.line, `the hover lift (translateY plus shadow) on ${lifts.size} selectors (${trunc([...lifts.keys()].slice(0, 3).join(', '), 44)})`, 'One signal per element; the same lift on every card is the template');
}

function check15Fade(ctx) {
  const focusProps = new Map();
  for (const r of ctx.rules) {
    if (!/:focus-visible/.test(r.selector)) continue;
    for (const part of r.selector.split(',')) {
      if (!/:focus-visible/.test(part)) continue;
      const base = baseSelector(part).replace(/^\*$/, '');
      const set = focusProps.get(base) || new Set();
      for (const d of r.decls) {
        if (d.prop === 'box-shadow') set.add('box-shadow');
        if (/^outline/.test(d.prop)) set.add('outline');
      }
      focusProps.set(base, set);
    }
  }
  if (!focusProps.size) return;
  const global = focusProps.get('') || new Set();
  for (const r of ctx.rules) {
    if (r.keyframes || /:focus|:hover|:active/.test(r.selector)) continue;
    for (const d of r.decls) {
      if (d.prop !== 'transition' && d.prop !== 'transition-property') continue;
      for (const prop of ['box-shadow', 'outline']) {
        if (!new RegExp(`(^|[\\s,])${prop}(-[a-z]+)?\\b`).test(d.value)) continue;
        const own = r.selector.split(',').some((p) => (focusProps.get(baseSelector(p)) || new Set()).has(prop));
        if (global.has(prop) || own) {
          report(15, 'FAIL', r.file, d.line, `${trunc(r.selector, 32)} transitions ${prop} while :focus-visible sets it (the ring fades in)`, 'Rings appear instantly: transition the hover property only, or draw the ring with a property that is not transitioned');
          break;
        }
      }
    }
  }
}

function checkF7Pills(ctx) {
  const CONTROLISH = /btn|button|cta|input|select|textarea|switch|toggle|control|chip|pill/i;
  const sels = new Set();
  let where = null;
  for (const r of mergedDeclsBySelector(ctx)) {
    if (isTokenRule(r)) continue;
    const d = r.decls.filter((x) => x.prop === 'border-radius').pop();
    if (!d) continue;
    if (!/^(9999px|999px|50rem)$/.test(resolveVars(d.value, ctx.tokens).trim())) continue;
    for (const part of r.selector.split(',')) {
      const b = baseSelector(part);
      if (!b || CONTROLISH.test(b)) continue;
      sels.add(b);
      where = where || { r, d };
    }
  }
  if (sels.size >= 5) report('F7', 'WARN', where.r.file, where.d.line, `the pill radius on ${sels.size} non-control selectors (${trunc([...sels].slice(0, 4).join(', '), 48)})`, 'Pills are for controls; boxes and media take the card radius');
}

const CHECKS = [check1, check2, check3, check3Stripe, check4, check6a, check7, check10, check10Motion, check11,
  check12, check15, check17, check18, check19, check20, check22, check23, check24, check24a,
  check25, check26, check27, check28, check30, check33, check34, check37, check38a,
  check39, check40_41, check42, check42Footer, check46, check47, check48, check49,
  check50, check50Wrap, check53, check54, check55, check56, checkCopyTell, check62, check63, check64, check65, check67, check38c,
  check19Tells, check58Static, check42TwoButton, check47Placeholders, check65Tailwind, check29Glow, check11Lift, check15Fade,
  checkF1, checkF2, checkF3, checkF4, checkF5, checkF6, checkF7, checkF7Pills, checkF8, checkF9, checkF15, checkF16];

const files = collectFiles(opts.paths);
if (!files.length) { console.error('sloplint: no .html or .css files found'); process.exit(2); }

const groups = new Map();
for (const f of files) {
  const dir = dirname(f);
  if (!groups.has(dir)) groups.set(dir, { css: [], html: [] });
  const g = groups.get(dir);
  if (extname(f).toLowerCase() === '.css') g.css.push(f);
  else g.html.push(f);
}

const localRef = (href) => href && !/^(?:[a-z]+:|\/\/)/i.test(href) ? href.split(/[?#]/)[0] : null;
function importsOf(css, from) {
  const out = [];
  for (const m of stripComments(css).matchAll(/@import\s+(?:url\(\s*)?["']?([^"')\s;]+)["']?\s*\)?/gi)) {
    const ref = localRef(m[1]);
    if (ref) out.push(resolve(from, ref));
  }
  return out;
}
function linksOf(doc, from) {
  const out = [];
  for (const t of doc.tags) {
    if (t.close || t.name !== 'link' || !/stylesheet/i.test(getAttr(t.attrs, 'rel') || '')) continue;
    const ref = localRef(getAttr(t.attrs, 'href'));
    if (ref) out.push(resolve(from, ref));
  }
  return out;
}

const waiversByDir = new Map();
const postureByFile = {};
for (const [dir, g] of groups) {
  const cssFiles = [];
  const rules = [];
  const docs = [];
  const inGroup = new Set([...g.css, ...g.html]);
  const pending = [];
  for (const f of g.css) {
    const raw = readFileSync(f, 'utf8');
    cssFiles.push({ file: f, raw });
    rules.push(...parseCss(raw, f));
    pending.push(...importsOf(raw, dirname(f)));
  }
  for (const f of g.html) {
    const raw = readFileSync(f, 'utf8');
    const doc = parseHtml(f, raw);
    docs.push(doc);
    for (const s of doc.styles) {
      rules.push(...parseCss(s.css, f, s.lineOffset));
      pending.push(...importsOf(s.css, dirname(f)));
    }
    pending.push(...linksOf(doc, dirname(f)));
  }
  while (pending.length) {
    const p = pending.shift();
    if (inGroup.has(p) || extname(p).toLowerCase() !== '.css' || !existsSync(p)) continue;
    inGroup.add(p);
    let raw;
    try { raw = readFileSync(p, 'utf8'); } catch { continue; }
    cssFiles.push({ file: p, raw, attached: true });
    rules.push(...parseCss(raw, p));
    pending.push(...importsOf(raw, dirname(p)));
  }

  const head40 = (t) => t.split('\n').slice(0, 40).join('\n');
  const stampText = [
    ...cssFiles.map((c) => head40(c.raw)),
    ...docs.flatMap((d) => d.styles.map((st) => head40(st.css))),
  ].join('\n');
  const posture = (/posture:\s*(restrained|committed|full-palette|drenched)/i.exec(stampText)?.[1] || 'restrained').toLowerCase();
  for (const d of docs) postureByFile[d.file] = posture;
  const allCss = cssFiles.map((c) => c.raw).join('\n') + '\n'
    + docs.map((d) => d.styles.map((s) => s.css).join('\n')).join('\n');
  const tokensOnly = !docs.length && rules.length > 0 && rules.every(isTokenRule);
  const ctx = { rules, tokens: buildTokens(rules), docs, cssFiles, genre: opts.genre, stampText, allCss, posture, tokensOnly };
  applyWaivers(ctx, dir);
  waiversByDir.set(dir, { WAIVED, ANSWERED });
  for (const check of CHECKS) {
    try { check(ctx); } catch (e) {
      console.error(`sloplint: internal error in ${check.name} for ${dir}: ${e.message}`);
    }
  }
}

if (opts.render) {
  const htmlFiles = files.filter((f) => extname(f).toLowerCase() === '.html');
  try {
    const mod = await import(new URL('./sloplint-render.mjs', import.meta.url).href);
    const extra = await mod.renderCheck(htmlFiles, { genre: opts.genre, postureByFile });
    for (const f of extra) {
      const w = waiversByDir.get(dirname(f.file));
      WAIVED = w ? w.WAIVED : new Set();
      ANSWERED = w ? w.ANSWERED : new Set();
      report(f.gate, f.grade === 'REFLEX' ? 'FAIL' : f.grade, f.file, f.line, f.evidence, f.fix);
    }
  } catch (e) {
    console.error(`render tier unavailable (${e.message}); static checks only`);
  }
}

const seen = new Set();
const tierOk = (f) => !opts.tier || (opts.tier === 'floor' ? (f.tier === 'floor' && f.grade === 'FAIL') : f.tier === opts.tier);
const unique = findings.filter((f) => {
  if (!tierOk(f)) return false;
  const k = `${f.gate}|${f.grade}|${f.file}|${f.line}|${f.evidence}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

unique.sort((a, b) => {
  const ra = GRADE_RANK[a.grade] ?? 9, rb = GRADE_RANK[b.grade] ?? 9;
  if (ra !== rb) return ra - rb;
  const ga = gateSortKey(a.gate), gb = gateSortKey(b.gate);
  if (ga !== gb) return ga - gb;
  if (a.file !== b.file) return a.file < b.file ? -1 : 1;
  return a.line - b.line;
});

const count = (g) => unique.filter((f) => f.grade === g).length;
const fails = count('FAIL');
const reflex = count('REFLEX');
const warns = count('WARN');
const waived = count('WAIVED');
const rejected = count('WAIVER');
const answered = count('ANSWERED');
const notes = count('NOTE');

const tally = [`${fails} FAIL`];
if (reflex) tally.push(`${reflex} REFLEX`);
tally.push(`${warns} WARN`);
if (waived) tally.push(`${waived} WAIVED`);
if (rejected) tally.push(`${rejected} REJECTED`);
if (answered) tally.push(`${answered} ANSWERED`);
if (notes) tally.push(`${notes} NOTE`);

if (opts.json) {
  console.log(JSON.stringify({
    summary: { fails, reflex, warns, waived, rejected, answered, notes, files: files.length },
    findings: unique,
  }, null, 2));
} else {
  if (!unique.length) {
    console.log(`sloplint: clean. 0 FAIL, 0 REFLEX, 0 WARN across ${files.length} file(s).`);
  } else {
    const wGate = Math.max(4, ...unique.map((f) => String(f.gate).length));
    const wGrade = Math.max(5, ...unique.map((f) => f.grade.length));
    const wWhere = Math.max(9, ...unique.map((f) => `${f.file}:${f.line}`.length));
    console.log(`${'GATE'.padEnd(wGate)}  ${'GRADE'.padEnd(wGrade)}  ${'WHERE'.padEnd(wWhere)}  EVIDENCE`);
    for (const f of unique) {
      console.log(`${String(f.gate).padEnd(wGate)}  ${f.grade.padEnd(wGrade)}  ${`${f.file}:${f.line}`.padEnd(wWhere)}  ${f.evidence}`);
      if (f.grade !== 'WAIVED' && f.grade !== 'ANSWERED') {
        console.log(`${''.padEnd(wGate)}  ${''.padEnd(wGrade)}  ${''.padEnd(wWhere)}  fix: ${f.fix}`);
      }
    }
    console.log(`\n${tally.join(', ')} across ${files.length} file(s).`);
  }
}
process.exit(fails > 0 || reflex > 0 ? 1 : 0);
