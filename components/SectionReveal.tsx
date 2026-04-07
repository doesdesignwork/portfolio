'use client';

import { motion, Variants, Transition } from 'framer-motion';
import type { CSSProperties } from 'react';

const cubicBezier: [number, number, number, number] = [0.16, 1, 0.3, 1];

const itemTransition: Transition = { duration: 0.7, ease: cubicBezier };

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: itemTransition,
  },
};

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  /** If false, wraps all children in a single animated item. Default: true (stagger). */
  stagger?: boolean;
}

export function SectionReveal({
  children,
  className,
  style,
  stagger = true,
}: SectionRevealProps) {
  if (!stagger) {
    return (
      <motion.div
        className={className}
        style={style}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={itemVariants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
