import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { projects } from "./data/projects";
import { lastModified, siteUrl } from "@/lib/site";
import "./globals.css";
import "./global-layout-audit.css";
import "./final-responsive-guard.css";
import "./sitewide-motion-quality.css";
import "./brand-refinement.css";
import "./readable-type-scale.css";
import "./amber-gunmetal.css";
import "./editorial-refinement-preview.css";

const siteTitle =
  "Gerard Teo | Art Director & Senior Brand Designer Singapore";
const siteDescription =
  "Gerard Teo is a Singapore-based Art Director, Senior Brand Designer and hands-on Creative Lead working across brand systems, campaigns, packaging, experiential design and visual communication.";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const editorialFont = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Gerard Teo Portfolio",
  title: {
    default: siteTitle,
    template: "%s - Gerard Teo",
  },
  description: siteDescription,
  keywords: [
    "Gerard Teo",
    "art director Singapore",
    "senior brand designer Singapore",
    "creative lead Singapore",
    "creative direction",
    "brand identity design",
    "campaign design",
    "experiential design",
    "packaging design",
    "visual communication",
    "creative portfolio",
  ],
  authors: [{ name: "Gerard Teo", url: siteUrl }],
  creator: "Gerard Teo",
  publisher: "Gerard Teo",
  category: "Design",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/llms.txt",
      "text/plain": "/llms-full.txt",
      "application/json": "/agent-index.json",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: siteUrl,
    siteName: "Gerard Teo Portfolio",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/assets/sginnovate-identity.webp",
        width: 1053,
        height: 746,
        alt: "SGInnovate identity system from Gerard Teo's selected portfolio work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/sginnovate-identity.webp"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/g-favicon-circle-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/g-favicon-circle-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: "/g-favicon-circle-32.png",
    apple: [
      {
        url: "/apple-touch-icon-circle.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#191816",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Gerard Teo",
      url: siteUrl,
      email: "mailto:g@doesdesignwork.com",
      jobTitle: "Art Director, Senior Brand Designer and Creative Lead",
      alternateName: "Gerard Teo / DDW",
      sameAs: ["https://www.linkedin.com/in/gerard-teo-0b106429/"],
      mainEntityOfPage: { "@id": `${siteUrl}/#profile-page` },
      worksFor: [
        {
          "@type": "Organization",
          name: "C Square Creative Communications (C2)",
        },
        {
          "@type": "Organization",
          name: "C2 Global Exhibitions",
        },
      ],
      subjectOf: {
        "@type": "WebPage",
        name: "Gerard Teo CV",
        url: `${siteUrl}/cv/`,
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "SG",
        addressLocality: "Singapore",
      },
      knowsAbout: [
        "Creative direction",
        "Brand identity",
        "Campaign systems",
        "Experiential design",
        "Packaging design",
        "Visual communication",
        "Motion storytelling",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Gerard Teo Portfolio",
      description: siteDescription,
      inLanguage: "en-SG",
      publisher: { "@id": `${siteUrl}/#person` },
      copyrightHolder: { "@id": `${siteUrl}/#person` },
      dateModified: lastModified,
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: "Gerard Teo - Art Director and Senior Brand Designer",
      description: siteDescription,
      inLanguage: "en-SG",
      mainEntity: { "@id": `${siteUrl}/#person` },
      dateModified: lastModified,
      hasPart: {
        "@type": "ItemList",
        name: "Selected work",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@id": `${siteUrl}/work/${project.slug}/#creative-work` },
        })),
      },
    },
    ...projects.map((project) => ({
      "@type": "CreativeWork",
      "@id": `${siteUrl}/work/${project.slug}/#creative-work`,
      identifier: `gerard-teo-project-${project.number}`,
      url: `${siteUrl}/work/${project.slug}/`,
      name: `${project.client} - ${project.title}`,
      headline: project.title,
      description: project.summary,
      genre: project.discipline.split(" · "),
      image: project.images.map((image, imageIndex) => ({
        "@type": "ImageObject",
        contentUrl: `${siteUrl}${image}`,
        url: `${siteUrl}${image}`,
        name: project.imageAlts[imageIndex] ?? project.alt,
        caption: project.imageAlts[imageIndex] ?? project.alt,
        representativeOfPage: imageIndex === 0,
      })),
      thumbnailUrl: `${siteUrl}${project.images[0]}`,
      contributor: { "@id": `${siteUrl}/#person` },
      ...(project.credit ? { creditText: project.credit } : {}),
      ...(project.year ? { dateCreated: project.year } : {}),
      isPartOf: { "@id": `${siteUrl}/#profile-page` },
      keywords: project.discipline,
      dateModified: lastModified,
      inLanguage: "en-SG",
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="LLM-readable site summary"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="Full machine-readable project catalogue"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/agent-index.json"
          title="Structured portfolio index"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${bodyFont.variable} ${editorialFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
