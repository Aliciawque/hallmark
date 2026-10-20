// Long Meadow: the order counts bottles at the one price; nothing is sent until the form is wired.
(() => {
  const form = document.querySelector('form.buy');
  if (!form) return;
  const qty = form.querySelector('#qty'), total = form.querySelector('[data-total]'), help = form.querySelector('.buy__help');
  const PRICE = 16, MIN = 1, MAX = 24;
  const set = (n) => {
    n = Math.max(MIN, Math.min(MAX, Math.round(Number(n) || MIN)));
    qty.value = n;
    total.textContent = `£${n * PRICE}`;
    form.querySelector('[data-q="-1"]').disabled = n <= MIN;
    form.querySelector('[data-q="1"]').disabled = n >= MAX;
  };
  form.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => set(Number(qty.value) + Number(b.dataset.q))));
  qty.addEventListener('change', () => set(qty.value));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.dataset.endpoint) { help.textContent = 'Nothing was sent: ordering is not connected yet.'; return; }
  });
  set(qty.value);
})();
