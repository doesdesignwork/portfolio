import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortfolioImage } from "@/app/components/portfolio-image";
import { projects } from "@/app/data/projects";
import { getImageDimensions } from "@/app/lib/image-dimensions";
import { lastModified, siteUrl } from "@/lib/site";
import styles from "./project.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

type StoryLanguage = {
  kicker: string;
  title: string;
  challenge: string;
  approach: string;
  deliverables: string;
  outcome: string;
  gallery: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

const getStoryLanguage = (discipline: string): StoryLanguage => {
  if (
    discipline.includes("Experiential") ||
    discipline.includes("Exhibition") ||
    discipline.includes("Environmental")
  ) {
    return {
      kicker: "Experience logic",
      title: "How the space was organised around the visitor.",
      challenge: "The visitor problem",
      approach: "Journey and hierarchy",
      deliverables: "What shaped the environment",
      outcome: "What the design changed",
      gallery: "See the experience in use.",
    };
  }

  if (
    discipline.includes("Packaging") ||
    discipline.includes("FMCG") ||
    discipline.includes("Product Range") ||
    discipline.includes("Label Design")
  ) {
    return {
      kicker: "Range logic",
      title: "How the system created difference without losing recognition.",
      challenge: "The shelf problem",
      approach: "The range system",
      deliverables: "What changed across the pack",
      outcome: "The design outcome",
      gallery: "See the range in use.",
    };
  }

  if (
    discipline.includes("Brand") ||
    discipline.includes("Identity") ||
    discipline.includes("Naming") ||
    discipline.includes("Campaign")
  ) {
    return {
      kicker: "System logic",
      title: "How the identity idea became a usable system.",
      challenge: "The brand problem",
      approach: "The core idea",
      deliverables: "The system in use",
      outcome: "The design outcome",
      gallery: "See the system in use.",
    };
  }

  if (discipline.includes("Product Design") || discipline.includes("Product Concepts")) {
    return {
      kicker: "Product expression",
      title: "How the idea was built into the object people would actually meet.",
      challenge: "The product problem",
      approach: "The design logic",
      deliverables: "What was developed",
      outcome: "The review value",
      gallery: "See the product direction in use.",
    };
  }

  if (discipline.includes("3D Visualisation")) {
    return {
      kicker: "Concept logic",
      title: "How an abstract proposition became something people could evaluate.",
      challenge: "The communication problem",
      approach: "The visualisation logic",
      deliverables: "What was made visible",
      outcome: "The review value",
      gallery: "See the concept in use.",
    };
  }

  return {
    kicker: "How the work came together",
    title: "What needed solving, and how I approached it.",
    challenge: "The brief",
    approach: "The idea",
    deliverables: "What I made",
    outcome: "What the design changed",
    gallery: "See the idea in use.",
  };
};

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
  const leadImageDimensions = getImageDimensions(project.images[0]);
  const storyLanguage = getStoryLanguage(project.discipline);

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
                <dt>My role</dt>
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
            <div
              data-captioned-image
              style={{
                width: "100%",
                maxWidth: leadImageDimensions.width,
                marginInline: "auto",
              }}
            >
              <PortfolioImage
                src={project.images[0]}
                alt={project.imageAlts[0] ?? project.alt}
                sizes="(max-width: 760px) 100vw, 88vw"
                priority
                capToSource={false}
              />
              <figcaption>{project.imageAlts[0] ?? project.alt}</figcaption>
            </div>
          </figure>

          <section className={`${styles.story} brand-project-story`} aria-labelledby="case-thinking">
            <header>
              <p>{storyLanguage.kicker}</p>
              <h2 id="case-thinking">{storyLanguage.title}</h2>
            </header>

            <div className={`${styles.storyFields} brand-story-fields`}>
              <section>
                <h3>{storyLanguage.challenge}</h3>
                <p>{project.challenge}</p>
              </section>
              <section>
                <h3>{storyLanguage.approach}</h3>
                <p>{project.approach}</p>
              </section>
              <section>
                <h3>{storyLanguage.deliverables}</h3>
                <p>{project.deliverables}</p>
              </section>
              <section>
                <h3>{storyLanguage.outcome}</h3>
                <p>{project.outcome}</p>
              </section>
            </div>
          </section>

          {project.images.length > 1 && (
            <section className={`${styles.gallery} brand-project-gallery`} aria-labelledby="work-shown-title">
              <header>
                <p>{project.images.length - 1} more view{project.images.length === 2 ? "" : "s"} from the project</p>
                <h2 id="work-shown-title">{storyLanguage.gallery}</h2>
              </header>

              <div className={styles.imageGrid}>
                {project.images.slice(1).map((image, imageIndex) => {
                  const actualIndex = imageIndex + 1;
                  const imageDimensions = getImageDimensions(image);

                  return (
                    <figure
                      key={image}
                      data-captioned-image
                      style={{
                        width: "100%",
                        maxWidth: imageDimensions.width,
                        justifySelf: "center",
                      }}
                    >
                      <PortfolioImage
                        src={image}
                        alt={project.imageAlts[actualIndex] ?? project.alt}
                        sizes="(max-width: 760px) 100vw, 50vw"
                        capToSource={false}
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
              <p>Related work</p>
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
              <small>Previous project</small>
              <strong>{previous.client}</strong>
              <span>{previous.title}</span>
            </Link>
            <Link href={`/work/${next.slug}/`}>
              <small>Next project</small>
              <strong>{next.client}</strong>
              <span>{next.title}</span>
            </Link>
          </nav>
        </article>

        <section className={`${styles.cta} brand-cta brand-cta--signal`}>
          <p>Got a project taking shape?</p>
          <h2>Tell me what needs solving. We can work out the right way to build it.</h2>
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
