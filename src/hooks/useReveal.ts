import { useEffect } from 'react';

/**
 * Fait apparaître une seule fois les éléments `.reveal` lorsqu'ils entrent dans le viewport.
 * Un MutationObserver prend en charge les pages chargées en lazy après le montage.
 * Le délai entre éléments d'un même groupe se règle avec la variable CSS `--i`.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );

    const scan = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
    };

    scan();
    root.classList.add('reveal-ready');

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}
