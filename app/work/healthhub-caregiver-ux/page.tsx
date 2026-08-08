import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHeader } from "@/app/components/interior-header";
import { siteUrl } from "@/lib/site";
import styles from "./healthhub.module.css";

export const metadata: Metadata = {
  title: "HealthHub Medical Literacy UX Capstone | Gerard Teo",
  description:
    "An NTU PaCE UX and product capstone exploring how plain-language explanations inside HealthHub-style lab results could reduce the need to leave the app and search for medical terminology.",
  keywords: [
    "Gerard Teo UX design",
    "HealthHub medical literacy",
    "healthcare UX Singapore",
    "lab results UX",
    "caregiver UX research",
    "product design case study",
    "usability testing",
  ],
  alternates: {
    canonical: "/work/healthhub-caregiver-ux/",
  },
  openGraph: {
    type: "article",
    url: "/work/healthhub-caregiver-ux/",
    title: "HealthHub Medical Literacy UX Capstone | Gerard Teo",
    description:
      "Research, prioritisation, prototype and Maze validation for an NTU PaCE healthcare UX capstone focused on understanding lab results in context.",
  },
};

const gapFlow = [
  {
    number: "01",
    label: "Result appears",
    detail: "A caregiver or patient sees a lab result inside the health portal.",
  },
  {
    number: "02",
    label: "Term is unfamiliar",
    detail: "Clinical shorthand such as HbA1c appears without enough plain-language context.",
  },
  {
    number: "03",
    label: "App is abandoned",
    detail: "The user leaves the flow to search the term elsewhere.",
  },
  {
    number: "04",
    label: "Search adds noise",
    detail: "Different sources, terminology and risk framing can create more uncertainty.",
  },
  {
    number: "05",
    label: "Next step is unclear",
    detail: "The result is visible, but the user still has to decide what it means and what to do.",
  },
] as const;

const researchSignals = [
  {
    value: "100%",
    label: "of caregivers in the primary research sample reported Googling unfamiliar medical terms after viewing results",
    note: "Directional sample signal, not a population estimate.",
  },
  {
    value: "70%",
    label: "of interview participants asked for plain-language explanations without being prompted",
    note: "10 interviews were conducted in the capstone research.",
  },
  {
    value: "32 / 76",
    label: "survey respondents identified as caregivers, so caregiver-specific findings were filtered to that group",
    note: "Sample quality changed the priorities more than raw sample size.",
  },
] as const;

const scopeChoices = [
  {
    title: "Appointment booking",
    reason: "A capacity and operations problem. Better screens cannot create more appointment slots.",
  },
  {
    title: "Profile switching",
    reason: "Touches authentication and security flows, which pushed it beyond this capstone scope.",
  },
  {
    title: "Multilingual overhaul",
    reason: "A valuable direction, but one that requires larger content, governance and infrastructure investment.",
  },
] as const;

const validationMetrics = [
  {
    value: "69.2%",
    label: "first-attempt task success",
  },
  {
    value: "13",
    label: "unmoderated Maze participants",
  },
  {
    value: "87.4s",
    label: "average time to find and read the explanation",
  },
] as const;

const roadmap = [
  {
    phase: "Q1",
    title: "Refine & align",
    items: ["Tighten the flow from research and Maze findings", "Clinical/content review and taxonomy", "Define analytics events and success metrics"],
  },
  {
    phase: "Q2",
    title: "Build MVP",
    items: ["Use real lab-result data", "Cover edge cases and accessibility", "Run an internal alpha"],
  },
  {
    phase: "Q3",
    title: "Pilot & iterate",
    items: ["Pilot with caregivers and seniors", "Run moderated usability tests", "Refine guidance, microcopy and navigation"],
  },
  {
    phase: "Q4",
    title: "Scale & govern",
    items: ["Expand to more result types", "Create a content-governance workflow", "Measure comprehension and external-search exits"],
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${siteUrl}/work/healthhub-caregiver-ux/#creative-work`,
  url: `${siteUrl}/work/healthhub-caregiver-ux/`,
  name: "HealthHub Medical Literacy UX Capstone",
  headline: "Put the explanation where the confusion is",
  description:
    "NTU PaCE UX and Digital Product Management capstone using survey research, interviews, prioritisation, prototyping and usability testing to explore plain-language explanations for lab results.",
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
          <span>HealthHub medical literacy</span>
        </nav>

        <article>
          <header className={styles.hero}>
            <div className={styles.heroMeta}>
              <p>NTU PaCE · UX Design &amp; Digital Product Management · 2026</p>
              <p>Academic capstone · Concept study, not a commissioned or shipped HealthHub feature</p>
            </div>

            <div className={styles.heroTitle}>
              <h1>The result was visible. The meaning wasn&apos;t.</h1>
              <p>
                Health portals can show lab results immediately, but clinical shorthand can
                still leave caregivers and patients asking a basic question: what does this
                actually mean? My capstone focused on that moment of confusion rather than
                redesigning the whole product.
              </p>
            </div>

            <dl className={styles.facts} aria-label="Capstone research scope">
              <div>
                <dt>76</dt>
                <dd>survey responses</dd>
              </div>
              <div>
                <dt>10</dt>
                <dd>research interviews</dd>
              </div>
              <div>
                <dt>32</dt>
                <dd>caregivers in the survey sample</dd>
              </div>
              <div>
                <dt>13</dt>
                <dd>Maze usability-test participants</dd>
              </div>
            </dl>
          </header>

          <section className={styles.flowHero} aria-labelledby="gap-title">
            <header>
              <p>The gap</p>
              <h2 id="gap-title">Every unexplained result can become an exit from the product.</h2>
            </header>
            <div className={styles.flowGrid}>
              {gapFlow.map((step) => (
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

          <section className={styles.research} aria-labelledby="research-title">
            <header className={styles.sectionHead}>
              <p>Research signal</p>
              <h2 id="research-title">The request was not “give me more features.” It was “help me understand this.”</h2>
            </header>

            <div className={styles.signalGrid}>
              {researchSignals.map((signal) => (
                <article key={signal.value}>
                  <strong>{signal.value}</strong>
                  <p>{signal.label}</p>
                  <small>{signal.note}</small>
                </article>
              ))}
            </div>

            <blockquote className={styles.quote}>
              <p>“I feel there should be an information icon I can tap to find out what that particular test actually means.”</p>
              <cite>Caregiver interview participant</cite>
            </blockquote>
          </section>

          <section className={styles.decision} aria-labelledby="decision-title">
            <header className={styles.sectionHeadDark}>
              <p>Key product decision</p>
              <h2 id="decision-title">The most important screen was the one I decided not to design.</h2>
            </header>

            <div className={styles.decisionGrid}>
              <article className={styles.chosen}>
                <span>Chosen</span>
                <h3>Medical literacy</h3>
                <p>
                  Every interview surfaced the comprehension problem. It had meaningful stakes,
                  could be addressed at the interface layer, and gave the project a clear
                  before-and-after behaviour to test.
                </p>
                <ul>
                  <li>Repeated, unprompted pain point</li>
                  <li>Comprehension and trust implications</li>
                  <li>UI-solvable within capstone scope</li>
                  <li>Measurable through task testing</li>
                </ul>
              </article>

              <div className={styles.notChosen}>
                <span>Not chosen</span>
                {scopeChoices.map((choice) => (
                  <article key={choice.title}>
                    <h3>{choice.title}</h3>
                    <p>{choice.reason}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.hmw}>
              <span>How might we</span>
              <p>help caregivers and patients understand lab results without ever leaving the app?</p>
            </div>
          </section>

          <section className={styles.prototype} aria-labelledby="solution-title">
            <header className={styles.sectionHead}>
              <p>The solution</p>
              <h2 id="solution-title">One tap. Context where the confusion already is.</h2>
              <span>
                Clinical terms are made visibly tappable. The user opens a plain-language
                explanation without losing the lab-result context or opening an external search.
              </span>
            </header>

            <div className={styles.screenFlow} aria-label="Prototype interaction states based on the capstone Figma flow">
              <div className={styles.screenStage}>
                <span className={styles.screenLabel}>01 · Existing result</span>
                <div className={styles.phone}>
                  <div className={styles.phoneStatus}><b>11:00</b><span>5G</span></div>
                  <div className={styles.phoneHeader}>Lab Report Details</div>
                  <div className={styles.patientBar}><span>Care recipient</span><b>Family profile</b></div>
                  <div className={styles.reportTitle}>Endocrine function</div>
                  <div className={styles.resultCard}>
                    <span>Hb A1c</span>
                    <small>Results</small>
                    <strong>5.3 (%)</strong>
                  </div>
                  <div className={styles.pdfBar}>Download PDF</div>
                </div>
              </div>

              <div className={styles.screenStage}>
                <span className={styles.screenLabel}>02 · Discoverability cue</span>
                <div className={styles.phone}>
                  <div className={styles.phoneStatus}><b>11:00</b><span>5G</span></div>
                  <div className={styles.brandMini}>HealthHub</div>
                  <div className={styles.healthTitle}>Health Reports</div>
                  <div className={styles.guidance}>Did you know? Tap dotted underlined terms to see their definitions.</div>
                  <div className={styles.filterBar}>Search reports, doctors, or conditions…</div>
                  <div className={styles.labCard}>
                    <div><u>Total Cholesterol</u><span>Normal</span></div>
                    <strong>5.2 mmol/L</strong>
                    <small>Normal range &lt; 5.2 mmol/L</small>
                  </div>
                  <div className={styles.labCard}>
                    <div><u>HbA1c</u><span>Normal</span></div>
                    <strong>5.3%</strong>
                    <small>Tap the term for a plain-language explanation.</small>
                  </div>
                </div>
              </div>

              <div className={styles.screenStage}>
                <span className={styles.screenLabel}>03 · Inline explanation</span>
                <div className={`${styles.phone} ${styles.phoneDimmed}`}>
                  <div className={styles.phoneStatus}><b>11:00</b><span>5G</span></div>
                  <div className={styles.brandMini}>HealthHub</div>
                  <div className={styles.healthTitle}>Health Reports</div>
                  <div className={styles.labCardMuted} />
                  <div className={styles.modal}>
                    <span>Lab Test</span>
                    <h3>HbA1c</h3>
                    <p>
                      Shows your average blood sugar level over the past 2–3 months. Used to
                      diagnose and monitor diabetes.
                    </p>
                    <button type="button" tabIndex={-1}>Got it</button>
                  </div>
                </div>
              </div>

              <div className={styles.screenStage}>
                <span className={styles.screenLabel}>04 · Continue in context</span>
                <div className={styles.phone}>
                  <div className={styles.phoneStatus}><b>11:00</b><span>5G</span></div>
                  <div className={styles.brandMini}>HealthHub</div>
                  <div className={styles.healthTitle}>Health Reports</div>
                  <div className={styles.contextBanner}>Explanation closed · lab result still in view</div>
                  <div className={styles.labCardFocus}>
                    <div><u>HbA1c</u><span>Normal</span></div>
                    <strong>5.3%</strong>
                    <small>The user can continue without reconstructing the task after a browser search.</small>
                  </div>
                  <div className={styles.nextAction}>Review another result →</div>
                </div>
              </div>
            </div>

            <p className={styles.governanceNote}>
              <strong>Product dependency:</strong> the interaction is simple; the medical content is not.
              Any production version would need clinical review, content governance, accessible wording
              and a clear boundary between explanation and diagnosis.
            </p>
          </section>

          <section className={styles.validation} aria-labelledby="validation-title">
            <header className={styles.sectionHead}>
              <p>Round-one validation</p>
              <h2 id="validation-title">The concept worked. Discoverability still needed work.</h2>
            </header>

            <div className={styles.validationGrid}>
              {validationMetrics.map((metric) => (
                <div key={metric.value}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.validationReadout}>
              <p>
                Participants were asked to find the clinical term HbA1c and understand its meaning.
                Seven in ten completed the task successfully on their first attempt in the
                unmoderated Maze test.
              </p>
              <p>
                The misses were useful. Several participants struggled to find the lab-results path
                or recognise what was tappable. That points to a discoverability and information-
                architecture problem to fix in the next iteration, not a reason to add more features.
              </p>
            </div>
          </section>

          <section className={styles.learning} aria-labelledby="learning-title">
            <header className={styles.sectionHeadDark}>
              <p>What I learned</p>
              <h2 id="learning-title">Good product judgement is often subtraction.</h2>
            </header>
            <div className={styles.learningGrid}>
              <article>
                <span>01</span>
                <h3>UX cannot fix what is not a UX problem.</h3>
                <p>Appointment scarcity and infrastructure constraints were real, but outside the interface team’s direct control.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Sample quality beats a bigger headline number.</h3>
                <p>Filtering caregiver-specific findings to the 32 relevant survey respondents materially changed the priorities.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Small interventions can carry serious value.</h3>
                <p>An inline explanation is not a dramatic redesign. That is precisely why it is plausible as an MVP.</p>
              </article>
              <article>
                <span>04</span>
                <h3>Discoverability is part of comprehension.</h3>
                <p>If users cannot find the result or recognise the affordance, good explanatory content never gets a chance to help.</p>
              </article>
            </div>
          </section>

          <section className={styles.roadmap} aria-labelledby="roadmap-title">
            <header className={styles.sectionHead}>
              <p>From concept to product</p>
              <h2 id="roadmap-title">The next work is governance, edge cases and better testing.</h2>
            </header>
            <div className={styles.roadmapGrid}>
              {roadmap.map((phase) => (
                <article key={phase.phase}>
                  <span>{phase.phase}</span>
                  <h3>{phase.title}</h3>
                  <ul>
                    {phase.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.outcome} aria-labelledby="outcome-title">
            <div>
              <p>Portfolio context</p>
              <h2 id="outcome-title">A capstone, not a claim that HealthHub shipped it.</h2>
            </div>
            <div>
              <p>
                This project is useful in my portfolio because it shows a different kind of design
                evidence: primary research, problem selection, scope boundaries, prototype logic,
                first-round usability testing and reflection.
              </p>
              <p>
                It also shows where my established systems background transfers cleanly into product
                work: deciding what has to stay consistent, what can change, and what the design team
                should deliberately leave alone.
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
        <p>Senior visual systems thinking, now applied to product problems</p>
        <h2>Clearer problems make better interfaces.</h2>
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
