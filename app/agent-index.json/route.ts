import { projects } from "../data/projects";
import { services } from "../data/services";
import { lastModified, siteUrl } from "@/lib/site";

const productPractice = {
  id: "product-practice-healthhub",
  schemaId: `${siteUrl}/work/healthhub-caregiver-ux/#creative-work`,
  client: null,
  title: "HealthHub Caregiver UX Capstone",
  type: "academic-product-practice",
  commissioned: false,
  shipped: false,
  disciplines: [
    "UX Design",
    "Digital Product Thinking",
    "Research Synthesis",
    "Task Flow",
    "Figma Prototyping",
  ],
  summary:
    "NTU PaCE capstone exploring how caregiver context, appointment tasks and medical translation could be made clearer inside a healthcare journey.",
  context:
    "Academic concept study created during formal UX Design and Digital Product Management training. It is not a commissioned or shipped HealthHub feature.",
  research: ["Screener and survey", "Short interviews", "Persona", "Affinity mapping", "Storyboard"],
  businessProblem:
    "A caregiver may be logged in as themselves while managing appointments and medical information for another person, creating context and language friction.",
  responsibility:
    "Research synthesis, UX framing, caregiver task flow, storyboard and Figma prototype.",
  strategicDecision:
    "Set the care context before the task, keep it visible through the journey and place translation support at the point where medical terminology becomes a barrier.",
  produced:
    "Caregiver journey, task flow, storyboard and Figma prototype covering care context, appointment task, translation and confirmation.",
  outcome:
    "Demonstrates the application of systems thinking to user context, task logic and interface decisions without claiming production metrics or a shipped feature.",
  url: `${siteUrl}/work/healthhub-caregiver-ux/`,
};

const index = {
  schemaVersion: 5,
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
      "User and task flows",
      "Wireframing and prototyping",
      "Digital product thinking",
    ],
  },
  positioning: {
    establishedPractice: ["Brand systems", "Campaigns", "Packaging", "Experiential design", "3D visualisation"],
    expandingPractice: ["UX design", "Digital product thinking", "Research synthesis", "Task flows", "Prototyping"],
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
