import { Circle } from "@chakra-ui/react";
import Image from "next/image";

type CircledImageProps = {
  src: string;
  size: string;
  alt: string;
} & React.ComponentProps<typeof Circle>;

export default function CircledImage({
  src,
  size,
  alt,
  ...restProps
}: CircledImageProps) {
  return (
    <Circle size={size} overflow="hidden" position="relative" {...restProps}>
      <Image
        alt={alt}
        src={src}
        sizes={size}
        fill
        style={{ objectFit: "cover" }}
      />
    </Circle>
  );
}
