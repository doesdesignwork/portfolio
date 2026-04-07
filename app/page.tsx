import Link from 'next/link';
import { getAllProjectTeasers } from '@/lib/mockData';

export default function HomePage() {
  const teasers = getAllProjectTeasers();

  return (
    <section>
      <h1>Selected Work</h1>
      <ul>
        {teasers.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.slug}`}>
              <p>{project.title}</p>
              <p>{project.category}</p>
              <p>Thumbnail: {project.interactionData.thumbnail.altText}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
