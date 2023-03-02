import { Box, Center } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import TopBar from "./components/TopBar";
import useNavBar from "./hooks/useNavBar";

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
  const { navType } = useNavBar();

  return (
    <Center>
      {navType === "topbar" && (
        <>
          <TopBar />
          <BottomBar />
        </>
      )}
      {navType === "sidebar" && <SideBar />}
      <Box
        w="full"
        pos="absolute"
        pl={{
          sm: 0,
          md: "100px",
          xl: "250px"
        }}
        mb={{
          sm: "80px",
          md: 0,
          xl: 0
        }}
        {...restProps}
      >
        {children}
      </Box>
    </Center>
  );
}
