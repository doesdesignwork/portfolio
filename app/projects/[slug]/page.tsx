import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectTeasers } from '@/lib/mockData';
import { ContentBlock } from '@/types/project';
import CaseStudyHero from '@/components/CaseStudyHero';
import { SectionReveal, RevealItem } from '@/components/SectionReveal';

export function generateStaticParams() {
  return getAllProjectTeasers().map((p) => ({ slug: p.slug }));
}

function ContentBlockRenderer({ block, index }: { block: ContentBlock; index: number }) {
  if (block.type === 'text') {
    return (
      <SectionReveal stagger={false}>
        <p
          className="text-base leading-8 md:text-lg"
          style={{ color: 'var(--color-text-secondary)', maxWidth: '68ch' }}
        >
          {block.content}
        </p>
      </SectionReveal>
    );
  }

  if (block.type === 'media') {
    return (
      <SectionReveal stagger={false}>
        <figure className="my-2">
          <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image
              src={block.asset.url}
              alt={block.asset.altText}
              fill
              sizes="(max-width:768px) 100vw, 80vw"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption
              className="mt-3 text-xs tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      </SectionReveal>
    );
  }

  if (block.type === 'quote') {
    return (
      <SectionReveal stagger={false}>
        <blockquote
          className="border-l-2 pl-8 my-4"
          style={{ borderColor: 'var(--color-neon-violet)' }}
        >
          <p
            className="text-xl md:text-2xl font-[300] leading-relaxed italic"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
              maxWidth: '100%',
            }}
          >
            &ldquo;{block.text}&rdquo;
          </p>
          {block.author && (
            <cite
              className="block mt-4 text-xs tracking-widest uppercase not-italic"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              — {block.author}
            </cite>
          )}
        </blockquote>
      </SectionReveal>
    );
  }

  return null;
}

const sectionLabel = (text: string) => (
  <p
    className="text-xs tracking-[0.2em] uppercase mb-4"
    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
  >
    {text}
  </p>
);

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { title, category, description, metadata, caseStudy, interactionData, gallery } = project;

  return (
    <main>
      {/* ── Hero ── */}
      <CaseStudyHero
        title={title}
        category={category}
        thumbnail={interactionData.thumbnail}
        accentColor={interactionData.accentColor}
      />

      {/* ── Content container ── */}
      <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-24">

        {/* ── Description ── */}
        <section className="py-16 md:py-24">
          <SectionReveal stagger={false}>
            <p
              className="text-xl md:text-2xl font-[300] leading-relaxed"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.03em',
                maxWidth: '100%',
              }}
            >
              {description}
            </p>
          </SectionReveal>
        </section>

        <div className="rule" />

        {/* ── Metadata ── */}
        <section className="py-14 md:py-20">
          <SectionReveal className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <RevealItem>
              {sectionLabel('Client')}
              <p
                className="text-sm font-[500]"
                style={{ color: 'var(--color-text-primary)', maxWidth: '100%' }}
              >
                {metadata.client}
              </p>
            </RevealItem>
            <RevealItem>
              {sectionLabel('Role')}
              <ul className="flex flex-col gap-1">
                {metadata.role.map((r) => (
                  <li
                    key={r}
                    className="text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </RevealItem>
            <RevealItem>
              {sectionLabel('Tools')}
              <ul className="flex flex-col gap-1">
                {metadata.tools.map((t) => (
                  <li
                    key={t}
                    className="text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </RevealItem>
            <RevealItem>
              {sectionLabel('Duration')}
              <p
                className="text-sm font-[500]"
                style={{ color: 'var(--color-text-primary)', maxWidth: '100%' }}
              >
                {metadata.duration}
              </p>
            </RevealItem>
          </SectionReveal>
        </section>

        <div className="rule" />

        {/* ── Problem ── */}
        <section className="py-14 md:py-20">
          {sectionLabel('The Problem')}
          <SectionReveal stagger={false}>
            <p
              className="text-base leading-8 md:text-lg"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {caseStudy.problem}
            </p>
          </SectionReveal>
        </section>

        <div className="rule" />

        {/* ── Solution ── */}
        <section className="py-14 md:py-20">
          {sectionLabel('The Solution')}
          <SectionReveal stagger={false}>
            <p
              className="text-base leading-8 md:text-lg"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {caseStudy.solution}
            </p>
          </SectionReveal>
        </section>
      </div>

      {/* ── Process blocks (full-bleed for media) ── */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
          {sectionLabel('Process')}
        </div>
        <div className="flex flex-col gap-12 mt-8">
          {caseStudy.processBlocks.map((block, i) =>
            block.type === 'media' ? (
              /* Full-bleed media */
              <div key={i} className="px-0">
                <ContentBlockRenderer block={block} index={i} />
              </div>
            ) : (
              <div key={i} className="mx-auto w-full max-w-5xl px-6 md:px-16 lg:px-24">
                <ContentBlockRenderer block={block} index={i} />
              </div>
            )
          )}
        </div>
      </section>

      {/* ── Results ── */}
      <div className="mx-auto max-w-5xl px-6 md:px-16 lg:px-24">
        <div className="rule mt-16" />

        <section className="py-14 md:py-20">
          {sectionLabel('Results')}
          <SectionReveal className="grid gap-6 mt-6 sm:grid-cols-2">
            {caseStudy.results.map((result, i) => (
              <RevealItem key={i}>
                <div
                  className="p-6 rounded-sm"
                  style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border-subtle)' }}
                >
                  <span
                    className="text-3xl font-[100] block mb-2"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: interactionData.accentColor,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p
                    className="text-sm leading-6"
                    style={{ color: 'var(--color-text-secondary)', maxWidth: '100%' }}
                  >
                    {result}
                  </p>
                </div>
              </RevealItem>
            ))}
          </SectionReveal>
        </section>

        {/* ── Gallery ── */}
        {gallery.length > 0 && (
          <>
            <div className="rule" />
            <section className="py-14 md:py-20">
              {sectionLabel('Gallery')}
              <SectionReveal className="grid gap-4 mt-6 sm:grid-cols-2">
                {gallery.map((asset, i) => (
                  <RevealItem key={i}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <Image
                        src={asset.url}
                        alt={asset.altText}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                      />
                    </div>
                  </RevealItem>
                ))}
              </SectionReveal>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
