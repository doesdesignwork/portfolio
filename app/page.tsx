import { getAllProjectTeasers } from '@/lib/mockData';
import ProjectCard from '@/components/ProjectCard';
import HomeHero from '@/components/HomeHero';
import { ProjectTeaser } from '@/types/project';

export default function HomePage() {
  const teasers = getAllProjectTeasers() as ProjectTeaser[];

  return (
    <main>
      {/* ── Hero header with scroll-drift parallax ── */}
      <HomeHero />

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
