// Adds a "Layout" toggle that labels each region with the MOGP classes that build it.
(() => {
  const KEY = 'mogp-examples-layout';
  const read = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };
  const write = on => { try { localStorage.setItem(KEY, on ? '1' : '0'); } catch { /* storage unavailable */ } };

  const SELECTOR = '[data-mogp], [data-mogp-grid], [data-mogp-container]';
  const GAP = 3;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'inspect-toggle';
  button.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="1.75" y="1.75" width="12.5" height="12.5" rx="2"/><path d="M6 2v12M10 2v12M2 6h12M2 10h12"/></svg><span>Layout</span>';

  const layer = document.createElement('div');
  layer.className = 'inspect-layer';
  layer.setAttribute('aria-hidden', 'true');

  const overlaps = (a, b) =>
    a.left < b.right + GAP && a.right + GAP > b.left && a.top < b.bottom + GAP && a.bottom + GAP > b.top;

  // Lay out every label: try the kind's preferred corner first, then the other corner,
  // moving down one label height at a time until the spot is free.
  function place() {
    layer.textContent = '';
    if (!document.body.classList.contains('show-layout')) return;

    const docWidth = document.documentElement.clientWidth;
    const scrollX = window.scrollX, scrollY = window.scrollY;
    const placed = [];

    document.querySelectorAll(SELECTOR).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const kind = el.hasAttribute('data-mogp-container') ? 'container'
        : el.hasAttribute('data-mogp-grid') ? 'grid' : 'item';
      const text = el.getAttribute('data-mogp-container') || el.getAttribute('data-mogp-grid') || el.getAttribute('data-mogp');

      const label = document.createElement('span');
      label.className = 'inspect-label' + (kind === 'item' ? '' : ' is-' + kind);
      label.textContent = text;
      layer.append(label);

      const w = label.offsetWidth, h = label.offsetHeight;
      const right = kind !== 'item';
      const sides = right ? ['right', 'left'] : ['left', 'right'];
      const maxRows = Math.max(1, Math.floor((rect.height - 8) / (h + GAP)));

      let spot = null;
      search: for (const side of sides) {
        const x = side === 'left' ? rect.left + 4 : rect.right - w - 4;
        for (let row = 0; row < Math.max(maxRows, 8); row++) {
          const y = rect.top + 4 + row * (h + GAP);
          const box = { left: x, top: y, right: x + w, bottom: y + h };
          if (!placed.some(p => overlaps(box, p))) { spot = box; break search; }
        }
      }
      if (!spot) { label.remove(); return; }

      const x = Math.min(Math.max(spot.left, 2), docWidth - w - 2);
      placed.push({ left: x, top: spot.top, right: x + w, bottom: spot.top + h });
      label.style.left = (x + scrollX) + 'px';
      label.style.top = (spot.top + scrollY) + 'px';
    });
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; place(); });
  };

  const apply = on => {
    document.body.classList.toggle('show-layout', on);
    button.setAttribute('aria-pressed', String(on));
    schedule();
  };

  button.addEventListener('click', () => {
    const on = !document.body.classList.contains('show-layout');
    apply(on);
    write(on);
  });

  // Sticky elements and responsive reflow move boxes, so re-place on scroll and resize.
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  addEventListener('load', schedule);
  new ResizeObserver(schedule).observe(document.body);

  document.body.append(layer, button);
  apply(read());
})();
