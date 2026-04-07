'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 nav-border"
        style={{ backgroundColor: 'rgba(5,5,8,0.8)', backdropFilter: 'blur(16px)' }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-sm font-[200] tracking-[0.2em] uppercase text-text-primary hover:text-neon-cyan transition-colors duration-300"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Gerard Teo
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map(({ href, label }) => {
              const isActive = href !== '#contact' && pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="relative text-xs tracking-[0.15em] uppercase transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: isActive
                        ? 'var(--color-neon-cyan)'
                        : 'var(--color-text-secondary)',
                    }}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-neon-cyan"
                        style={{ backgroundColor: 'var(--color-neon-cyan)' }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 origin-center"
              style={{ backgroundColor: 'var(--color-text-primary)' }}
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-6"
              style={{ backgroundColor: 'var(--color-text-primary)' }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 origin-center"
              style={{ backgroundColor: 'var(--color-text-primary)' }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: 'rgba(5,5,8,0.97)' }}
          >
            <ul className="flex flex-col items-center gap-10">
              {links.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-[100] tracking-[0.2em] uppercase hover:text-neon-cyan transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
