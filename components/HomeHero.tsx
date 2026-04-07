'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Text drifts upward and fades as section scrolls out
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="px-6 pt-16 pb-12 md:px-16 md:pt-20 md:pb-16 lg:px-24">
      <motion.div style={{ y, opacity }}>
        <motion.p
          className="text-xs tracking-[0.25em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Selected Work — 2020–2024
        </motion.p>

        <motion.h1
          className="font-[100]"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          Multidisciplinary
          <br />
          <span style={{ color: 'var(--color-neon-cyan)' }}>Design</span> Practice
        </motion.h1>

        <motion.div
          className="rule mt-8 max-w-xs"
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </section>
  );
}
