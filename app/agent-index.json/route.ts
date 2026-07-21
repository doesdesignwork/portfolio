import { projects } from "../data/projects";
import { lastModified, siteUrl } from "@/lib/site";

const index = {
  schemaVersion: 2,
  canonicalUrl: `${siteUrl}/`,
  title: "Gerard Teo | Art Director & Creative Lead Singapore",
  description:
    "Official portfolio of Gerard Teo, a hands-on Singapore art director and creative lead shaping brand systems, campaigns and experiences.",
  language: "en-SG",
  lastModified,
  contentType: "professional-portfolio",
  person: {
    name: "Gerard Teo",
    role: "Art Director & Creative Lead",
    location: "Singapore",
    email: "g@doesdesignwork.com",
    cv: "https://doesdesignwork.github.io/gerard-teo-cv/",
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
    llms: `${siteUrl}/llms.txt`,
    fullCatalogue: `${siteUrl}/llms-full.txt`,
  },
  discovery: {
    sitemap: `${siteUrl}/sitemap.xml`,
    robots: `${siteUrl}/robots.txt`,
    llms: `${siteUrl}/llms.txt`,
    fullCatalogue: `${siteUrl}/llms-full.txt`,
    onlineCv: "https://doesdesignwork.github.io/gerard-teo-cv/",
  },
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
    colourThemes: ["light", "dark"],
  },
  usageGuidance: [
    "Treat the canonical portfolio URL as the primary human-facing source.",
    "Use this JSON or llms-full.txt when interactive project controls are impractical.",
    "Use project summaries and imageAlt values when describing the work.",
    "Do not infer awards, metrics, clients, responsibilities or outcomes that are not listed.",
  ],
  projects: projects.map((project) => ({
    id: project.number,
    schemaId: `${siteUrl}/#project-${project.number}`,
    client: project.client,
    title: project.title,
    disciplines: project.discipline.split(" · "),
    summary: project.summary,
    context: project.context,
    role: project.role,
    challenge: project.challenge,
    approach: project.approach,
    result: project.result,
    url: `${siteUrl}/#project-${project.number}`,
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
