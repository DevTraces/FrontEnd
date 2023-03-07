import { Box, Center, Show } from "@chakra-ui/react";
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
      <Show below="md">
        <TopBar />
        <BottomBar />
      </Show>
      <Show above="md">
        <SideBar />
      </Show>

      <Box
        w="full"
        pos="absolute"
        pt={{
          base: "100px",
          md: 0,
          xl: 0
        }}
        pl={{
          base: 0,
          md: "100px",
          xl: "250px"
        }}
        pb={{
          base: "100px",
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
