const manifest = {
  name: "Gerard Teo - Art Director & Senior Brand Designer",
  short_name: "Gerard Teo",
  description:
    "Selected brand, campaign and experiential work by Singapore art director and senior brand designer Gerard Teo.",
  start_url: "/",
  scope: "/",
  display: "minimal-ui",
  background_color: "#151512",
  theme_color: "#151512",
  lang: "en-SG",
  icons: [
    {
      src: "/g-favicon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/g-favicon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
  ],
};

export function GET() {
  return Response.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Type": "application/manifest+json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
