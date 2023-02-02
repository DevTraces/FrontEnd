import { Box, Center } from "@chakra-ui/react";
import BottomBar from "./components/BottomBar";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

export default function NavLayout({
  children,
  ...restProps
}: React.ComponentProps<typeof Center>) {
  return (
    <>
      <TopBar />
      <SideBar />
      <BottomBar />
      <Box {...restProps}>{children}</Box>
    </>
  );
}
