import { getProjectBySlug, getAllProjectTeasers } from '@/lib/mockData';
import { ContentBlock } from '@/types/project';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getAllProjectTeasers().map((p) => ({ slug: p.slug }));
}

function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'text':
      return <p key={index}>{block.content}</p>;
    case 'media':
      return (
        <figure key={index}>
          <p>[{block.asset.type.toUpperCase()}] {block.asset.altText}</p>
          <p>URL: {block.asset.url}</p>
          <p>Dimensions: {block.asset.width} × {block.asset.height}</p>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'quote':
      return (
        <blockquote key={index}>
          <p>&ldquo;{block.text}&rdquo;</p>
          {block.author && <cite>— {block.author}</cite>}
        </blockquote>
      );
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      {/* Header */}
      <header>
        <p>{project.category}</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </header>

      {/* Metadata */}
      <section>
        <h2>Project Details</h2>
        <dl>
          <dt>Client</dt>
          <dd>{project.metadata.client}</dd>

          <dt>Role</dt>
          <dd>{project.metadata.role.join(', ')}</dd>

          <dt>Tools</dt>
          <dd>{project.metadata.tools.join(', ')}</dd>

          <dt>Duration</dt>
          <dd>{project.metadata.duration}</dd>
        </dl>
      </section>

      {/* Case Study */}
      <section>
        <h2>The Problem</h2>
        <p>{project.caseStudy.problem}</p>

        <h2>The Solution</h2>
        <p>{project.caseStudy.solution}</p>

        <h2>Process</h2>
        {project.caseStudy.processBlocks.map((block, i) =>
          renderContentBlock(block, i)
        )}

        <h2>Results</h2>
        <ul>
          {project.caseStudy.results.map((result, i) => (
            <li key={i}>{result}</li>
          ))}
        </ul>
      </section>

      {/* Thumbnail */}
      <section>
        <h2>Thumbnail</h2>
        <p>[{project.interactionData.thumbnail.type.toUpperCase()}] {project.interactionData.thumbnail.altText}</p>
        <p>Accent colour: {project.interactionData.accentColor}</p>
        {project.interactionData.hoverVideoUrl && (
          <p>Hover video: {project.interactionData.hoverVideoUrl}</p>
        )}
      </section>

      {/* Gallery */}
      <section>
        <h2>Gallery</h2>
        <ul>
          {project.gallery.map((asset, i) => (
            <li key={i}>
              <p>[{asset.type.toUpperCase()}] {asset.altText}</p>
              <p>URL: {asset.url}</p>
              <p>Dimensions: {asset.width} × {asset.height}</p>
              {asset.blurhash && <p>Blurhash: {asset.blurhash}</p>}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
