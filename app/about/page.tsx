import Image from 'next/image';
import { SectionReveal, RevealItem } from '@/components/SectionReveal';

const disciplines = [
  'Brand Strategy & Identity',
  'UX Research & Product Design',
  'Environmental & Spatial Graphics',
  'Graphic Design & Art Direction',
  'Motion & 3D Visualisation',
  'Packaging Design',
];

const recognition = [
  { award: 'Best Government Event', body: 'Singapore Event Awards', year: '2023' },
  { award: 'Silver Award', body: 'Marketing Events Awards SG', year: '2022' },
  { award: 'Bronze — Design for Good', body: 'Design for Good Awards', year: '2022' },
  { award: '"Apps We Love"', body: 'Apple App Store SG/MY', year: '2023' },
];

const inputBase =
  'w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 outline-none focus:ring-1';

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section
        className="px-6 pt-16 pb-0 md:px-16 md:pt-20 lg:px-24"
      >
        <p
          className="text-xs tracking-[0.25em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          About
        </p>
        <h1
          className="font-[100] mb-0"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Gerard Teo
        </h1>
      </section>

      {/* ── Bio + portrait ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-16 md:py-24 lg:px-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_360px] lg:gap-24 items-start">
          {/* Text */}
          <SectionReveal className="flex flex-col gap-8">
            <RevealItem>
              <p
                className="text-xl md:text-2xl font-[300] leading-relaxed"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.02em',
                  maxWidth: '100%',
                }}
              >
                Multidisciplinary designer with 26 years of experience across brand identity,
                spatial graphics, packaging, and digital product design.
              </p>
            </RevealItem>

            <RevealItem>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                My practice sits at the intersection of rigorous research and expressive craft.
                I believe the most effective design work is born from a deep understanding of
                people — their motivations, contexts, and the friction they face — translated into
                visual language with intentionality and precision.
              </p>
            </RevealItem>

            <RevealItem>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Based in Singapore, I partner with organisations ranging from government agencies
                to early-stage startups, building design systems that are both strategically
                sound and visually distinctive. Every project begins with listening, and ends
                with something worth looking at.
              </p>
            </RevealItem>
          </SectionReveal>

          {/* Portrait */}
          <SectionReveal stagger={false}>
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <Image
                src="/assets/portrait.png"
                alt="Gerard Teo — portrait"
                fill
                className="object-cover object-top"
                sizes="(max-width:1024px) 100vw, 360px"
                unoptimized
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, transparent 60%, rgba(5,5,8,0.6) 100%)',
                }}
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Disciplines ── */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-16 md:py-20 lg:px-24">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-10"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            Disciplines
          </p>
          <SectionReveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((d) => (
              <RevealItem key={d}>
                <div
                  className="flex items-center gap-4 py-4 border-b"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <span
                    className="h-px w-8 shrink-0"
                    style={{ backgroundColor: 'var(--color-neon-cyan)' }}
                  />
                  <span
                    className="text-sm tracking-wider"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {d}
                  </span>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>
        </div>
      </section>

      {/* ── Recognition ── */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-16 md:py-20 lg:px-24">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-10"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
          >
            Recognition
          </p>
          <SectionReveal className="flex flex-col">
            {recognition.map((item) => (
              <RevealItem key={item.award}>
                <div
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between border-b"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <div>
                    <p className="font-[500] text-sm" style={{ color: 'var(--color-text-primary)', maxWidth: '100%' }}>
                      {item.award}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)', maxWidth: '100%' }}>
                      {item.body}
                    </p>
                  </div>
                  <span
                    className="text-xs tracking-widest"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                  >
                    {item.year}
                  </span>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
