import { Square } from "@chakra-ui/react";
import Image from "next/image";

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
    <Square size={size} overflow="hidden" position="relative" {...restProps}>
      <Image
        alt={alt}
        src={src}
        fill
        sizes={size}
        style={{
          objectFit: "cover"
        }}
      />
    </Square>
  );
}
