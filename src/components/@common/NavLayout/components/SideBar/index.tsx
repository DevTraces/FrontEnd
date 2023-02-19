import Logo from "@/components/@common/Logo";
import {
  Box,
  Flex,
  Icon,
  Show,
  Text,
  useDisclosure,
  useOutsideClick
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Nav, NAVS } from "../../constants/nav";
import SearchProvider from "../../SearchContext";
import Drawer from "../Drawer";

export default function SideBar() {
  const router = useRouter();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [selectedNav, setSelectedNav] = useState<Nav["key"] | null>(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) setSelectedNav(null);
  }, [isOpen]);

  useOutsideClick({
    ref: drawerRef,
    handler: e => {
      const target = e.target as Element;
      if (target.closest('[data-type="navItem"]')) return;
      onClose();
    }
  });

  const handleNavClick = (key: Nav["key"], href: Nav["href"]) => {
    setSelectedNav(key);
    switch (key) {
      case "search":
      case "alert":
        if (selectedNav === key) {
          onToggle();
        } else {
          onOpen();
        }
        break;
      default:
        router.push(href);
        onClose();
    }
  };

  return (
    <SearchProvider>
      {isOpen && (
        <Drawer
          display={{
            sm: "none",
            md: "block"
          }}
          ref={drawerRef}
          selectedNav={selectedNav}
        />
      )}
      <Flex
        direction="column"
        bg="white"
        position="fixed"
        top={0}
        left={0}
        display={{
          sm: "none",
          md: "block"
        }}
        w={{
          md: 100,
          xl: 250
        }}
        h="100vh"
        zIndex="modal"
        pt={10}
      >
        <Flex as="nav" direction="column" gap="50px" data-type="navItem">
          <Flex pl="32px" height="44px" alignItems="center">
            <Show below="xl">
              <Logo type="icon" height={44} />
            </Show>
            <Show above="xl">
              <Box pl={isOpen ? 0 : "8px"}>
                <Logo
                  type={isOpen ? "icon" : "text"}
                  height={isOpen ? 44 : 22}
                />
              </Box>
            </Show>
          </Flex>

          {NAVS.map(({ key, title, icon, href }) => (
            <Flex
              key={key}
              pl={10}
              h={50}
              gap={10}
              align="center"
              cursor="pointer"
              fontWeight="bold"
              _hover={{
                bg: "primary",
                color: "white"
              }}
              color={selectedNav === key ? "primary" : "black"}
              onClick={() => handleNavClick(key, href)}
            >
              <Icon key={key} as={FontAwesomeIcon} icon={icon} boxSize="20px" />
              {!isOpen && (
                <Text
                  display={{
                    sm: "none",
                    xl: "block"
                  }}
                >
                  {title}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </SearchProvider>
  );
}
