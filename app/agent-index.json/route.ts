import { projects } from "../data/projects";
import { services } from "../data/services";
import { lastModified, siteUrl } from "@/lib/site";

const productPractice = {
  id: "product-practice-healthhub",
  schemaId: `${siteUrl}/work/healthhub-caregiver-ux/#creative-work`,
  client: null,
  title: "HealthHub Medical Literacy UX Capstone",
  type: "academic-product-practice",
  commissioned: false,
  shipped: false,
  disciplines: [
    "UX Design",
    "Product Prioritisation",
    "Research Synthesis",
    "Figma Prototyping",
    "Usability Testing",
  ],
  summary:
    "NTU PaCE capstone exploring how plain-language explanations inside HealthHub-style lab results could reduce the need for caregivers and patients to leave the app and search unfamiliar medical terminology.",
  context:
    "Academic concept study created during formal UX Design and Digital Product Management training. It is not a commissioned or shipped HealthHub feature.",
  research: {
    surveyResponses: 76,
    caregiverSurveyRespondents: 32,
    interviews: 10,
    directionalSignals: [
      "Caregivers in the capstone research sample reported Googling unfamiliar medical terms after viewing results.",
      "70% of interview participants asked for plain-language explanations without being prompted.",
    ],
    note: "Capstone sample findings are directional and are not population estimates.",
  },
  businessProblem:
    "Lab results can expose clinical shorthand and numerical values without enough plain-language context, causing users to leave the product to understand what they are seeing.",
  responsibility:
    "Research synthesis, UX framing, product prioritisation, interaction concept, Figma prototype, Maze usability testing and reflection.",
  strategicDecision:
    "Focus on medical literacy rather than appointment booking, profile switching or a multilingual overhaul because it was a repeated research signal, interface-solvable within scope and measurable through task testing.",
  howMightWe:
    "How might we help caregivers and patients understand lab results without ever leaving the app?",
  produced:
    "A prototype pattern that makes clinical terms visibly tappable and provides an inline plain-language explanation while preserving the lab-result context.",
  validation: {
    participants: 13,
    method: "Unmoderated Maze usability test",
    firstAttemptTaskSuccess: "69.2%",
    averageTaskDuration: "87.4 seconds",
    learning:
      "Round-one misses primarily exposed navigation and affordance discoverability issues around finding lab results and recognising tappable terminology.",
  },
  evidencePolicy:
    "The portfolio does not present the self-timed 54s to 13s comparison from the course presentation as validated user-performance evidence and does not claim production metrics.",
  outcome:
    "Demonstrates product judgement through research, problem selection, scope boundaries, prototyping, first-round validation and explicit acknowledgement of clinical content-governance dependencies.",
  url: `${siteUrl}/work/healthhub-caregiver-ux/`,
};

const index = {
  schemaVersion: 6,
  canonicalUrl: `${siteUrl}/`,
  title: "Gerard Teo | Art Director, Senior Brand & Experience Designer Singapore",
  description:
    "Official portfolio of Gerard Teo, a Singapore art director and senior brand and experience designer working across visual systems, campaigns, packaging and physical experiences while expanding into UX and digital product practice.",
  language: "en-SG",
  lastModified,
  contentType: "professional-portfolio",
  person: {
    name: "Gerard Teo",
    role: "Art Director & Senior Brand & Experience Designer",
    secondaryRole: "Senior Brand Designer / Creative Lead",
    location: "Singapore",
    email: "g@doesdesignwork.com",
    cv: `${siteUrl}/cv/`,
    capabilities: [
      "Creative direction",
      "Brand identity",
      "Campaign systems",
      "Experiential design",
      "Packaging design",
      "3D visualisation",
      "Research synthesis",
      "Product prioritisation",
      "User and task flows",
      "Wireframing and prototyping",
      "Usability testing",
      "Digital product thinking",
    ],
  },
  positioning: {
    establishedPractice: ["Brand systems", "Campaigns", "Packaging", "Experiential design", "3D visualisation"],
    expandingPractice: ["UX design", "Digital product thinking", "Research synthesis", "Product prioritisation", "Task flows", "Prototyping", "Usability testing"],
    evidencePolicy:
      "Academic product work is explicitly identified and is not represented as commissioned, shipped or production-measured work.",
  },
  navigation: {
    home: `${siteUrl}/`,
    work: `${siteUrl}/#work`,
    productPractice: `${siteUrl}/work/healthhub-caregiver-ux/`,
    about: `${siteUrl}/#about`,
    contact: `${siteUrl}/#contact`,
    cv: `${siteUrl}/cv/`,
    llms: `${siteUrl}/llms.txt`,
    fullCatalogue: `${siteUrl}/llms-full.txt`,
  },
  discovery: {
    sitemap: `${siteUrl}/sitemap.xml`,
    robots: `${siteUrl}/robots.txt`,
    llms: `${siteUrl}/llms.txt`,
    fullCatalogue: `${siteUrl}/llms-full.txt`,
    onlineCv: `${siteUrl}/cv/`,
  },
  services: services.map((service) => ({
    name: service.title,
    primaryKeyword: service.primaryKeyword,
    url: `${siteUrl}/services/${service.slug}/`,
  })),
  sections: [
    { id: "work", name: "Selected projects", url: `${siteUrl}/#work` },
    { id: "product-practice", name: "UX and product practice", url: `${siteUrl}/work/healthhub-caregiver-ux/` },
    { id: "about", name: "About Gerard Teo", url: `${siteUrl}/#about` },
    { id: "contact", name: "Contact", url: `${siteUrl}/#contact` },
  ],
  accessibility: {
    landmarks: ["header", "navigation", "main", "sections", "footer"],
    projectNavigation: {
      pattern: "keyboard-accessible links to canonical case-study pages",
      keyboard: ["Tab", "Enter"],
    },
    reducedMotionSupported: true,
    colourThemes: ["light"],
    minimumTextSize: "16px, except 14px desktop side-index navigation",
  },
  usageGuidance: [
    "Treat the canonical portfolio URL as the primary human-facing source.",
    "Use this JSON or llms-full.txt when the visual website is impractical to operate.",
    "Distinguish commissioned client work from the explicitly labelled HealthHub academic product-practice capstone.",
    "Treat HealthHub sample figures as academic research/validation results, not production or population metrics.",
    "Use project summaries and imageAlts values when describing client work.",
    "Do not infer awards, metrics, clients, responsibilities, shipped features or outcomes that are not listed.",
  ],
  productPractice: [productPractice],
  projects: projects.map((project) => ({
    id: project.number,
    schemaId: `${siteUrl}/work/${project.slug}/#creative-work`,
    client: project.client,
    title: project.title,
    type: "client-or-portfolio-work",
    disciplines: project.discipline.split(" · "),
    primaryKeyword: project.primaryKeyword,
    summary: project.summary,
    context: project.context,
    credit: project.credit ?? null,
    year: project.year ?? null,
    businessProblem: project.challenge,
    responsibility: project.role,
    strategicDecision: project.approach,
    produced: project.deliverables,
    outcome: project.outcome,
    url: `${siteUrl}/work/${project.slug}/`,
    primaryImage: `${siteUrl}${project.images[0]}`,
    images: project.images.map((image) => `${siteUrl}${image}`),
    imageAlts: project.imageAlts,
    imagePresentation: project.presentation,
  })),
};

export function GET() {
  return Response.json(index, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Language": "en-SG",
      "Access-Control-Allow-Origin": "*",
      "Link": `<${siteUrl}/>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
