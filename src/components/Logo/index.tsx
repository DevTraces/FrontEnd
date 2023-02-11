import Image from "next/image";
import TextLogo from "ArtBubbleTextLogo_landscape.svg";
import IconLogo from "ArtBubble_square.svg";
import FullLogo from "ArtBubbleLogo_landscape.svg";
import { ComponentProps } from "react";

type LogoProps = { type: "text" | "icon" | "full" } & Omit<
  ComponentProps<typeof Image>,
  "src" | "alt"
>;
export default function Logo({ type, ...restProps }: LogoProps) {
  const ImgSrcs: { [key in typeof type]: typeof TextLogo } = {
    full: FullLogo,
    icon: IconLogo,
    text: TextLogo
  };
  return (
    <Image src={ImgSrcs[type]} alt="ArtBubble Logo" {...restProps} priority />
  );
}
