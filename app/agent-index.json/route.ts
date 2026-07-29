import { projects } from "../data/projects";
import { services } from "../data/services";
import { lastModified, siteUrl } from "@/lib/site";

const index = {
  schemaVersion: 4,
  canonicalUrl: `${siteUrl}/`,
  title: "Gerard Teo | Art Director & Senior Brand Designer Singapore",
  description:
    "Official portfolio of Gerard Teo, a hands-on Singapore art director, senior brand designer and creative lead shaping brand systems, campaigns and experiences.",
  language: "en-SG",
  lastModified,
  contentType: "professional-portfolio",
  person: {
    name: "Gerard Teo",
    role: "Art Director & Senior Brand Designer",
    secondaryRole: "Creative Lead",
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
      "Motion storytelling",
      "UX thinking",
    ],
  },
  navigation: {
    home: `${siteUrl}/`,
    work: `${siteUrl}/#work`,
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
    { id: "about", name: "About Gerard Teo", url: `${siteUrl}/#about` },
    { id: "contact", name: "Contact", url: `${siteUrl}/#contact` },
  ],
  accessibility: {
    landmarks: ["header", "navigation", "main", "sections", "footer"],
    projectGallery: {
      pattern: "keyboard-accessible project grid",
      keyboard: ["Tab", "Enter", "Space"],
    },
    imageViewer: {
      pattern: "modal dialog",
      keyboard: ["Escape", "ArrowLeft", "ArrowRight"],
    },
    reducedMotionSupported: true,
    colourThemes: ["light"],
  },
  usageGuidance: [
    "Treat the canonical portfolio URL as the primary human-facing source.",
    "Use this JSON or llms-full.txt when interactive project controls are impractical.",
    "Use project summaries and imageAlt values when describing the work.",
    "Do not infer awards, metrics, clients, responsibilities or outcomes that are not listed.",
  ],
  projects: projects.map((project) => ({
    id: project.number,
    schemaId: `${siteUrl}/work/${project.slug}/#creative-work`,
    client: project.client,
    title: project.title,
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
    imageAlt: project.alt,
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
