import { Circle } from "@chakra-ui/react";
import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";

type ImageSrc = ComponentProps<typeof Image>["src"];

type ProfileAvatarProps = {
  size: number | string;
  alt: string;
  src?: ImageSrc;
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
  const [image, setImage] = useState(src);

  useEffect(() => {
    setImage(src);
  }, [src]);

  return (
    <Circle
      size={typeof size === "number" ? `${size}px` : size}
      overflow="hidden"
      position="relative"
      {...restProps}
    >
      <Image
        alt={alt}
        src={image !== "" && image ? image : fallbackSrc}
        sizes={typeof size === "number" ? `${size}px` : size}
        fill
        style={{ objectFit: "cover" }}
        onError={() => {
          setImage(fallbackSrc);
        }}
      />
    </Circle>
  );
}
