// The hero head's edit. The page states "The design skill that ends AI slop."; where motion is allowed, the inline
// script after the head sets it as "A design skill" before the first paint, and this file corrects it once the hand is
// dealt. The logo's slash leaves the lockup, swoops into the A and strikes it; "The" is written small above in the
// proof's orange, then dropped into the line, growing to display size with its optical size following, as the struck
// A falls out and the line opens; ink runs into the orange, and the slash comes home. Every move is a Web Animation
// on one shared clock, measured once at the start; the real words take over at the end with a short crossfade.
(function () {
  const h = document.querySelector('[data-hl]');
  if (!h || !h.classList.contains('is-a')) return;
  const a = h.querySelector('.hl__a'), the = h.querySelector('.hl__the');
  const words = [...h.querySelectorAll('.hl__w')].filter((w) => w !== a && w !== the);
  const logo = document.querySelector('.brand__slash');
  const ACC = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const SVG = 'http://www.w3.org/2000/svg';
  const START = 950; // ms after navigation: the head has risen and most of the hand is down
  const anims = [], ghosts = [];
  let done = false;

  // one animation per element and property, written as a timeline: [[ms, value, easing to the next point], ...]
  const track = (el, prop, pts) => {
    const end = pts[pts.length - 1][0];
    const an = el.animate(pts.map(([t, v, e]) => ({ offset: t / end, [prop]: v, easing: e || 'linear' })), { duration: end, fill: 'both' });
    anims.push(an);
    return an;
  };
  const OUT = 'cubic-bezier(.16,1,.3,1)', SET = 'cubic-bezier(.32,0,.12,1)', HIT = 'cubic-bezier(.2,.7,.2,1)';
  const rel = (r) => { const o = h.getBoundingClientRect(); return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height }; };
  const box = (el) => rel(el.getBoundingClientRect());
  const baseOf = (el) => { const i = document.createElement('i'); i.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; el.append(i); const y = box(i).y; i.remove(); return y; };
  const measure = () => new Map(words.map((w) => [w, box(w)]));
  const px = (x, y) => `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
  const ghost = (text, b) => {
    const g = document.createElement('span');
    g.className = 'hl__ghost'; g.setAttribute('aria-hidden', 'true');
    g.innerHTML = `<span class="hl__t"><span>${text}</span></span>`;
    g.style.left = b.x + 'px'; g.style.top = b.y + 'px';
    h.append(g); ghosts.push(g);
    return g;
  };

  // the real words take over; the ghosts, already sitting exactly on them, fade out (or go at once when cut short)
  const finish = (soft) => {
    if (done) return;
    done = true;
    h.classList.remove('is-a', 'is-run');
    a.remove();
    const inGhost = (an) => ghosts.some((g) => g.contains(an.effect.target));
    anims.forEach((an) => { if (soft !== true || !inGhost(an)) an.cancel(); });
    ghosts.forEach((g) => {
      if (soft !== true) { g.remove(); return; }
      g.animate([{ opacity: getComputedStyle(g).opacity }, { opacity: 0 }], { duration: 180, fill: 'forwards' }).finished.then(() => { g.remove(); if (!ghosts.some((o) => o.isConnected)) anims.forEach((an) => an.cancel()); });
    });
  };

  // the slash: the logo's own mark at the logo's lean, through the A from below the baseline to above the apex
  function slash(gA, bA, baseA, E) {
    const apex = baseA - 0.735 * E, ext = 0.14 * E, tan = 0.34, sw = 0.08 * E;
    const y0 = baseA - bA.y + ext, y1 = apex - bA.y - ext, cx = bA.w / 2 + 0.012 * E;
    const run = tan * (y0 - y1), x0 = cx - run / 2, x1 = cx + run / 2;
    const L = x0 - sw, T = y1 - sw, W = run + 2 * sw, H = (y0 - y1) + 2 * sw;
    const fly = document.createElement('span'), flyY = document.createElement('span');
    fly.className = flyY.className = 'hl__fly';
    fly.style.left = L + 'px'; fly.style.top = T + 'px';
    [fly, flyY].forEach((f) => { f.style.width = W + 'px'; f.style.height = H + 'px'; });
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('class', 'hl__slash');
    svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.style.transformOrigin = `${W / 2}px ${H / 2}px`;
    const p = document.createElementNS(SVG, 'path');
    p.setAttribute('d', `M${(x0 - L).toFixed(2)} ${(y0 - T).toFixed(2)} L${(x1 - L).toFixed(2)} ${(y1 - T).toFixed(2)}`);
    p.setAttribute('pathLength', '1');
    p.style.strokeWidth = sw + 'px';
    svg.append(p); flyY.append(svg); fly.append(flyY); gA.append(fly);
    return { fly, flyY, svg, p, cx: bA.x + L + W / 2, cy: bA.y + T + H / 2, len: (y0 - y1) / Math.cos(Math.atan(tan)), apex };
  }

  function run() {
    const E = parseFloat(getComputedStyle(h).fontSize);
    const before = measure(), bA = box(a), baseA = baseOf(a);
    h.classList.remove('is-a'); h.classList.add('is-run');
    const after = measure(), fT = box(the), bOff = baseOf(the) - fT.y;
    const leap = !!logo && logo.getClientRects().length > 0;
    const T = leap
      ? { off: 110, hit: 600, write: 700, out: 1140, go: 1220, land: 1880, ink: 2000, inked: 2480, home: 2040 }
      : { hit: 240, write: 340, out: 800, go: 880, land: 1540, ink: 1660, inked: 2140 };

    const gA = ghost('A', bA), gAi = gA.firstChild.firstChild;
    const s = slash(gA, bA, baseA, E);
    gA.style.transformOrigin = `${bA.w / 2}px ${baseA - bA.y}px`;
    if (leap) {
      // the logo's slash dips and gives itself up; its double drops out of the lockup, glides in level and docks
      const lr = rel(logo.getBoundingClientRect()), o = T.off;
      const dx = lr.x + lr.w / 2 - s.cx, dy = lr.y + lr.h * 0.52 - s.cy, s0 = (lr.h * 0.8) / s.len;
      const rest = 'translateY(0.02em)';
      track(logo, 'transform', [[0, rest, 'cubic-bezier(.3,0,.2,1)'], [o, 'translateY(0.1em) scale(0.9, 0.84)'], [o + 1, rest], [T.home, `translateY(0.38em) scale(0.6)`, 'cubic-bezier(.2,.9,.25,1.25)'], [T.home + 520, rest]]);
      track(logo, 'opacity', [[0, 1], [o, 1], [o + 1, 0], [T.home, 0, HIT], [T.home + 260, 1]]);
      track(s.svg, 'opacity', [[0, 0], [o, 0], [o + 1, 1]]);
      track(s.fly, 'transform', [[0, `translateX(${dx}px)`], [o, `translateX(${dx}px)`, 'cubic-bezier(.55,0,.35,1)'], [T.hit, `translateX(${0.035 * E}px)`, OUT], [T.hit + 240, 'none']]);
      track(s.flyY, 'transform', [[0, `translateY(${dy}px)`], [o, `translateY(${dy}px)`, 'cubic-bezier(.25,.55,.35,1)'], [T.hit, 'none']]);
      track(s.svg, 'transform', [[0, `scale(${s0})`], [o, `scale(${s0})`, 'cubic-bezier(.3,.45,.3,1)'], [o + (T.hit - o) * 0.55, `scale(${(s0 + 1) * 0.66}) rotate(7deg)`, 'cubic-bezier(.4,0,.3,1)'], [T.hit, 'rotate(-3deg)', 'cubic-bezier(.3,0,.3,1)'], [T.hit + 240, 'none']]);
    } else {
      s.p.style.strokeDasharray = '1 1';
      track(s.p, 'strokeDashoffset', [[0, 1, 'cubic-bezier(.62,0,.24,1)'], [T.hit, 0]]);
    }
    // the A takes the hit, a small knock along the stroke, and greys out; then it falls out of the line, slash and all
    const k = leap ? T.hit : T.hit * 0.55;
    track(gAi, 'opacity', [[0, 1], [k, 1, HIT], [k + 260, 0.28]]);
    track(gAi, 'transform', [[0, 'none'], [k, 'none', HIT], [k + 70, leap ? px(0.016 * E, 0.012 * E) : px(-0.014 * E, 0.01 * E), 'cubic-bezier(.3,0,.2,1)'], [k + 260, 'none']]);
    track(gA, 'transform', [[0, 'none'], [T.out - 60, 'none', 'cubic-bezier(.5,0,.75,0)'], [T.out + 300, `translateY(${0.5 * E}px) rotate(-6deg)`]]);
    track(gA, 'opacity', [[0, 1], [T.out - 60, 1, 'cubic-bezier(.3,0,.7,.4)'], [T.out + 200, 0]]);

    // "The": written above the A in the proof's orange, then set into the line, its optical size growing with it
    const gT = ghost('The', fT), gTm = gT.firstChild, gTi = gTm.firstChild;
    gTi.style.color = ACC;
    const sc = 0.36, tx = (bA.x + bA.w / 2) - sc * fT.w / 2 - fT.x, ty = (s.apex - 0.19 * E) - fT.y - sc * bOff;
    track(gT, 'transform', [[0, `translateX(${tx}px)`], [T.go, `translateX(${tx}px)`, SET], [T.land, 'none']]);
    track(gTm, 'transform', [[0, `translateY(${ty}px) scale(${sc})`], [T.go, `translateY(${ty}px) scale(${sc})`, 'cubic-bezier(.5,0,.16,1)'], [T.land, 'none']]);
    track(gTm, 'fontVariationSettings', [[0, '"opsz" 30'], [T.go, '"opsz" 30', 'cubic-bezier(.5,0,.16,1)'], [T.land, '"opsz" 72']]);
    track(gTi, 'clipPath', [[0, 'inset(-40% 104% -40% -6%)'], [T.write, 'inset(-40% 104% -40% -6%)', 'cubic-bezier(.35,.4,.2,1)'], [T.write + 360, 'inset(-40% -6% -40% -6%)']]);
    track(gTi, 'opacity', [[0, 0], [T.write, 0], [T.write + 80, 1], [T.inked - 1, 1], [T.inked, 0]]);
    // the ink: a copy over the orange, revealed left to right with a soft edge, so no frame mixes the two into brown
    const ink = document.createElement('span'); ink.className = 'hl__ink'; ink.textContent = 'The'; gTm.append(ink);
    ['maskPosition', 'webkitMaskPosition'].forEach((prop) => track(ink, prop, [[0, '100% 0'], [T.ink, '100% 0', 'cubic-bezier(.45,0,.2,1)'], [T.inked, '0% 0']]));

    // the line opens round the new word
    words.forEach((w, i) => {
      const b = before.get(w), f = after.get(w), dx = b.x - f.x, dy = b.y - f.y;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
      track(w, 'transform', [[0, px(dx, dy)], [T.go + i * 16, px(dx, dy), SET], [T.land + i * 16, 'none']]);
    });
    return Math.max(T.inked, (T.home || 0) + 520);
  }

  const go = () => {
    if (done) return;
    const r = h.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) { finish(); return; }
    const end = run();
    setTimeout(() => finish(true), end + 40);
    const w0 = innerWidth;
    addEventListener('resize', () => { if (innerWidth !== w0) finish(); });
    document.fonts.addEventListener('loadingdone', (e) => { if (e.fontfaces.some((f) => /Newsreader/.test(f.family))) finish(); });
  };
  // wait for the display face (the edit is measured in it), but never past three seconds
  const start = () => {
    const face = document.fonts.load(`400 ${getComputedStyle(h).fontSize} Newsreader`).then(() => document.fonts.ready);
    Promise.race([face, new Promise((r) => setTimeout(r, 3000))]).then(() => setTimeout(() => requestAnimationFrame(go), Math.max(0, START - performance.now())));
  };
  if (document.hidden) document.addEventListener('visibilitychange', function wake() { if (!document.hidden) { document.removeEventListener('visibilitychange', wake); start(); } });
  else start();
})();
