import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHeader } from "@/app/components/interior-header";
import { siteUrl } from "@/lib/site";
import styles from "./healthhub.module.css";

export const metadata: Metadata = {
  title: "HealthHub Caregiver UX Capstone | Gerard Teo",
  description:
    "A UX and digital product capstone exploring how caregiver context, appointments and medical translation could be made clearer inside a HealthHub-style healthcare journey.",
  keywords: [
    "Gerard Teo UX design",
    "HealthHub caregiver UX",
    "caregiver experience design",
    "healthcare UX Singapore",
    "product design case study",
  ],
  alternates: {
    canonical: "/work/healthhub-caregiver-ux/",
  },
  openGraph: {
    type: "article",
    url: "/work/healthhub-caregiver-ux/",
    title: "HealthHub Caregiver UX Capstone | Gerard Teo",
    description:
      "Research, task-flow and prototype work for an NTU PaCE UX and Digital Product Management capstone focused on caregivers.",
  },
};

const flow = [
  {
    number: "01",
    label: "Set the care context",
    detail: "Make it obvious whose healthcare task is being managed before the user enters the flow.",
  },
  {
    number: "02",
    label: "Choose the appointment task",
    detail: "Reduce switching and memory load when the caregiver is acting for a family member.",
  },
  {
    number: "03",
    label: "Translate at the point of need",
    detail: "Bring language support into the task instead of forcing the user to leave the healthcare journey.",
  },
  {
    number: "04",
    label: "Confirm with confidence",
    detail: "Repeat patient, appointment and translated information before the action is completed.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${siteUrl}/work/healthhub-caregiver-ux/#creative-work`,
  url: `${siteUrl}/work/healthhub-caregiver-ux/`,
  name: "HealthHub Caregiver UX Capstone",
  headline: "A caregiver journey designed around context, language and confidence",
  description:
    "NTU PaCE UX and Digital Product Management capstone exploring caregiver appointment and medical-translation flows.",
  creator: {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Gerard Teo",
  },
  educationalUse: "Portfolio case study",
  learningResourceType: "UX design capstone",
  dateCreated: "2026",
  inLanguage: "en-SG",
};

export default function HealthHubCaregiverUxPage() {
  return (
    <div className={`${styles.page} site-page site-page--interior site-page--healthhub`}>
      <InteriorHeader />

      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#work">Work</Link>
          <span>/</span>
          <span>HealthHub caregiver UX</span>
        </nav>

        <article>
          <header className={styles.hero}>
            <div className={styles.heroMeta}>
              <p>NTU PaCE · UX Design & Digital Product Management · 2026</p>
              <p>Course capstone · Concept study, not a commissioned HealthHub feature</p>
            </div>

            <div className={styles.heroTitle}>
              <h1>Caregiving gets harder when the product forgets who you are helping.</h1>
              <p>
                This capstone explored a simple product problem: a caregiver may be logged in
                as themselves while making appointments, reading medical information and
                translating terminology for someone else. The design work focused on keeping
                patient context, language support and confirmation visible through the task.
              </p>
            </div>

            <dl className={styles.facts}>
              <div>
                <dt>My role</dt>
                <dd>Research synthesis, UX framing, task flow, storyboard and Figma prototype</dd>
              </div>
              <div>
                <dt>Methods</dt>
                <dd>Survey, interviews, persona, affinity mapping and flow design</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Academic product concept used to demonstrate UX and product thinking</dd>
              </div>
            </dl>
          </header>

          <section className={styles.flowHero} aria-labelledby="flow-title">
            <header>
              <p>Core interaction model</p>
              <h2 id="flow-title">Context first. Task second.</h2>
            </header>
            <div className={styles.flowGrid}>
              {flow.map((step) => (
                <div className={styles.flowStep} key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.label}</h3>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.story} aria-labelledby="story-title">
            <header>
              <p>Product thinking</p>
              <h2 id="story-title">The useful part was not drawing screens. It was deciding what the interface had to remember.</h2>
            </header>

            <div className={styles.storyGrid}>
              <section>
                <span>01 / Problem</span>
                <h3>A caregiver is not a secondary version of the patient.</h3>
                <p>
                  The journey has two identities in play: the person using the product and
                  the person receiving care. Losing that distinction creates the risk of
                  wrong-context decisions, repeated checking and unnecessary cognitive load.
                </p>
              </section>

              <section>
                <span>02 / Evidence</span>
                <h3>Research was used to find friction before proposing features.</h3>
                <p>
                  The course work combined a screener and survey with short interviews,
                  then grouped observations through affinity mapping. Personas and the
                  storyboard were used to keep the design anchored to a caregiver task
                  rather than to a generic list of healthcare features.
                </p>
              </section>

              <section>
                <span>03 / Design question</span>
                <h3>How might the product reduce context switching for a caregiver?</h3>
                <p>
                  The working answer was not another dashboard. It was a clearer task flow:
                  establish whose care is being managed, keep that context visible, and make
                  translation available exactly where medical language becomes a barrier.
                </p>
              </section>

              <section>
                <span>04 / Product decision</span>
                <h3>Translation belongs inside the task, not beside it.</h3>
                <p>
                  Treating translation as a separate destination would add another layer of
                  navigation. The concept instead places language help at the point where the
                  caregiver is reading or confirming information, so the user can continue
                  without losing the appointment context.
                </p>
              </section>
            </div>
          </section>

          <section className={styles.prototype} aria-labelledby="prototype-title">
            <div className={styles.prototypeCopy}>
              <p>Prototype logic</p>
              <h2 id="prototype-title">One state should answer three questions.</h2>
              <p>
                At important moments the interface should make it easy to verify: who am I
                acting for, what am I about to do, and what does this medical information
                mean in language I understand?
              </p>
            </div>

            <div className={styles.interfaceStudy} aria-label="Conceptual interface state diagram">
              <div className={styles.interfaceBar}>
                <span>Care context</span>
                <strong>Family member selected</strong>
              </div>
              <div className={styles.interfaceBody}>
                <div>
                  <span>Appointment</span>
                  <strong>Review details</strong>
                  <small>Patient context remains visible through the task.</small>
                </div>
                <div className={styles.translationCard}>
                  <span>Language support</span>
                  <strong>Translate medical term</strong>
                  <small>Help appears where the terminology is encountered.</small>
                </div>
              </div>
              <div className={styles.interfaceAction}>
                <span>Confirm for selected family member</span>
                <b>Continue →</b>
              </div>
            </div>
          </section>

          <section className={styles.outcome} aria-labelledby="outcome-title">
            <div>
              <p>Outcome</p>
              <h2 id="outcome-title">A product case study, not a claim that the feature shipped.</h2>
            </div>
            <div>
              <p>
                The capstone moved from research and synthesis into a defined caregiver flow,
                storyboard and Figma prototype. It demonstrates how I now apply the same
                systems thinking used in brand and spatial work to user context, task logic
                and interface decisions.
              </p>
              <p>
                In a production environment, the next step would be structured usability
                testing and measurement around task completion, wrong-context errors,
                translation use and confidence at confirmation.
              </p>
            </div>
          </section>

          <nav className={styles.next} aria-label="Next actions">
            <Link href="/#work">
              <small>Back to portfolio</small>
              <strong>Selected work</strong>
              <span>Brand, product, packaging and experience →</span>
            </Link>
            <Link href="/cv/">
              <small>Background</small>
              <strong>View CV</strong>
              <span>Experience and NTU PaCE training →</span>
            </Link>
          </nav>
        </article>
      </main>

      <footer className={styles.cta}>
        <p>Looking for someone who can bring senior visual craft into product work?</p>
        <h2>I am building that bridge deliberately.</h2>
        <a href="mailto:g@doesdesignwork.com?subject=Product%20design%20or%20UX%20opportunity">
          Discuss a role ↗
        </a>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
