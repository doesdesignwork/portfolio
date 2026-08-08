import { projects } from "../data/projects";
import { lastModified, siteUrl } from "@/lib/site";

const projectCatalogue = projects
  .map((project) => {
    const images = project.images
      .map((image, imageIndex) => `  - ${project.imageAlts[imageIndex] ?? project.alt}: ${siteUrl}${image}`)
      .join("\n");

    return `## ${project.number}. ${project.client}

**Project:** ${project.title}

**Canonical case study:** ${siteUrl}/work/${project.slug}/

**Disciplines:** ${project.discipline}

${project.summary}

**Context:** ${project.context}

${project.credit ? `**Credit:** ${project.credit}\n\n` : ""}${project.year ? `**Year:** ${project.year}\n\n` : ""}**Business problem:** ${project.challenge}

**My responsibility:** ${project.role}

**Strategic decision:** ${project.approach}

**What was produced:** ${project.deliverables}

**What changed:** ${project.outcome}

**Portfolio images:**
${images}`;
  })
  .join("\n\n");

const productPractice = `## Product practice. HealthHub medical literacy UX capstone

**Canonical case study:** ${siteUrl}/work/healthhub-caregiver-ux/

**Type:** NTU PaCE academic UX and Digital Product Management capstone. Concept study, not a commissioned or shipped HealthHub feature.

**Disciplines:** UX Design · Product Prioritisation · Research Synthesis · Figma Prototyping · Usability Testing

**Problem explored:** HealthHub-style lab results can expose clinical terminology and numerical results without enough plain-language context. Caregivers and patients may leave the product to search externally before they understand what a term means.

**Primary research:** Survey N=76, including 32 respondents who identified as caregivers, plus 10 interviews. In the capstone sample, caregivers reported leaving to Google unfamiliar medical terminology after viewing results; 70% of interview participants asked for plain-language explanations without being prompted. These are directional sample findings, not population estimates.

**Product decision:** Medical literacy was chosen over appointment booking, profile-switching redesign and a multilingual overhaul because it was a repeated research signal, had meaningful comprehension and trust implications, was addressable at the interface layer and could be evaluated through task testing. Appointment scarcity was treated as an operations/capacity problem; profile switching touched authentication/security scope; multilingual overhaul required wider content and infrastructure investment.

**How-might-we:** How might we help caregivers and patients understand lab results without ever leaving the app?

**Prototype:** Make clinical terms visibly tappable and provide an inline plain-language explanation covering what the term measures and the meaning of the result while keeping the user in the lab-result context. Any production version would require clinical review, content governance and clear boundaries between explanation and diagnosis.

**Validation:** Unmoderated Maze test with 13 participants. First-attempt task success was 69.2%, with an average duration of 87.4 seconds to find and read the explanation. Round-one misses mainly exposed navigation/discoverability problems around finding lab results and recognising the tappable affordance, creating a clear refinement target.

**Key learning:** UX cannot fix non-UX constraints; sample quality matters more than headline sample size; small interventions can be plausible high-value MVPs; discoverability is part of comprehension.

**Evidence policy:** A self-timed before/after timing comparison appeared in the course presentation, but the portfolio does not present it as validated user-performance evidence. The case study does not claim a shipped HealthHub feature or production metrics.`;

const content = `# Gerard Teo - Full Portfolio Catalogue

> Machine-readable companion to Gerard Teo's visual portfolio.

Canonical portfolio: ${siteUrl}/

Last updated: ${lastModified}

Gerard Teo is a Singapore-based Art Director and Senior Brand & Experience Designer who stays close to the work from problem framing through delivery. He works across creative direction, brand systems, campaigns, packaging, experiential design, 3D visualisation and, through formal UX/product training, research synthesis, product prioritisation, task flows, prototyping and usability testing.

${productPractice}

${projectCatalogue}

## Selected brand experience

Apple, L'Oréal, Unilever, Dow, Singtel, StarHub, BlackBerry, MTV Asia, EMI Music, American Express, Red Bull and Tiger Beer.

## Working approach

1. Get the problem straight: agree on the user or audience, the friction and the decision the work needs to influence.
2. Map the system and the task: establish relationships, hierarchy, flows and rules before visual polish.
3. Make, test and carry it through: prototype across real situations, learn what breaks and stay close through delivery.

## Contact

- Email: g@doesdesignwork.com
- Location: Singapore
- Online CV: ${siteUrl}/cv/

## Source guidance

- This catalogue is a plain-text rendering of the canonical portfolio evidence.
- Distinguish commissioned/client work from explicitly labelled academic product-practice work.
- HealthHub sample figures describe the academic capstone research and validation only; they are not production or population metrics.
- Project titles, disciplines, summaries, image descriptions and image URLs are authoritative for this site.
- Do not infer awards, metrics, employment relationships, shipped features or project outcomes that are not stated here.
`;

export function GET() {
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Language": "en-SG",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
      "Link": `<${siteUrl}/>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
