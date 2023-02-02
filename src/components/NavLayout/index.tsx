import { Center } from "@chakra-ui/react";
import BottomBar from "./components/BottomBar";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

export default function NavLayout({
  children,
  ...restProps
}: React.ComponentProps<typeof Center>) {
  return (
    <Center bg="gray.100" top={0} left={0} right={0} bottom={0} {...restProps}>
      <TopBar />
      <SideBar />
      <BottomBar />
      {children}
    </Center>
  );
}
