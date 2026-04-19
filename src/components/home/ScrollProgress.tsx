import { useEffect, useRef } from 'react';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (fillRef.current) {
        fillRef.current.style.width = `${pct}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={styles.bar} aria-hidden="true">
      <div ref={fillRef} className={styles.fill} />
    </div>
  );
}
