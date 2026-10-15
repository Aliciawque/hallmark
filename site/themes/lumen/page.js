// quarry: the request answers itself, the rack lights the GPUs a model needs, a day of traffic under one flat
// rate, code tabs and copy.
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(() => requestAnimationFrame(() => document.querySelector('.hero').classList.add('is-ready')));

  // the answer streams in token by token, once
  const a = document.querySelector('[data-stream]');
  const full = a.textContent;
  if (!still) {
    a.textContent = '';
    const words = full.split(/(\s+)/);
    let i = 0;
    setTimeout(function tick() {
      a.textContent += words[i++] || '';
      if (i < words.length) setTimeout(tick, 70 + Math.random() * 60);
      else a.closest('.stream').classList.add('is-done');
    }, 900);
  }

  // the rack
  const rack = document.querySelector('[data-rack]');
  const res = document.querySelector('[data-res]');
  for (let k = 0; k < 8; k++) { const li = document.createElement('li'); li.className = 'gpu'; li.innerHTML = `<span>gpu ${k}</span>`; rack.append(li); }
  const gpus = [...rack.children];
  const reserve = (n) => {
    gpus.forEach((g, k) => { g.style.transitionDelay = still ? '0ms' : `${k * 50}ms`; g.classList.toggle('is-yours', k < n); });
    res.textContent = n;
  };
  document.querySelectorAll('[data-gpus]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-gpus]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    reserve(+b.dataset.gpus);
  }));
  reserve(2);

  // a day of traffic: the load moves, the rate line stays flat
  const plot = document.querySelector('[data-day]');
  const N = 96, pts = [];
  for (let i = 0; i <= N; i++) {
    const h = i / N * 24;
    const base = 0.28 + 0.32 * Math.exp(-Math.pow((h - 14) / 4.2, 2)) + 0.18 * Math.exp(-Math.pow((h - 20.5) / 1.6, 2));
    const spike = h > 9.8 && h < 10.6 ? 0.36 * Math.sin((h - 9.8) / 0.8 * Math.PI) : 0;
    pts.push([i / N * 1000, 280 - (base + spike + 0.03 * Math.sin(i * 1.7)) * 260]);
  }
  const d = 'M' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L');
  plot.innerHTML = `<svg viewBox="0 0 1000 280" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="lf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="oklch(72% 0.15 12)" stop-opacity="0.35"/><stop offset="1" stop-color="oklch(72% 0.15 12)" stop-opacity="0"/></linearGradient></defs>
    <path d="${d} L1000 280 L0 280 Z" fill="url(#lf)"/>
    <path d="${d}" fill="none" stroke="oklch(72% 0.15 12)" stroke-width="2" vector-effect="non-scaling-stroke" class="day__load"/>
    <line x1="0" x2="1000" y1="96" y2="96" stroke="oklch(80% 0.15 64)" stroke-width="2.5" vector-effect="non-scaling-stroke"/>
  </svg>`;
  const load = plot.querySelector('.day__load');
  if (!still && 'IntersectionObserver' in window) {
    const len = load.getTotalLength();
    load.style.strokeDasharray = len; load.style.strokeDashoffset = len;
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); load.style.transition = 'stroke-dashoffset 1800ms cubic-bezier(0.16, 1, 0.3, 1)'; load.style.strokeDashoffset = 0; } }, { threshold: 0.4 }).observe(plot);
  }

  // code tabs and copy
  const tabs = [...document.querySelectorAll('.code__tabs [role="tab"]')];
  const pick = (t) => tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !on; });
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => pick(t));
    t.addEventListener('keydown', (e) => { const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (k) { const n = tabs[(i + k + tabs.length) % tabs.length]; pick(n); n.focus(); } });
  });
  const copy = document.querySelector('[data-copy]');
  copy.addEventListener('click', async () => {
    const pre = document.querySelector('.code__body pre[role="tabpanel"]:not([hidden])');
    try { await navigator.clipboard.writeText(pre.textContent); copy.classList.add('is-done'); setTimeout(() => copy.classList.remove('is-done'), 1400); } catch (e) {}
  });
})();
