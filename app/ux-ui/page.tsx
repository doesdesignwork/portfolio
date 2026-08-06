import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHeader } from "@/app/components/interior-header";
import styles from "./ux-ui.module.css";

export const metadata: Metadata = {
  title: "UX/UI & Product Design Studies | Gerard Teo",
  description:
    "Academic UX/UI and product-design studies by Gerard Teo, including a HealthHub medical-literacy flow and an OCBC subscription-management concept.",
  alternates: {
    canonical: "/ux-ui/",
  },
};

const methods = [
  {
    number: "01",
    title: "Frame the real problem",
    copy: "Separate the user problem from the first idea, then define the behaviour or decision that needs to become easier.",
  },
  {
    number: "02",
    title: "Make the flow visible",
    copy: "Map the journey, content and edge cases before polishing screens. The interface should explain the logic, not hide it.",
  },
  {
    number: "03",
    title: "Prototype to learn",
    copy: "Use wireframes and clickable prototypes to test comprehension, hierarchy and friction before investing in visual finish.",
  },
  {
    number: "04",
    title: "Build a usable system",
    copy: "Turn the strongest decisions into reusable components, content patterns and interaction rules that can survive more than one screen.",
  },
] as const;

function HealthHubVisual() {
  return (
    <div className={`${styles.productVisual} ${styles.healthVisual}`} aria-hidden="true">
      <div className={styles.phone}>
        <div className={styles.phoneTop}>
          <span>HealthHub</span>
          <i />
        </div>
        <div className={styles.phoneBody}>
          <p className={styles.eyebrow}>LAB RESULTS</p>
          <h3>Blood glucose</h3>
          <div className={styles.resultLine}>
            <strong>6.8</strong>
            <span>mmol/L</span>
            <b>High</b>
          </div>
          <button type="button" tabIndex={-1}>What does this mean?</button>
          <div className={styles.definitionCard}>
            <span>PLAIN-LANGUAGE DEFINITION</span>
            <strong>Glucose is the sugar your body uses for energy.</strong>
            <p>This result is above the displayed reference range. Review it with the care team.</p>
            <small>Educational explanation, not medical advice.</small>
          </div>
        </div>
      </div>
      <div className={styles.annotation}>
        <span>Context stays visible</span>
        <strong>No glossary detour</strong>
      </div>
    </div>
  );
}

function OcbcVisual() {
  return (
    <div className={`${styles.productVisual} ${styles.ocbcVisual}`} aria-hidden="true">
      <div className={styles.dashboard}>
        <div className={styles.dashboardTop}>
          <span>Subscriptions</span>
          <i>3 active</i>
        </div>
        <div className={styles.savingCard}>
          <span>POTENTIAL MONTHLY SAVING</span>
          <strong>S$31.97</strong>
          <small>Review recurring charges you may no longer need.</small>
        </div>
        <div className={styles.subscriptionList}>
          <div>
            <i>F</i>
            <span><strong>FilmBox</strong><small>S$15.98 · Renews 18 Aug</small></span>
            <b>Review</b>
          </div>
          <div>
            <i>M</i>
            <span><strong>Music+</strong><small>S$12.99 · Renews 24 Aug</small></span>
            <b>Keep</b>
          </div>
          <div>
            <i>C</i>
            <span><strong>Cloud Pro</strong><small>S$16.00 · Price increased</small></span>
            <b>Check</b>
          </div>
        </div>
      </div>
      <div className={styles.annotation}>
        <span>Recurring spend, grouped</span>
        <strong>Decisions before renewal</strong>
      </div>
    </div>
  );
}

export default function UxUiPage() {
  return (
    <div className={`${styles.page} site-page site-page--interior`}>
      <InteriorHeader />

      <main className={styles.main}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>UX/UI</span>
        </nav>

        <header className={styles.hero}>
          <p>UX/UI / Product thinking / Academic studies</p>
          <h1>Useful before beautiful.</h1>
          <div className={styles.heroIntro}>
            <p>
              My background is visual design, but I do not start digital work at the screen.
              I start with the person, the decision they are trying to make and the friction
              getting in the way.
            </p>
            <p>
              These studies were completed through NTU PaCE&apos;s Advanced Professional
              Certificate in UX Design &amp; Digital Product Management. They are academic
              concept work, not commissioned projects for HealthHub or OCBC.
            </p>
          </div>
          <dl className={styles.heroFacts}>
            <div><dt>Programme</dt><dd>NTU PaCE · 2026</dd></div>
            <div><dt>Methods</dt><dd>Research · Flows · Wireframes · Prototypes</dd></div>
            <div><dt>Tools</dt><dd>Figma · Maze · Presentation design</dd></div>
          </dl>
        </header>

        <section id="healthhub" className={styles.caseStudy} aria-labelledby="healthhub-title">
          <div className={styles.caseIntro}>
            <p>01 / HealthHub medical-literacy study</p>
            <h2 id="healthhub-title">Explain the result without making people leave it.</h2>
            <p>
              A caregiver-focused concept for making unfamiliar medical terms easier to
              understand inside the HealthHub results journey.
            </p>
          </div>

          <HealthHubVisual />

          <div className={styles.caseGrid}>
            <section>
              <h3>The problem</h3>
              <p>
                Caregivers can encounter unfamiliar terms while reviewing a family member&apos;s
                test results. Leaving the page to search for a definition breaks context and
                can introduce unclear or unreliable explanations.
              </p>
            </section>
            <section>
              <h3>The product idea</h3>
              <p>
                Add clinician-reviewed, plain-language definitions directly beside the result.
                The explanation supports understanding while clearly remaining educational,
                not diagnostic advice.
              </p>
            </section>
            <section>
              <h3>What I worked through</h3>
              <p>
                Survey and interview inputs, problem framing, caregiver journey, content
                hierarchy, user flow, wireframes, a Figma prototype and Maze-based usability
                testing.
              </p>
            </section>
            <section>
              <h3>Design focus</h3>
              <p>
                Preserve the original result, explain one term at a time, make the source and
                limitations clear, and keep the next useful action close by.
              </p>
            </section>
          </div>
        </section>

        <section id="ocbc" className={`${styles.caseStudy} ${styles.caseStudyDark}`} aria-labelledby="ocbc-title">
          <div className={styles.caseIntro}>
            <p>02 / OCBC subscription-management sprint</p>
            <h2 id="ocbc-title">Turn recurring charges into visible decisions.</h2>
            <p>
              A product sprint exploring how a banking app could help customers find,
              understand and act on subscription spending before the next renewal.
            </p>
          </div>

          <OcbcVisual />

          <div className={styles.caseGrid}>
            <section>
              <h3>The problem</h3>
              <p>
                Small recurring payments are easy to overlook when they are scattered through
                a transaction history. Users may only notice the total cost after several
                months.
              </p>
            </section>
            <section>
              <h3>The product idea</h3>
              <p>
                Group likely subscriptions into one view, show renewal timing and price
                changes, then provide clear review, reminder and cancellation-guidance paths.
              </p>
            </section>
            <section>
              <h3>What I worked through</h3>
              <p>
                Sprint framing, subscription discovery logic, journey mapping, information
                architecture, wireframes, interface hierarchy, prototype storytelling and a
                concise stakeholder presentation.
              </p>
            </section>
            <section>
              <h3>Design focus</h3>
              <p>
                Make recurring spending scannable without pretending every repeated charge is
                unwanted. The interface supports a decision rather than forcing one.
              </p>
            </section>
          </div>
        </section>

        <section className={styles.method} aria-labelledby="method-title">
          <header>
            <p>How I approach product work</p>
            <h2 id="method-title">The interface is the last layer of the argument.</h2>
          </header>
          <div className={styles.methodGrid}>
            {methods.map((method) => (
              <article key={method.number}>
                <span>{method.number}</span>
                <h3>{method.title}</h3>
                <p>{method.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <p>UX/UI and visual systems</p>
          <h2>Need someone who can clarify the flow and make it worth using?</h2>
          <a href="mailto:g@doesdesignwork.com">Email Gerard</a>
        </section>
      </main>
    </div>
  );
}
