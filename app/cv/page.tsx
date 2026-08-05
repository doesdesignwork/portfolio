import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHeader } from "@/app/components/interior-header";
import { lastModified, siteUrl } from "@/lib/site";
import styles from "@/app/editorial-pages.module.css";

export const metadata: Metadata = {
  title: "CV | Art Director & Senior Brand Designer Singapore",
  description:
    "Gerard Teo is a Singapore-based art director and senior brand designer with 26+ years across identity, campaigns, exhibitions, packaging, 3D visualisation and production.",
  keywords: [
    "Gerard Teo CV",
    "art director Singapore",
    "senior brand designer Singapore",
    "creative lead Singapore",
    "creative director Singapore",
  ],
  alternates: {
    canonical: "/cv/",
  },
  openGraph: {
    type: "profile",
    url: "/cv/",
    title: "Gerard Teo CV | Art Director & Senior Brand Designer",
    description:
      "26+ years making brand identities, campaigns, exhibitions, packaging and creative production work clearly across different formats.",
  },
};

const currentRoles = [
  {
    dates: "Jan 2026 — Present",
    title: "Graphic Designer",
    company: "C Square Creative Communications / C2 Global Exhibitions, Singapore",
    description:
      "Create key visuals and campaign materials for exhibitions, conferences, corporate events and experiential projects.",
  },
  {
    dates: "Jan 2014 — Present",
    title: "Independent Creative Lead / Designer",
    company: "The Fat Oracle (TFO) — Independent practice",
    description:
      "Work directly with clients on brand identity, packaging, campaigns and 3D visualisation, from the first idea through to production.",
  },
];

const selectedExperience = [
  {
    dates: "Sep 2020 — Apr 2024",
    title: "Freelance Designer",
    company: "Northstar Travel Media, Singapore",
    description:
      "Turned approved concepts and wireframes into responsive email campaigns, final templates and production-ready assets.",
  },
  {
    dates: "Sep 2021 — Nov 2022",
    title: "Content Designer — Apple Account",
    company: "Hogarth Worldwide, Singapore",
    description:
      "Adapted and checked Apple retail and digital campaign materials against detailed global brand and production standards.",
  },
  {
    dates: "Sep 2013 — Nov 2014",
    title: "Senior Designer & 3D Visualisation Lead",
    company: "Crepuscule Asia, Singapore",
    description:
      "Combined design direction with hands-on brand, packaging and 3D visualisation work for Unilever and L'Oréal.",
  },
  {
    dates: "May 2011 — Nov 2011",
    title: "Design Director",
    company: "Orbital Group Pte Ltd, Singapore",
    description:
      "Led pitch and campaign design for BlackBerry, Munich Automobiles and Pacific Healthcare.",
  },
  {
    dates: "Jan 2004 — Jul 2009",
    title: "Co-Founder / Creative Director",
    company: "Blacksheep Communications Pte Ltd, Singapore",
    description:
      "Co-founded the studio, grew the design team from 3 to 15 people and remained closely involved with the work, clients and production.",
  },
  {
    dates: "Jan 2001 — Jan 2009",
    title: "Creative Designer to Creative Director",
    company: "CP&GD Design Communications Pte Ltd, Singapore",
    description:
      "Progressed from hands-on designer to creative lead across print, outdoor and digital campaigns.",
  },
];

function ExperienceSection({
  title,
  roles,
}: {
  title: string;
  roles: typeof currentRoles;
}) {
  return (
    <section className={`${styles.cvSection} brand-cv-section`}>
      <h2>{title}</h2>
      <div>
        {roles.map((role) => (
          <article
            className={`${styles.cvRole} brand-cv-role`}
            key={`${role.dates}-${role.title}`}
          >
            <p>{role.dates}</p>
            <div>
              <h3>{role.title}</h3>
              <p>{role.company}</p>
              <p>{role.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/cv/#profile-page`,
  url: `${siteUrl}/cv/`,
  name: "Gerard Teo CV - Art Director and Senior Brand Designer",
  dateModified: lastModified,
  inLanguage: "en-SG",
  mainEntity: {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Gerard Teo",
    jobTitle: "Art Director and Senior Brand Designer",
    alternateName: "Creative Lead",
    email: "mailto:g@doesdesignwork.com",
    telephone: "+65 9878 2541",
    url: siteUrl,
    sameAs: ["https://www.linkedin.com/in/gerard-teo-0b106429/"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SG",
      addressLocality: "Singapore",
    },
    knowsAbout: [
      "Creative direction",
      "Brand identity",
      "Campaign design",
      "Experiential design",
      "Exhibition design",
      "Packaging design",
      "3D visualisation",
      "UX design",
    ],
  },
};

export default function CvPage() {
  return (
    <div className={`${styles.page} site-page site-page--interior site-page--cv`}>
      <InteriorHeader />
      <main className={`${styles.main} ${styles.cvMain} brand-main`}>
        <nav className={`${styles.breadcrumb} brand-breadcrumb`} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>CV</span>
        </nav>

        <header className={`${styles.hero} brand-interior-hero brand-cv-hero`}>
          <p>Gerard Teo / CV / Singapore / Updated August 2026</p>
          <h1>Gerard Teo</h1>
          <p className={`${styles.cvTitle} brand-cv-title`}>
            Art Director and Senior Brand Designer
            <span>Creative lead / Hands-on maker</span>
          </p>
          <p className={`${styles.deck} brand-deck`}>
            I have spent 26+ years working across agency networks, independent practice
            and in-house teams. I help make the brief clearer, set the visual direction
            and stay close enough to production that the original idea survives.
          </p>
          <div className={`${styles.cvActions} brand-action-row`}>
            <a href="mailto:g@doesdesignwork.com">Email Gerard</a>
            <a
              href="/gerard-teo-creative-lead-senior-designer-cv.pdf"
              download="Gerard_Teo_Creative_Lead_Senior_Designer_CV.pdf"
              type="application/pdf"
            >
              Download CV (PDF)
            </a>
            <Link href="/#work">View selected work</Link>
            <a
              href="https://www.linkedin.com/in/gerard-teo-0b106429/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </header>

        <div className={`${styles.cvLayout} brand-cv-layout`}>
          <div>
            <ExperienceSection title="Current work" roles={currentRoles} />
            <ExperienceSection
              title="Selected experience"
              roles={selectedExperience}
            />
          </div>

          <aside
            className={`${styles.cvSidebar} brand-cv-sidebar`}
            aria-label="Additional CV details"
          >
            <section>
              <h2>Contact</h2>
              <a href="tel:+6598782541">+65 9878 2541</a>
              <a href="mailto:g@doesdesignwork.com">g@doesdesignwork.com</a>
              <a
                href="https://www.linkedin.com/in/gerard-teo-0b106429/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn / Gerard Teo
              </a>
            </section>

            <section>
              <h2>What I bring</h2>
              <ul>
                <li>Creative direction and clearer briefs</li>
                <li>Brand identities and campaign systems</li>
                <li>Events, exhibitions and spatial communication</li>
                <li>Packaging, print and production</li>
                <li>Pitches and stakeholder presentations</li>
                <li>3D visualisation, UX and digital design</li>
              </ul>
            </section>

            <section>
              <h2>Education & development</h2>
              <p>
                <strong>NTU PaCE, 2026</strong>
                <br />
                Advanced Professional Certificate in UX Design & Digital
                Product Management.
              </p>
              <p>
                Course projects included a HealthHub caregiver and
                medical-translation flow, plus an OCBC subscription-management
                sprint.
              </p>
              <p>
                <strong>(SCTP) Associate Data Analyst</strong>
                <br />
                NTUC LearningHub Pte. Ltd. / Attained Jan 2024
              </p>
              <p>
                <strong>Concept Creation-3</strong>
                <br />
                MAGES Institute of Excellence Pte. Ltd. / Attained Mar 2022
              </p>
            </section>

            <section>
              <h2>Selected brands</h2>
              <p>
                Apple, L&apos;Oréal, Unilever, Dow Chemical, Singtel, StarHub,
                BlackBerry, MTV Asia, EMI Music and UOB Travel.
              </p>
            </section>

            <section>
              <h2>Tools</h2>
              <p>Photoshop, Illustrator, InDesign, After Effects and Figma.</p>
              <p>Blender, Cinema 4D, Spline and Webflow.</p>
              <p>ChatGPT, Firefly, Midjourney and Runway.</p>
            </section>
          </aside>
        </div>

        <section className={`${styles.cta} brand-cta`}>
          <p>Looking for a senior creative who still likes making the work?</p>
          <h2>Take a look at the projects, then let’s talk.</h2>
          <a href="mailto:g@doesdesignwork.com">Get in touch</a>
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
