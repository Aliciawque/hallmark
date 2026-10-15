// Driftsong: the hero's arrangement really plays. Four bars in D major at 92 bpm, synthesised in the browser:
// the hum alone, or the hum with keys, bass, drums and strings. Lanes light as the playhead crosses them.
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(() => requestAnimationFrame(() => document.querySelector('.hero').classList.add('is-ready')));

  const player = document.querySelector('[data-player]');
  const btn = player.querySelector('[data-play]');
  const time = player.querySelector('[data-time]');
  const head = player.querySelector('[data-head]');
  const BPM = 92, BEAT = 60 / BPM, BARS = 4, LEN = BARS * 4 * BEAT;
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  // melody: [midi, start beat, length in beats]
  const MEL = [[62, 0, 1], [66, 1, 1], [69, 2, 1.5], [66, 3.5, 0.5], [67, 4, 1], [66, 5, 1], [64, 6, 2], [62, 8, 1], [66, 9, 1], [69, 10, 1], [71, 11, 1], [69, 12, 3], [66, 15, 1]];
  const CHORDS = [[50, [62, 66, 69]], [47, [59, 62, 66]], [43, [59, 62, 67]], [45, [61, 64, 69]]];

  // draw the hum line in its lane from the melody itself
  const humLane = player.querySelector('[data-hum]');
  const pts = MEL.flatMap(([m, s, l]) => { const y = 30 - (m - 60) * 2.2; return [[s / 16 * 100, y], [(s + l) / 16 * 100, y]]; });
  humLane.innerHTML = `<svg viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true"><path d="M${pts.map((p) => p.join(' ')).join(' L')}" fill="none" stroke="oklch(56% 0.15 36)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`;

  let ctx = null, master = null, mode = 'band', playing = false, t0 = 0, raf = 0, stopAt = 0;
  const blocks = [...player.querySelectorAll('.lane__track b')].map((b) => ({ el: b, a: parseFloat(b.style.getPropertyValue('--a')) / 100, b: parseFloat(b.style.getPropertyValue('--b')) / 100 }));

  const voice = (t, f, dur, type, gain, attack = 0.02, release = 0.12, detune = 0) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = f; o.detune.value = detune;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.setTargetAtTime(gain * 0.7, t + attack, dur * 0.4);
    g.gain.setTargetAtTime(0, t + dur, release);
    o.connect(g).connect(master); o.start(t); o.stop(t + dur + release * 5);
    return o;
  };
  const hum = (t, f, dur) => {
    const o = voice(t, f, dur, 'sine', 0.22, 0.05, 0.08);
    const lfo = ctx.createOscillator(), lg = ctx.createGain();
    lfo.frequency.value = 5.2; lg.gain.value = 9; lfo.connect(lg).connect(o.detune); lfo.start(t); lfo.stop(t + dur + 0.5);
    voice(t, f * 2, dur, 'triangle', 0.03, 0.05, 0.08);
  };
  const kick = (t) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.14); g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.3); o.connect(g).connect(master); o.start(t); o.stop(t + 0.32); };
  const noise = (t, dur, gain, hp) => {
    const n = ctx.createBufferSource(), buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    n.buffer = buf; const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp; const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    n.connect(f).connect(g).connect(master); n.start(t);
  };

  const schedule = (t) => {
    MEL.forEach(([m, s, l]) => hum(t + s * BEAT, hz(m), l * BEAT * 0.95));
    if (mode !== 'band') return;
    CHORDS.forEach(([root, tri], bar) => {
      const b0 = t + bar * 4 * BEAT;
      tri.forEach((m) => { voice(b0, hz(m), 4 * BEAT * 0.98, 'triangle', 0.045, 0.01, 0.4); });
      for (let k = 0; k < 2; k++) voice(b0 + k * 2 * BEAT, hz(root - 12), 1.8 * BEAT, 'sawtooth', 0.06, 0.01, 0.08);
      if (bar >= 1) for (let k = 0; k < 4; k++) { if (k % 2 === 0) kick(b0 + k * BEAT); else noise(b0 + k * BEAT, 0.18, 0.12, 1800); for (let h = 0; h < 2; h++) noise(b0 + (k + h * 0.5) * BEAT, 0.05, 0.04, 7000); }
      if (bar >= 2) tri.forEach((m) => { voice(b0, hz(m + 12), 4 * BEAT, 'sawtooth', 0.012, 0.6, 0.6, 7); voice(b0, hz(m + 12), 4 * BEAT, 'sawtooth', 0.012, 0.6, 0.6, -7); });
    });
  };

  const fmt = (s) => `0:${String(Math.floor(s)).padStart(2, '0')}`;
  const frame = () => {
    const p = Math.min(1, (ctx.currentTime - t0) / LEN);
    head.style.setProperty('--p', p);
    time.textContent = fmt(p * LEN);
    blocks.forEach((b) => b.el.classList.toggle('is-on', playing && mode === 'band' && p >= b.a && p < b.b));
    if (p < 1 && playing) raf = requestAnimationFrame(frame); else stop();
  };
  const stop = () => {
    playing = false; player.classList.remove('is-playing'); cancelAnimationFrame(raf);
    btn.setAttribute('aria-label', 'Play the arrangement');
    if (master) { master.gain.setTargetAtTime(0, ctx.currentTime, 0.05); }
    blocks.forEach((b) => b.el.classList.remove('is-on'));
  };
  const play = async () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') await ctx.resume();
    master = ctx.createGain(); master.gain.value = 0.8;
    const comp = ctx.createDynamicsCompressor(); master.connect(comp).connect(ctx.destination);
    t0 = ctx.currentTime + 0.08; schedule(t0);
    playing = true; player.classList.add('is-playing'); btn.setAttribute('aria-label', 'Stop');
    raf = requestAnimationFrame(frame);
  };
  btn.addEventListener('click', () => (playing ? stop() : play()));
  player.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    player.querySelectorAll('[data-mode]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    mode = b.dataset.mode; player.classList.toggle('is-hum', mode === 'hum');
    if (playing) { stop(); play(); }
  }));
})();
