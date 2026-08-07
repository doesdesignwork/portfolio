import { projects } from "../data/projects";
import { services } from "../data/services";
import { lastModified, siteUrl } from "@/lib/site";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const imageEntries = (images: string[]) =>
  images
    .map(
      (image) => `    <image:image>\n      <image:loc>${escapeXml(`${siteUrl}${image}`)}</image:loc>\n    </image:image>`,
    )
    .join("\n");

const staticUrls = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/cv/", priority: "0.9", changefreq: "monthly" },
  { path: "/ux-ui/", priority: "0.8", changefreq: "monthly" },
  ...services.map((service) => ({
    path: `/services/${service.slug}/`,
    priority: "0.8",
    changefreq: "monthly",
  })),
];

const staticEntries = staticUrls
  .map(
    (entry) => `  <url>\n    <loc>${escapeXml(`${siteUrl}${entry.path}`)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
  )
  .join("\n");

const projectEntries = projects
  .map(
    (project) => `  <url>\n    <loc>${escapeXml(`${siteUrl}/work/${project.slug}/`)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${project.featured ? "0.9" : "0.7"}</priority>\n${imageEntries(project.images)}\n  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${staticEntries}\n${projectEntries}\n</urlset>`;

export function GET() {
  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
