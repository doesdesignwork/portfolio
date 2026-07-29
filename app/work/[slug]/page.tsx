import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteriorHeader } from "@/app/components/interior-header";
import { projects } from "@/app/data/projects";
import { lastModified, siteUrl } from "@/lib/site";
import styles from "@/app/editorial-pages.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return {
    title: project.seoTitle,
    description: project.summary,
    keywords: [
      project.primaryKeyword,
      ...project.discipline.split(" · "),
      "Gerard Teo",
    ],
    alternates: {
      canonical: `/work/${project.slug}/`,
    },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}/`,
      title: project.seoTitle,
      description: project.summary,
      images: project.images.map((image) => ({
        url: image,
        alt: project.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle,
      description: project.summary,
      images: [project.images[0]],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const canonicalUrl = `${siteUrl}/work/${project.slug}/`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#creative-work`,
    url: canonicalUrl,
    name: project.seoTitle,
    headline: project.title,
    description: project.summary,
    image: project.images.map((image) => `${siteUrl}${image}`),
    keywords: [project.primaryKeyword, ...project.discipline.split(" · ")],
    contributor: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Gerard Teo",
    },
    creditText: project.credit,
    dateCreated: project.year,
    dateModified: lastModified,
    inLanguage: "en-SG",
  };

  return (
    <div className={styles.page}>
      <InteriorHeader />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/#work">Work</Link><span>/</span><span>{project.client}</span>
        </nav>

        <article>
          <header className={styles.hero}>
            <p className={styles.kicker}>{project.number} / {project.context}</p>
            <h1>{project.seoTitle}</h1>
            <p className={styles.deck}>{project.summary}</p>
            <dl className={styles.facts}>
              <div><dt>My responsibility</dt><dd>{project.role}</dd></div>
              <div><dt>Disciplines</dt><dd>{project.discipline}</dd></div>
              {project.credit && <div><dt>Credit</dt><dd>{project.credit}</dd></div>}
              {project.year && <div><dt>Year</dt><dd>{project.year}</dd></div>}
            </dl>
          </header>

          <div className={styles.caseFields}>
            <section><h2>Business problem</h2><p>{project.challenge}</p></section>
            <section><h2>My responsibility</h2><p>{project.role}</p></section>
            <section><h2>Strategic decision</h2><p>{project.approach}</p></section>
            <section><h2>What was produced</h2><p>{project.deliverables}</p></section>
            <section><h2>What changed</h2><p>{project.outcome}</p></section>
          </div>

          <section className={styles.gallery} aria-labelledby="work-shown-title">
            <div className={styles.sectionHead}>
              <h2 id="work-shown-title">Work shown</h2>
              <p>{project.images.length} image{project.images.length === 1 ? "" : "s"}</p>
            </div>
            <div className={styles.imageGrid}>
              {project.images.map((image, imageIndex) => (
                <figure key={image}>
                  <Image
                    src={image}
                    alt={`${project.alt}, view ${imageIndex + 1} of ${project.images.length}`}
                    width={1800}
                    height={1400}
                    sizes="(max-width: 760px) 100vw, 50vw"
                    unoptimized
                  />
                  <figcaption>{project.client} / {String(imageIndex + 1).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <nav className={styles.projectNav} aria-label="Other case studies">
            <Link href={`/work/${previous.slug}/`}><small>Previous case study</small><strong>{previous.client}</strong></Link>
            <Link href={`/work/${next.slug}/`}><small>Next case study</small><strong>{next.client}</strong></Link>
          </nav>
        </article>

        <section className={styles.cta}>
          <h2>Have a role or a brief worth solving?</h2>
          <a href="mailto:g@doesdesignwork.com">Email Gerard</a>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
