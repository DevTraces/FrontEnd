import { ComponentProps } from "react";
import Image from "next/image";
import FullLogo from "public/ArtBubbleLogo_landscape.svg";
import IconLogo from "public/ArtBubble_square.svg";
import TextLogo from "public/ArtBubbleTextLogo_landscape.svg";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

type LogoProps = { type: "text" | "icon" | "full" } & Omit<
  ComponentProps<typeof Image>,
  "src" | "alt"
>;
export default function Logo({ type, ...restProps }: LogoProps) {
  const router = useRouter();

  const ImgSrcs: { [key in typeof type]: typeof TextLogo } = {
    full: FullLogo,
    icon: IconLogo,
    text: TextLogo
  };
  const href =
    router.pathname.includes("auth") || router.pathname === "/" ? "/" : "/feed";
  return (
    <Link href={href}>
      <Box position="relative" w="100%" h="100%">
        <Image
          src={ImgSrcs[type]}
          alt="ArtBubble Logo"
          {...restProps}
          priority
        />
      </Box>
    </Link>
  );
}
