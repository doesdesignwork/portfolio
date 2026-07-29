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
        ? [{ url: leadProject.images[0], alt: leadProject.alt }]
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
    provider: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Gerard Teo",
      jobTitle: "Art Director and Senior Brand Designer",
    },
  };

  return (
    <div className={styles.page}>
      <InteriorHeader />
      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Services</span>
        </nav>

        <header className={styles.hero}>
          <p className={styles.kicker}>Gerard Teo / Senior creative direction and hands-on design</p>
          <h1>{service.title}</h1>
          <p className={styles.deck}>{service.description}</p>
        </header>

        <section className={styles.serviceIntro}>
          <h2>How I help</h2>
          <p>{service.intro}</p>
        </section>

        <div className={styles.serviceGrid}>
          <section className={styles.serviceBlock}>
            <h2>Problems I help solve</h2>
            <ul>{service.problems.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className={styles.serviceBlock}>
            <h2>What I can produce</h2>
            <ul>{service.scope.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>

        <section className={styles.approach}>
          <h2>Working approach</h2>
          <p>{service.approach}</p>
        </section>

        <section className={styles.proof} aria-labelledby="proof-title">
          <div className={styles.sectionHead}>
            <h2 id="proof-title">Relevant proof</h2>
            <p>{proofProjects.length} selected case studies</p>
          </div>
          <div className={styles.proofGrid}>
            {proofProjects.map((project) => (
              <Link key={project.number} className={styles.proofCard} href={`/work/${project.slug}/`}>
                <small>{project.number} / {project.primaryKeyword}</small>
                <strong>{project.client}</strong>
                <span>{project.role}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Need senior thinking without losing hands-on craft?</h2>
          <a href="mailto:g@doesdesignwork.com">Discuss a project with Gerard</a>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
