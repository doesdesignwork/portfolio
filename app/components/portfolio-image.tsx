import Image, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";
import { getImageDimensions } from "@/app/lib/image-dimensions";

type PortfolioImageProps = Omit<
  ImageProps,
  "src" | "width" | "height" | "fill" | "unoptimized"
> & {
  src: string;
  capToSource?: boolean;
};

type SourceAwareStyle = CSSProperties & {
  "--source-image-width": string;
};

export function PortfolioImage({
  src,
  capToSource = true,
  style,
  ...props
}: PortfolioImageProps) {
  const { width, height } = getImageDimensions(src);
  const sourceAwareStyle: SourceAwareStyle = {
    "--source-image-width": capToSource ? `${width}px` : "100%",
    width: "100%",
    height: "auto",
    maxWidth: capToSource ? width : "100%",
    marginInline: capToSource ? "auto" : undefined,
    ...style,
  };

  return (
    <Image
      {...props}
      src={src}
      width={width}
      height={height}
      unoptimized
      data-sharp-image="true"
      data-quality-image="true"
      data-source-width={width}
      data-source-height={height}
      style={sourceAwareStyle}
    />
  );
}
