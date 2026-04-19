import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CounterStatProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function CounterStat({ value, suffix = '+', duration = 1800 }: CounterStatProps) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, value, duration]);

  return (
    <motion.span onViewportEnter={() => setTriggered(true)} viewport={{ once: true }}>
      {count}{suffix}
    </motion.span>
  );
}
