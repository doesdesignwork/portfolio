'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Parallax intensity — fraction of container height that the image drifts.
   * 0.12 means the image travels ±12% of container height. Default: 0.12
   */
  strength?: number;
  className?: string;
}

/**
 * next/image wrapper with a scroll-driven parallax effect.
 * The container must have `position: relative` and an explicit height set by the parent.
 * Internally the image is oversized by `strength * 2` so it never reveals empty space.
 */
export default function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  strength = 0.12,
  className = '',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Drift from +inset% at entry to -inset% at exit, in percent of the wrapper height.
  // Because the wrapper is expanded by ±inset on top/bottom, we never clip.
  const pct = strength * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`${pct}%`, `-${pct}%`]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Oversized wrapper: extends beyond the container by `strength * 100%` on each side */}
      <motion.div
        className="absolute"
        style={{
          y,
          top: `-${pct}%`,
          bottom: `-${pct}%`,
          left: 0,
          right: 0,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
