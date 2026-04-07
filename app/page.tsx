import { getAllProjectTeasers } from '@/lib/mockData';
import ProjectCard from '@/components/ProjectCard';
import { ProjectTeaser } from '@/types/project';

export default function HomePage() {
  const teasers = getAllProjectTeasers() as ProjectTeaser[];

  return (
    <main>
      {/* ── Hero header ── */}
      <section className="px-6 pt-16 pb-12 md:px-16 md:pt-20 md:pb-16 lg:px-24">
        <p
          className="text-xs tracking-[0.25em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
        >
          Selected Work — 2020–2024
        </p>

        <h1
          className="font-[100]"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Multidisciplinary
          <br />
          <span style={{ color: 'var(--color-neon-cyan)' }}>Design</span> Practice
        </h1>

        <div className="rule mt-8 max-w-xs" />
      </section>

      {/* ── Project grid ── */}
      <section className="px-6 pb-24 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {teasers.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
