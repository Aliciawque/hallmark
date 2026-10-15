// Halyard: the poster's weight follows the pointer, the tester, the loupe over the character set, the waterfall.
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('[data-axis]');
  const word = hero.querySelector('[data-word]');
  const readout = hero.querySelector('[data-readout]');
  // the guides sit on the word's real metrics, measured from the font once it has loaded
  const poster = hero.querySelector('.hero__poster');
  const lines = { cap: hero.querySelector('.metric--cap'), x: hero.querySelector('.metric--x'), base: hero.querySelector('.metric--base'), desc: hero.querySelector('.metric--desc') };
  const place = () => {
    const cs = getComputedStyle(word), fs = parseFloat(cs.fontSize);
    const cx = document.createElement('canvas').getContext('2d');
    cx.font = `400 ${fs}px "Bodoni Moda"`;
    const m = (s) => cx.measureText(s);
    const mark = document.createElement('span'); mark.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    word.append(mark);
    const base = word.offsetTop + mark.offsetTop;
    mark.remove();
    lines.base.style.top = base + 'px';
    lines.cap.style.top = base - m('H').actualBoundingBoxAscent + 'px';
    lines.x.style.top = base - m('x').actualBoundingBoxAscent + 'px';
    lines.desc.style.top = base + m('y').actualBoundingBoxDescent + 'px';
  };
  document.fonts.ready.then(() => { place(); requestAnimationFrame(() => hero.classList.add('is-ready')); });
  addEventListener('resize', place);
  const setW = (w) => { w = Math.round(w / 10) * 10; word.style.setProperty('--w', w); readout.textContent = w; };
  if (!still) {
    hero.addEventListener('pointermove', (e) => setW(400 + (e.clientX / innerWidth) * 500));
    // once on arrival the weight runs up and settles, so the axis is seen before it is touched
    let t0 = null;
    const run = (t) => { if (t0 === null) t0 = t; const p = Math.min(1, (t - t0) / 1600); setW(400 + Math.sin(p * Math.PI) * 500); if (p < 1) requestAnimationFrame(run); };
    setTimeout(() => requestAnimationFrame(run), 700);
  }

  // tester
  const text = document.querySelector('[data-tester]');
  const outs = { size: document.querySelector('[data-out="size"]'), weight: document.querySelector('[data-out="weight"]') };
  document.querySelectorAll('[data-ctl]').forEach((r) => r.addEventListener('input', () => {
    const v = r.value;
    if (r.dataset.ctl === 'size') { text.style.setProperty('--size', v + 'px'); outs.size.textContent = v; }
    else { text.style.setProperty('--wt', v); outs.weight.textContent = v; }
  }));
  document.querySelectorAll('[data-style]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-style]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    text.style.setProperty('--st', b.dataset.style);
  }));

  // characters and the loupe
  const set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&?!@£';
  const names = { '&': 'Ampersand', '?': 'Question mark', '!': 'Exclamation mark', '@': 'At sign', '£': 'Pound sign' };
  const nameOf = (c) => names[c] || (/[0-9]/.test(c) ? `Figure ${c}` : (c === c.toUpperCase() ? `Capital ${c}` : `Lowercase ${c}`));
  const ul = document.querySelector('[data-chars]');
  const g = document.querySelector('[data-loupe]'), gn = document.querySelector('[data-loupe-name]'), gc = document.querySelector('[data-loupe-code]');
  const show = (c, btn) => {
    g.textContent = c; gn.textContent = nameOf(c);
    gc.textContent = 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    ul.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  };
  [...set].forEach((c) => {
    const li = document.createElement('li'); const b = document.createElement('button');
    b.type = 'button'; b.textContent = c; b.setAttribute('aria-label', nameOf(c)); b.setAttribute('aria-pressed', 'false');
    b.addEventListener('pointerenter', () => show(c, b)); b.addEventListener('focus', () => show(c, b)); b.addEventListener('click', () => show(c, b));
    li.append(b); ul.append(li);
  });
  show('g', ul.querySelectorAll('button')[32]);

  // waterfall
  const fall = document.querySelector('[data-fall]');
  [120, 96, 72, 48, 32, 24, 16, 12].forEach((px, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${px} px</span><p style="font-size:${px}px;font-variation-settings:'opsz' ${Math.min(96, px)};font-weight:${i % 2 ? 400 : 500}">${px > 40 ? 'Low water, high summer' : 'The boats lay over on the mud like sleepers, and she walked the harbour wall counting iron rings.'}</p>`;
    fall.append(li);
  });
})();
