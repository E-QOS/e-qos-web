import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show on touch/pointer-coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setVisible(true);

    let mouseX = -200;
    let mouseY = -200;
    let followerX = -200;
    let followerY = -200;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouseX - 5}px`;
        cursorRef.current.style.top = `${mouseY - 5}px`;
      }
      followerX += (mouseX - followerX) * 0.14;
      followerY += (mouseY - followerY) * 0.14;
      if (followerRef.current) {
        followerRef.current.style.left = `${followerX - 16}px`;
        followerRef.current.style.top = `${followerY - 16}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />
      <div ref={followerRef} className={styles.follower} aria-hidden="true" />
    </>
  );
}
