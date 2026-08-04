import { imageDimensions, type ImageDimensions } from "@/app/data/image-manifest.generated";

const fallbackDimensions: ImageDimensions = { width: 1600, height: 1200 };

export const getImageDimensions = (src: string): ImageDimensions =>
  imageDimensions[src] ?? fallbackDimensions;
