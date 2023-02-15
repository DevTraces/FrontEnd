import { Square, Image } from "@chakra-ui/react";

type SquaredImageProps = {
  src: string;
  size: string;
  alt: string;
} & React.ComponentProps<typeof Square>;

export default function SquaredImage({
  src,
  size,
  alt,
  ...restProps
}: SquaredImageProps) {
  return (
    <Square
      size={size}
      overflow="hidden"
      style={{ position: "relative" }}
      {...restProps}
    >
      <Image
        alt={alt}
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </Square>
  );
}
