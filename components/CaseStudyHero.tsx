'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Asset } from '@/types/project';

interface CaseStudyHeroProps {
  title: string;
  category: string;
  thumbnail: Asset;
  accentColor: string;
}

export default function CaseStudyHero({
  title,
  category,
  thumbnail,
  accentColor,
}: CaseStudyHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: '90svh', minHeight: '520px' }}
    >
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src={thumbnail.url}
          alt={thumbnail.altText}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(5,5,8,0.2) 0%,
              rgba(5,5,8,0.4) 50%,
              rgba(5,5,8,0.9) 100%)`,
          }}
        />
      </motion.div>

      {/* Text content */}
      <motion.div
        className="absolute inset-x-0 bottom-0 px-6 pb-16 md:px-16 md:pb-20 lg:px-24"
        style={{ y: textY, opacity }}
      >
        <motion.span
          className="tag mb-5 inline-block"
          style={{ color: accentColor, borderColor: accentColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {category}
        </motion.span>

        <motion.h1
          className="font-display font-[100] tracking-wider uppercase"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>

        {/* Accent rule */}
        <motion.div
          className="mt-6 h-px"
          style={{ backgroundColor: accentColor, maxWidth: '180px' }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </section>
  );
}
