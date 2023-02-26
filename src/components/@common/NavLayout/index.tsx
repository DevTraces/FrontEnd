import { Box, Center } from "@chakra-ui/react";
import BottomBar from "./components/BottomBar";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import NavTypeProvider from "./components/NavTypeContext";

export default function NavLayout({
  children,
  ...restProps
}: React.ComponentProps<typeof Center>) {
  return (
    <NavTypeProvider>
      <Center>
        <TopBar />
        <SideBar />
        <BottomBar />
        <Box
          ml={{
            sm: 0,
            md: "100px",
            xl: "250px"
          }}
          mb={{
            sm: "50px",
            md: 0,
            xl: 0
          }}
          mt={{
            sm: "30px",
            md: 0,
            xl: 0
          }}
          {...restProps}
        >
          {children}
        </Box>
      </Center>
    </NavTypeProvider>
  );
}
