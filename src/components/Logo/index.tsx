import { ComponentProps } from "react";
import Image from "next/image";

type LogoProps = { type: "text" | "icon" | "full" } & Omit<
  ComponentProps<typeof Image>,
  "src" | "alt"
>;
export default function Logo({ type, ...restProps }: LogoProps) {
  const ImgSrcs: { [key in typeof type]: string } = {
    full: "/ArtBubbleLogo_landscape.svg",
    icon: "/ArtBubble_square.svg",
    text: "/ArtBubbleTextLogo_landscape.svg"
  };
  return (
    <Image src={ImgSrcs[type]} alt="ArtBubble Logo" {...restProps} priority />
  );
}
