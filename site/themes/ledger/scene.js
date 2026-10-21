// Closewise, security print: the hero's engraving drawn once from math, a sheen that follows the pointer
// across the raised lines, and last night's run zipping shut pair by pair. No library.
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer: fine)');
  const canvas = hero.querySelector('.hero__engraving');
  const sheen = hero.querySelector('.hero__sheen');
  const panel = hero.querySelector('.run');
  const root = getComputedStyle(document.documentElement);
  const tok = (n) => root.getPropertyValue(n).trim();
  const TAU = Math.PI * 2;

  /* ---------- the engraving ---------- */
  // Each figure is a list of closed curves; every curve is sampled as points, so the same geometry
  // strokes the visible canvas and the sheen's mask.
  function curve(fn, steps) {
    const pts = new Float32Array((steps + 1) * 2);
    for (let s = 0; s <= steps; s++) { const t = (s / steps) * TAU; const [x, y] = fn(t); pts[s * 2] = x; pts[s * 2 + 1] = y; }
    return pts;
  }
  function rosette(cx, cy, R) {
    const lace = [], band = [], rope = [], lathe = [], rose = [], eye = [];
    // the edge: an epitrochoid looping 96 times, five strands stepped so the loops knit into lace
    const n = 96, ab = R * 0.935;
    for (let k = 0; k < 5; k++) {
      const rot = (k / 5) * (TAU / n), d = R * 0.055 * (1 - k * 0.08);
      lace.push(curve((t0) => { const t = t0 + rot; return [cx + ab * Math.cos(t) - d * Math.cos(n * t), cy + ab * Math.sin(t) - d * Math.sin(n * t)]; }, 7200));
    }
    // the rim: twelve waves braided round one ring
    for (let i = 0; i < 12; i++) {
      const ph = (i / 12) * TAU;
      rope.push(curve((t) => { const r = R * 0.8 + R * 0.026 * Math.sin(60 * t + ph); return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; }, 2400));
    }
    // a wide braid inside the rim, its crossings beading
    for (let i = 0; i < 16; i++) {
      const ph = (i / 16) * Math.PI;
      band.push(curve((t) => { const r = R * 0.665 + R * 0.06 * Math.sin(24 * t + ph); return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; }, 1800));
    }
    // the lathe: concentric rings rippled out of phase
    for (let k = 0; k < 10; k++) {
      const base = R * (0.42 + k * 0.016), ph = k * 0.6;
      lathe.push(curve((t) => { const r = base + R * 0.008 * Math.sin(36 * t + ph); return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; }, 1400));
    }
    // the centre: a hypotrochoid rose, four copies turned
    const a = R * 0.36, b = (a * 3) / 11, dh = b * 1.32;
    for (let k = 0; k < 4; k++) {
      const rot = (k / 4) * (TAU / 8);
      rose.push(curve((t0) => { const t = t0 * 3; const x = (a - b) * Math.cos(t) + dh * Math.cos(((a - b) / b) * t); const y = (a - b) * Math.sin(t) - dh * Math.sin(((a - b) / b) * t); return [cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]; }, 3600));
    }
    for (const f of [0.05, 0.065, 0.08]) eye.push(curve((t) => [cx + R * f * Math.cos(t), cy + R * f * Math.sin(t)], 120));
    return { lace, band, rope, lathe, rose, eye };
  }
  function stroke(ctx, list, close) {
    ctx.beginPath();
    for (const pts of list) {
      ctx.moveTo(pts[0], pts[1]);
      for (let i = 2; i < pts.length; i += 2) ctx.lineTo(pts[i], pts[i + 1]);
      if (close) ctx.closePath();
    }
    ctx.stroke();
  }

  let maskURL = null, geo = null, W = 0, H = 0;
  const ground = hero.querySelector('.hero__ground');
  const head = hero.querySelector('.hero__text');
  function draw() {
    const gr = ground.getBoundingClientRect();
    const pr = panel.getBoundingClientRect();
    const tr = head.getBoundingClientRect();
    W = Math.round(gr.width); H = Math.round(gr.height);
    if (!W || !H) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    // the jewel sits on the head, whole: centred on the text block, as large as the ground and the panel allow
    const cx = tr.left - gr.left + tr.width / 2, cy = tr.top - gr.top + tr.height / 2;
    const stacked = pr.top >= tr.bottom - 4;
    const room = stacked ? pr.top - gr.top - cy - 8 : pr.left - gr.left - cx - 16;
    const R = Math.max(80, Math.min(cx - 10, W - cx - 10, cy - 10, H - cy - 10, room + 40, 340));
    const ros = rosette(cx, cy, R);
    geo = { cx, cy, R };
    const brass = tok('--color-accent-2'), bone = tok('--color-ink'), shade = tok('--color-shade');

    const paint = (ctx, mask) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineJoin = 'round';
      const pass = (dx, dy, colour, alphaScale) => {
        ctx.save(); ctx.translate(dx, dy);
        ctx.lineWidth = mask ? 1 : 0.6;
        const layer = (list, key, al, ma, close) => { ctx.strokeStyle = mask ? '#fff' : colour[key]; ctx.globalAlpha = (mask ? ma : al) * alphaScale; stroke(ctx, list, close); };
        layer(ros.lathe, 'lathe', 0.2, 0.8, true);
        layer(ros.rose, 'rose', 0.26, 0.9, false);
        layer(ros.band, 'band', 0.22, 0.9, true);
        layer(ros.rope, 'rope', 0.44, 1, true);
        layer(ros.lace, 'lace', 0.3, 1, true);
        layer(ros.eye, 'rope', 0.5, 1, true);
        ctx.restore();
      };
      if (!mask) {
        // intaglio relief: a shade line under every stroke, offset away from the light (top left)
        pass(0.7, 0.9, { lathe: shade, rose: shade, band: shade, rope: shade, lace: shade }, 1.5);
        // iris print: the inks shift from bone at the eye to brass at the edge, as a split fountain lays them
        const iris = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R);
        iris.addColorStop(0, bone); iris.addColorStop(0.55, bone); iris.addColorStop(1, brass);
        pass(0, 0, { lathe: bone, rose: iris, band: iris, rope: brass, lace: iris }, 1);
      } else pass(0, 0, {}, 1);
      clearType(ctx, gr);
    };
    paint(canvas.getContext('2d'), false);

    if (reduce.matches) { hero.classList.add('is-engraved'); return; }
    const m = document.createElement('canvas');
    m.width = canvas.width; m.height = canvas.height;
    paint(m.getContext('2d'), true);
    m.toBlob((blob) => {
      if (!blob) return;
      if (maskURL) URL.revokeObjectURL(maskURL);
      maskURL = URL.createObjectURL(blob);
      const img = `url("${maskURL}")`;
      sheen.style.webkitMaskImage = img; sheen.style.maskImage = img;
      sheen.style.webkitMaskSize = `${W}px ${H}px`; sheen.style.maskSize = `${W}px ${H}px`;
      sheen.style.webkitMaskRepeat = 'no-repeat'; sheen.style.maskRepeat = 'no-repeat';
      hero.classList.add('is-engraved');
      cur.x = 0; cur.y = 0; rest(); place(cur.x, cur.y);
    });
  }

  // as on a note, the engraving stops short of the lettering: each word and control is cut out of the
  // lines with a soft halo, so the head reads on clean paper while the rosette stays whole
  function clearType(ctx, gr) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = 1; ctx.fillStyle = '#000'; ctx.strokeStyle = '#000'; ctx.lineJoin = 'round';
    for (const el of head.querySelectorAll('h1, .lead')) {
      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize);
      ctx.font = `${cs.fontWeight} ${size}px ${cs.fontFamily}`;
      if ('letterSpacing' in ctx) ctx.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
      const asc = ctx.measureText('Hg').fontBoundingBoxAscent;
      const halo = Math.max(7, size * 0.16);
      ctx.lineWidth = halo * 2; ctx.shadowColor = '#000'; ctx.shadowBlur = halo;
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let t = walk.nextNode(); t; t = walk.nextNode()) {
        const re = /\S+/g; let m;
        while ((m = re.exec(t.data))) {
          const r = document.createRange(); r.setStart(t, m.index); r.setEnd(t, m.index + m[0].length);
          const b = r.getClientRects()[0]; if (!b) continue;
          const x = b.left - gr.left, y = b.top - gr.top + asc;
          ctx.strokeText(m[0], x, y); ctx.fillText(m[0], x, y);
        }
      }
    }
    ctx.shadowBlur = 10;
    for (const btn of head.querySelectorAll('.btn')) {
      const b = btn.getBoundingClientRect();
      ctx.beginPath(); ctx.roundRect(b.left - gr.left - 8, b.top - gr.top - 8, b.width + 16, b.height + 16, 8); ctx.fill();
    }
    ctx.restore();
  }

  /* ---------- the sheen: light across a raised print ---------- */
  const S = 440;
  const cur = { x: 0, y: 0 }, aim = { x: 0, y: 0 };
  let visible = true, raf = 0;
  function rest() { if (!geo) return; aim.x = geo.cx - geo.R * 0.42; aim.y = geo.cy - geo.R * 0.8; if (!cur.x && !cur.y) { cur.x = aim.x; cur.y = aim.y; } }
  function place(x, y) {
    const tx = Math.round(x - S / 2), ty = Math.round(y - S / 2);
    sheen.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    const mp = `${-tx}px ${-ty}px`;
    sheen.style.webkitMaskPosition = mp; sheen.style.maskPosition = mp;
  }
  function tick() {
    raf = 0;
    const dx = aim.x - cur.x, dy = aim.y - cur.y;
    cur.x += dx * 0.09; cur.y += dy * 0.09;
    place(cur.x, cur.y);
    if (visible && (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4)) raf = requestAnimationFrame(tick);
  }
  function wake() { if (!raf && visible && !reduce.matches) raf = requestAnimationFrame(tick); }
  hero.addEventListener('pointermove', (e) => {
    if (!fine.matches || reduce.matches || !geo) return;
    const gr = ground.getBoundingClientRect();
    aim.x = e.clientX - gr.left; aim.y = e.clientY - gr.top; wake();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { rest(); wake(); });

  /* ---------- the zipper ---------- */
  const zip = panel.querySelector('.zip');
  const pairs = zip ? [...zip.querySelectorAll('.pair')] : [];
  const again = panel.querySelector('.run__again');
  let played = false, timers = [];
  function clear() { timers.forEach(clearTimeout); timers = []; }
  function prime(instant) {
    clear();
    if (instant) zip.querySelectorAll('.slip, .seam, .tick, .seam__diff').forEach((el) => { el.style.transition = 'none'; });
    pairs.forEach((p) => p.classList.remove('is-shut'));
    zip.classList.add('is-primed');
    if (instant) { void zip.offsetWidth; zip.querySelectorAll('.slip, .seam, .tick, .seam__diff').forEach((el) => { el.style.transition = ''; }); }
  }
  function play(delay) {
    pairs.forEach((p, i) => timers.push(setTimeout(() => p.classList.add('is-shut'), delay + i * 170)));
    timers.push(setTimeout(() => { zip.classList.remove('is-primed'); pairs.forEach((p) => p.classList.remove('is-shut')); if (again) again.disabled = false; }, delay + pairs.length * 170 + 900));
  }
  if (zip && !reduce.matches) {
    prime(true);
    if (again) {
      again.hidden = false;
      again.addEventListener('click', () => { again.disabled = true; prime(false); play(760); });
    }
  }

  /* ---------- only while on screen ---------- */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      visible = e.isIntersecting;
      if (visible && zip && !played && !reduce.matches && e.intersectionRatio >= 0.35) { played = true; if (again) again.disabled = true; play(420); }
      if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
    }
  }, { threshold: [0, 0.35] });
  io.observe(hero);

  let rT = 0;
  new ResizeObserver(() => { clearTimeout(rT); rT = setTimeout(draw, 120); }).observe(hero);
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(draw);
})();
