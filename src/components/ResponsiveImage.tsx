import type { ResponsiveImageSource } from "@/types/ResponsiveImageSource";

type ResponsiveImageProps = {
  image: ResponsiveImageSource;
  alt: string;
  sizes?: string;
  className?: string;
  loading?: "lazy" | "eager";
};

export const ParallaxHeader: React.FC<ResponsiveImageProps> = ({
  image,
  alt,
  sizes = "100vw",
  className,
  loading = "lazy",
}) => {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      className={className}
    />
  );
}