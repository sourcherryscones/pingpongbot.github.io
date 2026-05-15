// Highlight the current section in the sticky nav as the user scrolls.
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
