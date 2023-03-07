import { Box, Center } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import TopBar from "./components/TopBar";

const SideBar = dynamic(() => import("./components/SideBar"), {
  ssr: false
});

const BottomBar = dynamic(() => import("./components/BottomBar"), {
  ssr: false
});

export default function NavLayout({
  children,
  ...restProps
}: React.ComponentProps<typeof Center>) {
  return (
    <>
      <TopBar />
      <BottomBar />
      <SideBar />
      <Box
        w="full"
        pos="absolute"
        pl={{
          base: 0,
          md: "100px",
          xl: "250px"
        }}
        mb={{
          base: "80px",
          md: 0,
          xl: 0
        }}
        {...restProps}
      >
        {children}
      </Box>
    </>
  );
}
