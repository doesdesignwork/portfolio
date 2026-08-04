import Image, { type ImageProps } from "next/image";
import { getImageDimensions } from "@/app/lib/image-dimensions";

type PortfolioImageProps = Omit<
  ImageProps,
  "src" | "width" | "height" | "fill" | "unoptimized"
> & {
  src: string;
  capToSource?: boolean;
};

export function PortfolioImage({
  src,
  capToSource = true,
  style,
  ...props
}: PortfolioImageProps) {
  const { width, height } = getImageDimensions(src);

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
      style={{
        width: "100%",
        height: "auto",
        maxWidth: capToSource ? width : undefined,
        marginInline: capToSource ? "auto" : undefined,
        ...style,
      }}
    />
  );
}
