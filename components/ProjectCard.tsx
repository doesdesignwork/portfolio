'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectTeaser } from '@/types/project';

interface ProjectCardProps {
  project: ProjectTeaser;
  /** Makes the card span 2 columns on the grid */
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { title, category, slug, interactionData } = project;
  const { thumbnail, hoverVideoUrl, accentColor } = interactionData;

  function handleMouseEnter() {
    setHovered(true);
    if (videoRef.current && hoverVideoUrl) {
      videoRef.current.play().catch(() => {});
    }
  }

  function handleMouseLeave() {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <motion.div
      className={featured ? 'col-span-1 md:col-span-2' : 'col-span-1'}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${slug}`} className="group block">
        <motion.article
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden"
          style={{ aspectRatio: featured ? '16/9' : '4/5' }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Thumbnail image */}
          <Image
            src={thumbnail.url}
            alt={thumbnail.altText}
            fill
            sizes={featured ? '(max-width:768px) 100vw, 66vw' : '(max-width:768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            priority={featured}
          />

          {/* Hover video overlay */}
          {hoverVideoUrl && (
            <video
              ref={videoRef}
              src={hoverVideoUrl}
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0 }}
            />
          )}

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{
              background: `linear-gradient(to top, rgba(5,5,8,0.92) 0%, rgba(5,5,8,0.3) 50%, transparent 100%)`,
              opacity: hovered ? 1 : 0.6,
            }}
          />

          {/* Accent top border that reveals on hover */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ backgroundColor: accentColor }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            <motion.span
              className="tag mb-3 self-start"
              style={{ color: accentColor, borderColor: accentColor }}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {category}
            </motion.span>

            <motion.h3
              className="font-display text-xl font-[200] tracking-[0.06em] uppercase text-text-primary"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              animate={{ y: hovered ? 0 : 8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {title}
            </motion.h3>

            {/* Arrow */}
            <motion.div
              className="mt-4 flex items-center gap-2 text-xs tracking-widest uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-secondary)',
              }}
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>View case study</span>
              <span>→</span>
            </motion.div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
