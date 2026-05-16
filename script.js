// ============================================================
// 1. Highlight current section in nav on scroll
// ============================================================
(function () {
  const links = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const byId = new Map();
  links.forEach(link => byId.set(link.getAttribute('href').slice(1), link));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const link = byId.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(s => observer.observe(s));
})();

// ============================================================
// 2. Animated ball along hero arc
// ============================================================
(function () {
  const path = document.getElementById('ball-path');
  const ball = document.getElementById('ball-moving');
  if (!path || !ball) return;

  const length = path.getTotalLength();
  let start = null;
  const duration = 2800; // ms per loop

  function animate(ts) {
    if (!start) start = ts;
    const elapsed = (ts - start) % duration;
    const t = elapsed / duration;
    // ease in-out cubic
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const pt = path.getPointAtLength(ease * length);
    ball.setAttribute('cx', pt.x);
    ball.setAttribute('cy', pt.y);
    // size: biggest at apex (middle of arc), smallest at ends
    const scale = 0.5 + Math.sin(ease * Math.PI) * 0.8;
    ball.setAttribute('r', (6 * scale).toFixed(2));
    // glow opacity
    ball.setAttribute('fill-opacity', (0.6 + Math.sin(ease * Math.PI) * 0.4).toFixed(2));
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// ============================================================
// 3. Count-up animation for metric numbers when scrolled into view
// ============================================================
(function () {
  const metrics = Array.from(document.querySelectorAll('.metric-num'));
  if (metrics.length === 0) return;

  function parseValue(text) {
    // extract number and surrounding text e.g. "[XX%]" -> raw placeholder, "42%" -> {num:42, pre:'', suf:'%'}
    const match = text.match(/([^0-9]*)([0-9]+(?:\.[0-9]+)?)([^0-9]*)/);
    if (!match) return null;
    return { pre: match[1], num: parseFloat(match[2]), suf: match[3] };
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function countUp(el, target, pre, suf) {
    const duration = 1400;
    const isFloat = target % 1 !== 0;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const val = easeOut(t) * target;
      el.textContent = pre + (isFloat ? val.toFixed(1) : Math.round(val)) + suf;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const parsed = parseValue(el.textContent);
      if (!parsed) return;
      observer.unobserve(el);
      countUp(el, parsed.num, parsed.pre, parsed.suf);
    });
  }, { threshold: 0.5 });

  metrics.forEach(m => observer.observe(m));
})();