import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteriorHeader } from "@/app/components/interior-header";
import { projects } from "@/app/data/projects";
import { services } from "@/app/data/services";
import { siteUrl } from "@/lib/site";
import styles from "@/app/editorial-pages.module.css";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const leadProject = projects.find(
    (project) => project.number === service.proofProjectNumbers[0],
  );

  return {
    title: service.title,
    description: service.description,
    keywords: [service.primaryKeyword, ...service.supportingKeywords],
    alternates: {
      canonical: `/services/${service.slug}/`,
    },
    openGraph: {
      type: "website",
      url: `/services/${service.slug}/`,
      title: service.title,
      description: service.description,
      images: leadProject
        ? [{ url: leadProject.images[0], alt: leadProject.imageAlts[0] ?? leadProject.alt }]
        : undefined,
    },
    twitter: leadProject
      ? {
          card: "summary_large_image",
          title: service.title,
          description: service.description,
          images: [leadProject.images[0]],
        }
      : undefined,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const proofProjects = service.proofProjectNumbers
    .map((number) => projects.find((project) => project.number === number))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const canonicalUrl = `${siteUrl}/services/${service.slug}/`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    url: canonicalUrl,
    name: service.title,
    serviceType: service.primaryKeyword,
    description: service.description,
    areaServed: {
      "@type": "Country",
      name: "Singapore",
    },
    mainEntityOfPage: canonicalUrl,
    keywords: [service.primaryKeyword, ...service.supportingKeywords],
    isRelatedTo: proofProjects.map((project) => ({
      "@id": `${siteUrl}/work/${project.slug}/#creative-work`,
    })),
    provider: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Gerard Teo",
      jobTitle: "Art Director and Senior Brand Designer",
    },
  };

  return (
    <div className={`${styles.page} site-page site-page--interior site-page--service`}>
      <InteriorHeader />
      <main className={`${styles.main} brand-main`}>
        <nav className={`${styles.breadcrumb} brand-breadcrumb`} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Services</span>
        </nav>

        <header className={`${styles.hero} brand-interior-hero`}>
          <p>Gerard Teo / {service.primaryKeyword}</p>
          <h1>{service.title}</h1>
          <p className={`${styles.deck} brand-deck`}>{service.description}</p>
        </header>

        <section className={`${styles.serviceIntro} brand-service-intro`}>
          <h2>Where I add value</h2>
          <p>{service.intro}</p>
        </section>

        <div className={`${styles.serviceGrid} brand-service-grid`}>
          <section className={`${styles.serviceBlock} brand-service-block`}>
            <h2>Problems I help solve</h2>
            <ul>{service.problems.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className={`${styles.serviceBlock} brand-service-block`}>
            <h2>What I can produce</h2>
            <ul>{service.scope.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>

        <section className={`${styles.approach} brand-service-approach`}>
          <h2>Working method</h2>
          <p>{service.approach}</p>
        </section>

        <section className={`${styles.proof} brand-proof`} aria-labelledby="proof-title">
          <div className={`${styles.sectionHead} brand-section-head`}>
            <h2 id="proof-title">Relevant proof</h2>
            <p>Selected case studies connected to this capability.</p>
          </div>
          <div className={`${styles.proofGrid} brand-proof-grid`}>
            {proofProjects.map((project) => (
              <Link
                key={project.slug}
                className={`${styles.proofCard} brand-proof-card`}
                href={`/work/${project.slug}/`}
              >
                <small>{project.primaryKeyword}</small>
                <strong>{project.client}</strong>
                <span>{project.role}</span>
                <span>{project.outcome}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.cta} brand-cta`}>
          <p>Have a project in this area?</p>
          <h2>Let’s turn the requirement into a usable system.</h2>
          <a href="mailto:g@doesdesignwork.com">Discuss the project</a>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
