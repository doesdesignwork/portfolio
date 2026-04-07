export type ProjectCategory = 'Branding' | 'Graphic Design' | 'UX/UI Design';
export type MediaType = 'image' | 'video' | 'lottie';

export interface Asset {
  url: string;
  type: MediaType;
  altText: string;
  width: number;
  height: number;
  blurhash?: string;
}

export interface ProjectTeaser {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  interactionData: {
    thumbnail: Asset;
    hoverVideoUrl?: string;
    accentColor: string;
  };
}

export type ContentBlock =
  | { type: 'text'; content: string }
  | { type: 'media'; asset: Asset; caption?: string }
  | { type: 'quote'; text: string; author?: string };

export interface ProjectDetail extends ProjectTeaser {
  metadata: {
    client: string;
    role: string[];
    tools: string[];
    duration: string;
  };
  description: string;
  caseStudy: {
    problem: string;
    solution: string;
    processBlocks: ContentBlock[];
    results: string[];
  };
  gallery: Asset[];
}
