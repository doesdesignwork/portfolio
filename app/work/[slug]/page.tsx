import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortfolioImage } from "@/app/components/portfolio-image";
import { projects } from "@/app/data/projects";
import { lastModified, siteUrl } from "@/lib/site";
import styles from "./project.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

const serviceLinks = [
  {
    href: "/services/brand-identity-design-singapore/",
    label: "Brand identity design in Singapore",
    signals: ["Brand", "Identity", "Naming", "Campaign"],
  },
  {
    href: "/services/experiential-exhibition-design-singapore/",
    label: "Experiential and exhibition design in Singapore",
    signals: ["Experiential", "Exhibition", "Environmental"],
  },
  {
    href: "/services/packaging-product-design-singapore/",
    label: "Packaging and product visualisation in Singapore",
    signals: ["Packaging", "Product", "3D Visualisation", "Label", "FMCG"],
  },
];

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
      images: project.images.map((image, imageIndex) => ({
        url: image,
        alt: project.imageAlts[imageIndex] ?? project.alt,
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
  const relatedServices = serviceLinks.filter((service) =>
    service.signals.some((signal) => project.discipline.includes(signal)),
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${canonicalUrl}#creative-work`,
    url: canonicalUrl,
    name: project.seoTitle,
    headline: project.title,
    description: project.summary,
    image: project.images.map((image, imageIndex) => ({
      "@type": "ImageObject",
      contentUrl: `${siteUrl}${image}`,
      url: `${siteUrl}${image}`,
      name: project.imageAlts[imageIndex] ?? project.alt,
      caption: project.imageAlts[imageIndex] ?? project.alt,
      representativeOfPage: imageIndex === 0,
      creator: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Gerard Teo",
      },
      creditText: project.credit ?? "Gerard Teo portfolio",
      copyrightNotice: "Copyright Gerard Teo and respective project owners",
    })),
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
    <div className={`${styles.page} site-page site-page--project`}>
      <a className={styles.skipLink} href="#case-study">Skip to case study</a>

      <header className={`${styles.header} brand-header`}>
        <Link
          className={`${styles.brand} brand-wordmark`}
          href="/"
          aria-label="Gerard Teo, portfolio home"
        >
          <Image
            src="/assets/g-image.webp"
            alt=""
            width={640}
            height={640}
            sizes="48px"
            priority
          />
          <span>Gerard Teo</span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/cv/">CV</Link>
        </nav>
      </header>

      <aside className={`${styles.margin} brand-project-margin`} aria-label="Case-study index">
        <p>{project.client}</p>
        <Link href="/#work">All work</Link>
      </aside>

      <main id="case-study">
        <nav className={`${styles.breadcrumb} brand-breadcrumb`} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#work">Work</Link>
          <span>/</span>
          <span>{project.client}</span>
        </nav>

        <article>
          <header className={`${styles.hero} brand-project-hero`}>
            <div className={styles.heroMeta}>
              <p>{project.context}</p>
              <p>{project.discipline}</p>
            </div>

            <div className={`${styles.heroTitle} brand-project-title`}>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
            </div>

            <dl className={`${styles.facts} brand-project-facts`}>
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              {project.credit && (
                <div>
                  <dt>Credit</dt>
                  <dd>{project.credit}</dd>
                </div>
              )}
              {project.year && (
                <div>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
            </dl>
          </header>

          <figure className={styles.leadImage}>
            <PortfolioImage
              src={project.images[0]}
              alt={project.imageAlts[0] ?? project.alt}
              sizes="(max-width: 760px) 100vw, 88vw"
              priority
            />
            <figcaption>{project.imageAlts[0] ?? project.alt}</figcaption>
          </figure>

          <section className={`${styles.story} brand-project-story`} aria-labelledby="case-thinking">
            <header>
              <p>Case-study thinking</p>
              <h2 id="case-thinking">The thinking behind the work.</h2>
            </header>

            <div className={`${styles.storyFields} brand-story-fields`}>
              <section>
                <h3>The challenge</h3>
                <p>{project.challenge}</p>
              </section>
              <section>
                <h3>The decision</h3>
                <p>{project.approach}</p>
              </section>
              <section>
                <h3>The system</h3>
                <p>{project.deliverables}</p>
              </section>
              <section>
                <h3>The outcome</h3>
                <p>{project.outcome}</p>
              </section>
            </div>
          </section>

          {project.images.length > 1 && (
            <section className={`${styles.gallery} brand-project-gallery`} aria-labelledby="work-shown-title">
              <header>
                <p>Applications / {project.images.length - 1} additional view{project.images.length === 2 ? "" : "s"}</p>
                <h2 id="work-shown-title">The system in use.</h2>
              </header>

              <div className={styles.imageGrid}>
                {project.images.slice(1).map((image, imageIndex) => {
                  const actualIndex = imageIndex + 1;
                  return (
                    <figure key={image}>
                      <PortfolioImage
                        src={image}
                        alt={project.imageAlts[actualIndex] ?? project.alt}
                        sizes="(max-width: 760px) 100vw, 50vw"
                      />
                      <figcaption>
                        {project.imageAlts[actualIndex] ?? project.alt}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </section>
          )}

          {relatedServices.length > 0 && (
            <nav
              className={`${styles.relatedServices} brand-related-services`}
              aria-label="Related expertise"
            >
              <p>Related expertise</p>
              <div>
                {relatedServices.map((service) => (
                  <Link key={service.href} href={service.href}>
                    {service.label}
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </nav>
          )}

          <nav className={`${styles.projectNav} brand-project-nav`} aria-label="Other case studies">
            <Link href={`/work/${previous.slug}/`}>
              <small>Previous case study</small>
              <strong>{previous.client}</strong>
              <span>{previous.title}</span>
            </Link>
            <Link href={`/work/${next.slug}/`}>
              <small>Next case study</small>
              <strong>{next.client}</strong>
              <span>{next.title}</span>
            </Link>
          </nav>
        </article>

        <section className={`${styles.cta} brand-cta brand-cta--signal`}>
          <p>Planning the next project?</p>
          <h2>Bring the problem. I’ll help build the system.</h2>
          <a href="mailto:g@doesdesignwork.com">Email Gerard ↗</a>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
