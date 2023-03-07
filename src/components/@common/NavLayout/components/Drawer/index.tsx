import navigationAtom, { DrawerNavType } from "@/atoms/navigationAtom";
import { Box, Text, useOutsideClick } from "@chakra-ui/react";
import { ComponentProps, useRef } from "react";
import { useRecoilValue } from "recoil";
import useDrawer from "../../hooks/useDrawer";
import Search from "../Search";
import Alert from "./components/Alert";

type DrawerProps = ComponentProps<typeof Box>;

export default function Drawer({ ...restProps }: DrawerProps) {
  const ref = useRef(null);
  const nav = useRecoilValue(navigationAtom);

  const { isOpen, onClose } = useDrawer();

  useOutsideClick({
    ref,
    handler: e => {
      const target = e.target as Element;
      if (target.closest('[data-type="navItem"]')) return;

      if (isOpen) {
        onClose();
      }
    }
  });

  const content: {
    [k in DrawerNavType]: { title: string; Component: JSX.Element };
  } = {
    search: { Component: <Search />, title: "검색" },
    alert: {
      Component: <Alert />,
      title: "알림"
    }
  };
  if (nav !== "search" && nav !== "alert") return null;

  return (
    <Box
      zIndex="popover"
      position="fixed"
      left={{ base: "0", md: "100px" }}
      top={{ base: "80px", md: 0 }}
      p="40px"
      w={{ base: "full", md: "400px" }}
      bg="white"
      h={{ base: "auto", md: "100vh" }}
      ref={ref}
      data-type="navItem"
      {...restProps}
    >
      <Text
        display={{ base: "none", md: "block" }}
        fontSize="2xl"
        fontWeight="bold"
        mb="24px"
      >
        {content[nav as DrawerNavType].title}
      </Text>

      {content[nav as DrawerNavType].Component}
    </Box>
  );
}
