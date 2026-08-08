import type { Metadata, Viewport } from "next";
import { Inter, Krub } from "next/font/google";
import SiteImageMotion from "./SiteImageMotion";
import { projects } from "./data/projects";
import { lastModified, siteUrl } from "@/lib/site";
import "./globals.css";
import "./global-layout-audit.css";
import "./final-responsive-guard.css";
import "./sitewide-motion-quality.css";
import "./brand-refinement.css";
import "./readable-type-scale.css";
import "./amber-gunmetal.css";
import "./audit-readable.css";

const siteTitle =
  "Gerard Teo | Art Director, Senior Brand & Experience Designer in Singapore";
const siteDescription =
  "Singapore-based art director and senior brand and experience designer with 26+ years across identity, campaigns, packaging and exhibitions, now applying systems thinking to UX and digital product work.";

const bodyFont = Krub({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const headingFont = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
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
    "experience designer Singapore",
    "creative lead Singapore",
    "creative direction",
    "brand identity design",
    "campaign design",
    "experiential design",
    "packaging design",
    "UX design",
    "digital product design",
    "product thinking",
    "visual systems",
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
        url: "/assets/modajar-identity-final.webp",
        width: 1026,
        height: 716,
        alt: "Gerard Teo portfolio, Modajar fashion brand identity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/modajar-identity-final.webp"],
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
  themeColor: "#252A2E",
};

const productPracticeWork = {
  "@type": "CreativeWork",
  "@id": `${siteUrl}/work/healthhub-caregiver-ux/#creative-work`,
  identifier: "gerard-teo-product-practice-healthhub-caregiver-ux",
  url: `${siteUrl}/work/healthhub-caregiver-ux/`,
  name: "HealthHub Caregiver UX Capstone",
  headline: "A caregiver journey designed around context, language and confidence",
  description:
    "NTU PaCE UX and Digital Product Management capstone exploring caregiver appointment and medical-translation flows.",
  genre: ["UX Design", "Digital Product Design", "Healthcare", "Academic Capstone"],
  contributor: { "@id": `${siteUrl}/#person` },
  isPartOf: { "@id": `${siteUrl}/#profile-page` },
  dateCreated: "2026",
  dateModified: lastModified,
  inLanguage: "en-SG",
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
      jobTitle: "Art Director and Senior Brand & Experience Designer",
      alternateName: "Senior Brand Designer / Creative Lead",
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
        "3D visualisation",
        "UX design",
        "Research synthesis",
        "User and task flows",
        "Wireframing and prototyping",
        "Digital product thinking",
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
      name: "Gerard Teo - Art Director, Senior Brand & Experience Designer",
      description: siteDescription,
      inLanguage: "en-SG",
      mainEntity: { "@id": `${siteUrl}/#person` },
      dateModified: lastModified,
      hasPart: {
        "@type": "ItemList",
        name: "Selected work",
        numberOfItems: projects.length + 1,
        itemListElement: [
          ...projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@id": `${siteUrl}/work/${project.slug}/#creative-work` },
          })),
          {
            "@type": "ListItem",
            position: projects.length + 1,
            item: { "@id": `${siteUrl}/work/healthhub-caregiver-ux/#creative-work` },
          },
        ],
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
    productPracticeWork,
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
      <body
        className={`${bodyFont.variable} ${headingFont.variable} antialiased`}
      >
        <SiteImageMotion />
        {children}
      </body>
    </html>
  );
}
