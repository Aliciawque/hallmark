#!/usr/bin/env node
import { existsSync, mkdirSync } from 'node:fs';
import { join, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WIDTHS = [320, 375, 414, 768, 1280, 1920];
const CHROMES = ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'];
const isUrl = (t) => /^https?:\/\//.test(t);
const slugOf = (t) => isUrl(t) ? t.replace(/^https?:\/\//, '').replace(/[^\w.-]+/g, '-').replace(/-+$/, '') : basename(t, '.html');

const SHOTS = [];
async function shoot(page, file, tag, fullPage) {
  try {
    const dir = isUrl(file) ? join(process.cwd(), '.hallmark', 'shots') : join(dirname(file), '.hallmark', 'shots');
    mkdirSync(dir, { recursive: true });
    const out = join(dir, `${slugOf(file)}-${tag}.png`);
    await page.screenshot({ path: out, fullPage });
    SHOTS.push(out);
  } catch {}
}

export async function renderCheck(htmlFiles, metaIn) {
  const meta = { genre: null, postureByFile: {}, heroPostureByFile: {}, stage: 'page', ...(metaIn || {}) };
  const heroOnly = meta.stage === 'hero';
  let puppeteer = null;
  const { createRequire } = await import('node:module');
  const { pathToFileURL } = await import('node:url');
  const tryRoots = async (roots) => {
    for (const root of roots) {
      for (const name of ['puppeteer-core', 'puppeteer']) {
        try {
          const req = createRequire(join(root, 'noop.js'));
          const resolved = req.resolve(name);
          puppeteer = (await import(pathToFileURL(resolved).href)).default;
          if (puppeteer) return;
        } catch {}
      }
    }
  };
  const local = [process.cwd(), dirname(fileURLToPath(import.meta.url))];
  if (process.env.HALLMARK_PUPPETEER) local.unshift(process.env.HALLMARK_PUPPETEER);
  await tryRoots(local);
  if (!puppeteer) {
    try {
      const { execSync } = await import('node:child_process');
      const g = execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      if (g) await tryRoots([dirname(g)]);
    } catch {}
  }
  if (!puppeteer) {
    console.error('render tier unavailable (no puppeteer-core found locally, globally, or via HALLMARK_PUPPETEER); static checks only');
    return [];
  }
  let chrome = [process.env.CHROME_PATH, ...CHROMES].find((p) => p && existsSync(p)) || null;
  if (!chrome && typeof puppeteer.executablePath === 'function') {
    try { const bundled = puppeteer.executablePath(); if (bundled && existsSync(bundled)) chrome = bundled; } catch {}
  }
  if (!chrome) {
    console.error('render tier unavailable (no Chrome or Chromium found; set CHROME_PATH); static checks only');
    return [];
  }
  const findings = [];
  const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
  try {
    for (const file of htmlFiles) {
      const page = await browser.newPage();
      try {
        await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]).catch(() => {});
        await page.goto(isUrl(file) ? file : 'file://' + file, { waitUntil: 'networkidle0', timeout: 30000 }).catch(() => {});
        await page.evaluate(async () => { document.documentElement.classList.add('shot'); if (document.fonts) await document.fonts.ready; }).catch(() => {});
        const pageMeta = { genre: meta.genre, posture: meta.postureByFile[file] || 'restrained' };
        const prefix = heroOnly ? 'hero-' : '';
        for (const width of heroOnly ? [375, 1280] : WIDTHS) {
          await page.setViewport({ width, height: width === 375 && heroOnly ? 812 : 800 });
          await new Promise((r) => setTimeout(r, 120));
          if (width === 1280) await shoot(page, file, `${prefix}1280x800`, false);
          if (width === 375) await shoot(page, file, heroOnly ? 'hero-375x812' : '375', !heroOnly);
          const res = await page.evaluate(observe, width === 1280, pageMeta);
          for (const f of res) findings.push({ ...f, file, line: 1, evidence: `[${width}px] ${f.evidence}` });
        }
        for (const [w, h] of [[1440, 900], [1920, 1080]]) {
          await page.setViewport({ width: w, height: h });
          await shoot(page, file, `${prefix}${w}x${h}`, false);
          if (!heroOnly && w === 1440) await shoot(page, file, '1440-full', true);
          await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 15)); } window.scrollTo(0, 0); });
          await new Promise((r) => setTimeout(r, 200));
          const res = await page.evaluate(observeSpace, w === 1440, heroOnly, meta.heroPostureByFile[file] || '');
          for (const f of res) findings.push({ ...f, file, line: 1, evidence: `[${w}px] ${f.evidence}` });
        }
      } catch (e) {
        console.error(`render tier: failed on ${file}: ${e.message}`);
      } finally {
        await page.close().catch(() => {});
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }
  if (SHOTS.length) console.error(heroOnly ? `render tier: ${SHOTS.length} hero screenshots in ${dirname(SHOTS[0])} (1280x800, 1440x900, 1920x1080 and 375x812 first screens)` : `render tier: ${SHOTS.length} screenshots in ${dirname(SHOTS[0])} (1280x800, 1440x900, 1920x1080 folds; 1440 and 375 full pages)`);

  const seen = new Set();
  return findings.filter((f) => {
    const k = f.gate + '|' + f.evidence.replace(/^\[\d+px\] /, '');
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function observe(checkFold, meta) {
  meta = meta || { genre: null, posture: 'restrained' };
  const out = [];
  const push = (gate, grade, evidence, fix) => out.push({ gate: String(gate), grade, evidence, fix });
  const describe = (el) => {
    const cls = (el.className && typeof el.className === 'string') ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    return el.tagName.toLowerCase() + cls;
  };
  const visible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  };

  if (document.documentElement.scrollWidth > window.innerWidth + 1) {
    push(34, 'FAIL', `horizontal scroll: scrollWidth ${document.documentElement.scrollWidth} > viewport ${window.innerWidth}`,
      'overflow-x: clip on html and body; find the overflowing block');
  }

  for (const el of document.querySelectorAll('a, button, [role="button"]')) {
    if (!visible(el)) continue;
    const text = (el.textContent || '').trim();
    if (!text) continue;
    if ([...el.querySelectorAll('*')].some((d) => !d.closest('svg') && /^(block|flex|grid|list-item|table)$/.test(getComputedStyle(d).display))) continue;
    const cs = getComputedStyle(el);
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4;
    const tops = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const host = n.parentElement;
      if (!n.textContent.trim() || !host || host.closest('svg')) continue;
      const hr = host.getBoundingClientRect();
      if (hr.width <= 2 || hr.height <= 2) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      for (const r of range.getClientRects()) if (r.width > 0 && r.height > 0) tops.push(r.top);
    }
    tops.sort((a, b) => a - b);
    let lines = tops.length ? 1 : 0;
    for (let i = 1; i < tops.length; i++) if (tops[i] - tops[i - 1] > lh * 0.6) lines++;
    if (lines > 1) {
      push(49, 'FAIL', `clickable "${text.slice(0, 32)}" wraps to ${lines} lines (${describe(el)})`,
        'Shorten the label or set nowrap');
    }
  }

  if (checkFold) {
    const h1 = document.querySelector('h1');
    if (h1 && visible(h1)) {
      const hr = h1.getBoundingClientRect();
      const scope = h1.closest('section, header, main, div') || document.body;
      let cta = null;
      for (const c of scope.querySelectorAll('a, button')) {
        if (visible(c) && (c.textContent || '').trim()) { cta = c; break; }
      }
      const fold = 800;
      if (hr.bottom > fold || hr.top < 0) {
        push('44b', 'FAIL', `h1 crosses the 1280x800 fold (bottom ${Math.round(hr.bottom)}px)`,
          'Right-size the display clamp to the fold');
      } else if (cta) {
        const cr = cta.getBoundingClientRect();
        if (cr.bottom > fold) {
          push('44b', 'FAIL', `primary CTA below the 1280x800 fold (bottom ${Math.round(cr.bottom)}px)`,
            'Trim hero padding so the CTA fits the fold');
        }
      }
    }
  }

  if (checkFold) {
    const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const parse = (s) => {
      const m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/.exec(s);
      if (!m) return null;
      return { r: +m[1] / 255, g: +m[2] / 255, b: +m[3] / 255, a: m[4] == null ? 1 : +m[4] };
    };
    const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
    const ratio = (a, b) => {
      const la = lum(a), lb = lum(b);
      return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
    };
    const bgOf = (el) => {
      let node = el;
      while (node && node !== document.documentElement) {
        const c = parse(getComputedStyle(node).backgroundColor);
        if (c && c.a >= 0.9) return c;
        node = node.parentElement;
      }
      const root = parse(getComputedStyle(document.body).backgroundColor);
      return root && root.a > 0 ? root : { r: 1, g: 1, b: 1, a: 1 };
    };
    let reported = 0;
    const seenSel = new Set();
    for (const el of document.querySelectorAll('body *')) {
      if (reported >= 10) break;
      if (!visible(el)) continue;
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2);
      if (!hasText) continue;
      const cs = getComputedStyle(el);
      const fg = parse(cs.color);
      if (!fg || fg.a < 0.9) continue;
      const bg = bgOf(el);
      const size = parseFloat(cs.fontSize);
      const weight = parseInt(cs.fontWeight, 10) || 400;
      const large = size >= 24 || (size >= 18 && weight >= 700);
      const threshold = large ? 3.0 : 4.5;
      const r = ratio(fg, bg);
      const key = describe(el);
      if (r < threshold - 0.05 && !seenSel.has(key)) {
        seenSel.add(key);
        reported++;
        push(40, 'FAIL', `computed contrast ${r.toFixed(2)}:1 < ${threshold}:1 on ${key}`,
          'Raise the contrast to threshold');
        const btnish = el.closest('a, button, [class*="btn"], [class*="cta"]');
        if (btnish && r < 1.6) {
          push(41, 'FAIL', `button text ~ button fill on ${key} (${r.toFixed(2)}:1)`,
            'Use accent-ink or paper for the label');
        }
      }
    }
  }

  if (checkFold && meta.posture === 'restrained') {
    const cs0 = getComputedStyle(document.documentElement);

    const oklchToRgb = (L, C, H) => {
      const hr = (H * Math.PI) / 180;
      const a = C * Math.cos(hr), b = C * Math.sin(hr);
      const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
      const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
      const l = l_ ** 3, mm = m_ ** 3, ss = s_ ** 3;
      return [
        4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * ss,
        -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * ss,
        -0.0041960863 * l - 0.7034186147 * mm + 1.7076147010 * ss,
      ].map((c) => {
        const cl = Math.min(1, Math.max(0, c));
        const g = cl <= 0.0031308 ? 12.92 * cl : 1.055 * cl ** (1 / 2.4) - 0.055;
        return Math.round(g * 255);
      });
    };
    const toRgb = (str) => {
      if (!str) return null;
      str = str.trim();
      let m;
      if ((m = /^#([0-9a-f]{6})([0-9a-f]{2})?$/i.exec(str))) {
        const h = m[1];
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), m[2] ? parseInt(m[2], 16) / 255 : 1];
      }
      if ((m = /^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/.exec(str))) {
        return [+m[1], +m[2], +m[3], m[4] == null ? 1 : +m[4]];
      }
      if ((m = /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/.exec(str))) {
        return [Math.round(+m[1] * 255), Math.round(+m[2] * 255), Math.round(+m[3] * 255), m[4] == null ? 1 : +m[4]];
      }
      if ((m = /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+%?))?\s*\)$/.exec(str))) {
        const L = m[1].endsWith('%') ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
        const alpha = m[4] == null ? 1 : (m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]));
        return [...oklchToRgb(L, parseFloat(m[2]), parseFloat(m[3])), alpha];
      }
      return null;
    };
    const targets = ['--color-accent', '--color-accent-2']
      .map((t) => toRgb(cs0.getPropertyValue(t).trim())).filter(Boolean);
    if (targets.length) {
      const near = (str) => {
        const p = toRgb(str);
        if (!p || p[3] < 0.5) return false;
        return targets.some((t) => Math.abs(t[0] - p[0]) + Math.abs(t[1] - p[1]) + Math.abs(t[2] - p[2]) <= 30);
      };
      const CW = 16, COLS = Math.ceil(innerWidth / CW), ROWS = Math.ceil(800 / CW);
      const grid = new Uint8Array(COLS * ROWS);
      let walked = 0;
      for (const el of document.querySelectorAll('body, body *')) {
        if (++walked > 4000) break;
        if (el !== document.body && !visible(el)) continue;
        const cs = getComputedStyle(el);
        const isBg = near(cs.backgroundColor);
        const isTxt = near(cs.color) && parseFloat(cs.fontSize) >= 32 &&
          [...el.childNodes].some((nd) => nd.nodeType === 3 && nd.textContent.trim());
        if (!isBg && !isTxt) continue;
        const r = el.getBoundingClientRect();
        const x0 = Math.max(0, Math.floor(r.left / CW));
        const x1 = Math.min(COLS - 1, Math.floor((Math.min(r.right, innerWidth) - 1) / CW));
        const y0 = Math.max(0, Math.floor(r.top / CW));
        const y1 = Math.min(ROWS - 1, Math.floor((Math.min(r.bottom, 800) - 1) / CW));
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) grid[y * COLS + x] = 1;
      }
      let filled = 0;
      for (const c of grid) filled += c;
      const pct = (100 * filled) / (COLS * ROWS);
      const warnAt = meta.genre === 'atmospheric' ? 20 : 5;
      const failAt = meta.genre === 'atmospheric' ? 30 : 8;
      if (pct > failAt) {
        push(23, 'FAIL', `accent paints ~${pct.toFixed(1)}% of the 1280x800 viewport (> ${failAt}%)`,
          'Retreat the accent to <= 5%; large colour belongs to paper/field tokens or a declared posture');
      } else if (pct > warnAt) {
        push(23, 'WARN', `accent paints ~${pct.toFixed(1)}% of the 1280x800 viewport`,
          'Confirm this is a declared posture surface, else retreat to <= 5%');
      }
    }
  }

  if (checkFold) {
    const sticky = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.position === 'sticky' && parseFloat(cs.top) === 0) sticky.push(el);
    }
    if (sticky.length >= 2) {
      push(56, 'FAIL', `two sticky top:0 elements: ${sticky.slice(0, 2).map(describe).join(' + ')}`,
        'Offset the second sticky by banner height');
    }
  }

  return out;
}

function observeSpace(atLaptop, heroOnly, heroPosture) {
  const freeFold = /^(poster|ledge|banner)$/.test(heroPosture || '');
  const out = [];
  const push = (gate, grade, evidence, fix) => out.push({ gate: String(gate), grade, evidence, fix });
  const vw = window.innerWidth, vh = window.innerHeight;
  const vis = (el) => { const s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return false; const r = el.getBoundingClientRect(); return r.width > 1 && r.height > 1; };
  const abs = (el) => { const r = el.getBoundingClientRect(); return { top: r.top + scrollY, bottom: r.bottom + scrollY, left: r.left, right: r.right, w: r.width, h: r.height }; };
  let secs = [...document.querySelectorAll('section, main > div, footer')].filter((s) => vis(s) && s.getBoundingClientRect().height > 40);
  secs = secs.filter((s) => !secs.some((o) => o !== s && o.contains(s)));
  const h1 = document.querySelector('h1');
  const heroish = (el) => /^(SECTION|HEADER)$/.test(el.tagName) || [...el.classList].some((c) => /^hero(-[\w-]+)?$/i.test(c) || /(^|-)hero$/i.test(c));
  let hero = null;
  for (let n = h1; n && n !== document.body; n = n.parentElement) if (heroish(n)) { hero = n; break; }
  hero = hero || [...document.querySelectorAll('section, header, [class]')].find(heroish) || secs[0];
  const heroEnd = hero ? abs(hero).bottom : null;

  let stack = 0, textBox = null, fig = null;
  if (hero && h1) {
    const cta = [...hero.querySelectorAll('a, button')].filter((c) => vis(c) && (c.textContent || '').trim() && !c.closest('nav'))[0];
    const ctaTop = cta ? abs(cta).top : Infinity;
    const texts = [...hero.querySelectorAll('h1, h2, p, small, [class*="sub"], [class*="lede"], [class*="eyebrow"], [class*="kicker"], [class*="label"]')].filter((e) => vis(e) && (e.innerText || '').trim() && !e.closest('nav, svg, table, figure, [data-slot]') && abs(e).top < ctaTop);
    const seen = [];
    for (const e of texts) { if (seen.some((o) => o.contains(e) || e.contains(o))) continue; seen.push(e); }
    stack = seen.length;
    const boxes = [h1, ...seen.filter((e) => Math.abs(abs(e).left - abs(h1).left) < 40)].map(abs);
    textBox = { top: Math.min(...boxes.map((b) => b.top)), bottom: Math.max(...boxes.map((b) => b.bottom), cta ? abs(cta).bottom : 0), left: Math.min(...boxes.map((b) => b.left)), right: Math.max(...boxes.map((b) => b.right)) };
    let bestA = 0;
    const clipped = (el) => { const r = el.getBoundingClientRect(); let L = r.left, T = r.top, R = r.right, B = r.bottom; for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const cs = getComputedStyle(p); if (/hidden|clip/.test(`${cs.overflow} ${cs.overflowX} ${cs.overflowY}`)) { const q = p.getBoundingClientRect(); L = Math.max(L, q.left); T = Math.max(T, q.top); R = Math.min(R, q.right); B = Math.min(B, q.bottom); } } R = Math.min(R, vw); return { top: T + scrollY, bottom: B + scrollY, left: L, right: R, w: Math.max(0, R - L), h: Math.max(0, B - T) }; };
    for (const e of hero.querySelectorAll('svg, canvas, img, figure, video, picture, [data-slot], [class*="fig"], [class*="visual"], [class*="device"], [class*="demo"], [class*="shot"], [class*="illus"], [class*="panel"]')) {
      if (!vis(e) || e.closest('nav') || e.contains(h1)) continue;
      const b = clipped(e); const a = b.w * b.h;
      if (b.w > 160 && b.h > 120 && a > bestA && b.w < vw * 0.95 && b.left >= textBox.right - 40) { fig = b; bestA = a; }
    }
  }

  if (atLaptop) {

    const words = [];
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      const p = n.parentElement; if (!p || !vis(p) || p.closest('script, style, noscript, svg')) continue;
      const t = n.textContent.trim(); if (!t) continue;
      const pr = p.getBoundingClientRect(); const c = t.split(/\s+/).filter((w) => /[A-Za-z0-9]{2,}|\d/.test(w)).length; if (c) words.push({ top: pr.top + scrollY, bottom: pr.bottom + scrollY, c });
    }
    const H = document.documentElement.scrollHeight;
    let maxWords = 0, at = 0;
    for (let y = 0; y < H; y += 50) { const w = Math.round(words.reduce((a, x) => { const h = Math.max(1, x.bottom - x.top); const ov = Math.max(0, Math.min(x.bottom, y + 900) - Math.max(x.top, y)); return a + x.c * Math.min(1, ov / h); }, 0)); if (w > maxWords) { maxWords = w; at = y; } }
    if (maxWords > 95) push(58, 'FAIL', `${maxWords} words on one screen (from y=${at})`, 'One idea per screen: cut to about 80 words, make the section an object');
    else if (maxWords > 80) push(58, 'WARN', `${maxWords} words on one screen (from y=${at})`, 'Close to the 80-word screen budget');
    if (stack > 2) push(58, 'FAIL', `hero carries ${stack} text blocks before its actions`, 'Headline, one sentence, actions; delete the rest');

    const clipAbs = (el, stop) => { const r0 = el.getBoundingClientRect(); let T = r0.top, B = r0.bottom; for (let q = el.parentElement; q && q !== document.body; q = q.parentElement) { const cs = getComputedStyle(q); if (/hidden|clip/.test(`${cs.overflow} ${cs.overflowY}`)) { const qr = q.getBoundingClientRect(); T = Math.max(T, qr.top); B = Math.min(B, qr.bottom); } if (q === stop) break; } return { top: T + scrollY, bottom: B + scrollY }; };
    const content = (s) => { let top = Infinity, bottom = -Infinity; for (const c of s.querySelectorAll('*')) { if (!vis(c)) continue; if (!(c.innerText || '').trim() && !/^(SVG|IMG|CANVAS|VIDEO)$/.test(c.tagName) && getComputedStyle(c).backgroundColor === 'rgba(0, 0, 0, 0)') continue; if (c.children.length && ![...c.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && !/^(SVG)$/.test(c.tagName) && getComputedStyle(c).backgroundColor === 'rgba(0, 0, 0, 0)') continue; const b = clipAbs(c, s); if (b.bottom <= b.top) continue; top = Math.min(top, b.top); bottom = Math.max(bottom, b.bottom); } if (top === Infinity) { const b = abs(s); return b; } return { top, bottom }; };
    const gaps = [];
    for (let i = 0; !heroOnly && i < secs.length - 1; i++) gaps.push(Math.round(content(secs[i + 1]).top - content(secs[i]).bottom));
    const real = gaps.filter((g) => g > -50);
    if (real.length) {
      const min = Math.min(...real);
      if (min < 100) push(59, 'REFLEX', `smallest gap between sections is ${min}px (gaps: ${real.join(', ')})`, '120px or more between sections, varied');
      else if (real.length > 2 && new Set(real).size === 1) push(59, 'REFLEX', `every section gap is ${min}px`, 'Vary the rhythm: some 120, some 160, some 200');
    }
    if (!heroOnly && secs.length > 9) push(59, 'WARN', `${secs.length} sections`, 'Five to eight sections a page; merge or cut');

    if (hero && !freeFold && !/^corridor$/.test(heroPosture || '')) {
      const hb = abs(hero);
      let cTop = Infinity, cBottom = -Infinity;
      for (const c of hero.querySelectorAll('*')) {
        if (!vis(c) || c.closest('nav, header > nav') || c === hero) continue;
        const cs = getComputedStyle(c);
        const painted = (c.innerText || '').trim() || /^(SVG|IMG|CANVAS|VIDEO|PICTURE)$/.test(c.tagName) || cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none' || parseFloat(cs.borderTopWidth) > 0;
        if (!painted || /fixed|sticky/.test(cs.position)) continue;
        const b = abs(c); cTop = Math.min(cTop, b.top); cBottom = Math.max(cBottom, Math.min(b.bottom, hb.bottom));
      }
      let navBottom = hb.top;
      for (const n of document.querySelectorAll('header, nav, [class*="nav"], [class*="bar"]')) { if (!vis(n) || hero.contains(n) && !/fixed|sticky/.test(getComputedStyle(n).position)) continue; const cs = getComputedStyle(n); const b = abs(n); if ((/fixed|sticky/.test(cs.position) || hero.contains(n)) && b.top <= hb.top + 40 && b.bottom < hb.top + 220) navBottom = Math.max(navBottom, b.bottom); }
      const after = secs.find((x) => x !== hero && !hero.contains(x) && abs(x).top >= hb.bottom - 4);
      const bottomEdge = after ? Math.min(content(after).top, hb.bottom + 240) : hb.bottom;
      const topPad = cTop - navBottom, bottomPad = bottomEdge - cBottom;
      if (isFinite(topPad) && isFinite(bottomPad) && topPad > 24 && bottomPad < topPad * 1.3 - 8) push('44a', 'REFLEX', `hero padding ${Math.round(topPad)}px above, ${Math.round(bottomPad)}px below`, 'Bottom-heavy: block-end at least 1.3 times block-start (a Ledge inverts it; say Ledge in the stamp)');
    }
    if (heroEnd != null && !freeFold) {
      if (heroEnd > vh + 8) push('44c', 'REFLEX', `hero runs past the 1440x900 fold (hero ends at ${Math.round(heroEnd)}px)`, 'Size the display and the visual so the hero is one screen');
      else if (heroEnd < vh * 0.84 && secs.length > 1) push('44c', 'REFLEX', `hero ends at ${Math.round(heroEnd)}px of a 900px screen`, 'Fill the first screen with the visual or the headline, not with copy');
    }
    if (fig && textBox && !freeFold) {
      const off = Math.round((fig.top + fig.bottom) / 2 - (textBox.top + textBox.bottom) / 2);
      const gap = Math.round(fig.left - textBox.right);
      if (Math.abs(off) > 60) push('44c', 'REFLEX', `hero visual centre is ${off}px from the text block centre`, 'Align the visual beside the text');
      if (gap > 120 || (fig.right > vw - 8 && gap > 48)) push('44c', 'REFLEX', `hero visual sits ${gap}px from the text and ${Math.round(vw - fig.right)}px from the viewport edge`, 'Bring the visual to within 48 to 120px of the text; never pin it to the corner');
    }
  } else {

    if (textBox && textBox.left < 120) push('44d', 'FAIL', `hero text starts ${Math.round(textBox.left)}px from the edge at 1920`, 'Cap the container at 1360 to 1520px and centre it');
    if (heroEnd != null && heroEnd > vh + 8) push('44d', 'FAIL', `hero runs past the 1920x1080 screen (hero ends at ${Math.round(heroEnd)}px)`, 'Cap vw-sized visuals and display sizes');
    const wide = [...document.querySelectorAll('p, h1, h2, h3, li')].filter((e) => vis(e) && !e.querySelector('p, h1, h2, h3, h4, div, figure, ul, ol, table, section') && (e.innerText || '').trim().length > 40 && e.getBoundingClientRect().width > 1600);
    if (wide.length) push('44d', 'FAIL', `${wide.length} text blocks wider than 1600px at 1920`, 'Cap the container; hold the measure');
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const htmls = process.argv.slice(2).filter((p) => p.endsWith('.html'));
  const res = await renderCheck(process.argv.slice(2).filter((p) => isUrl(p)).concat(htmls.map((p) => resolve(process.cwd(), p))));
  console.log(JSON.stringify(res, null, 2));
  process.exit(0);
}
