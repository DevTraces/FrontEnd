import { Circle } from "@chakra-ui/react";
import Image from "next/image";
import { ComponentProps, useState } from "react";

type ImageSrc = ComponentProps<typeof Image>["src"];

type ProfileAvatarProps = {
  src: ImageSrc;
  size: number | string;
  alt: string;
  fallbackSrc?: ImageSrc;
} & ComponentProps<typeof Circle>;

const DEFAULT_FALLBACK_SRC =
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2078&q=80";

export default function ProfileAvatar({
  src,
  size,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  ...restProps
}: ProfileAvatarProps) {
  const [image, setImage] = useState(src ?? fallbackSrc);

  return (
    <Circle
      size={typeof size === "number" ? `${size}px` : size}
      overflow="hidden"
      position="relative"
      {...restProps}
    >
      <Image
        alt={alt}
        src={image}
        sizes={typeof size === "number" ? `${size}px` : size}
        fill
        style={{ objectFit: "cover" }}
        onError={() => setImage(fallbackSrc)}
      />
    </Circle>
  );
}
