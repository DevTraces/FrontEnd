import { Circle, Image } from "@chakra-ui/react";

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
    <Circle
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
    </Circle>
  );
}
