import {
  Flex,
  Icon,
  Text,
  useDisclosure,
  useOutsideClick
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Nav, NAVS } from "../../constants/nav";
import Drawer from "./Drawer";

export default function SideBar() {
  const router = useRouter();
  const { isOpen, onToggle, onClose } = useDisclosure();
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
      case "like":
        onToggle();
        break;
      default:
        router.push(href);
        onClose();
    }
  };

  return (
    <>
      {isOpen && <Drawer ref={drawerRef} selectedNav={selectedNav} />}
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
          <Flex pl={10} gap={5}>
            <Text color="red" fontSize="3xl" fontFamily="cursive">
              A
            </Text>
            {!isOpen && (
              <Text
                gap={10}
                fontSize="3xl"
                display={{ md: "none", xl: "inline-block" }}
              >
                Arterest
              </Text>
            )}
          </Flex>
          {NAVS.map(({ key, title, icon, href }) => (
            <Flex
              pl={10}
              h={50}
              gap={10}
              align="center"
              cursor="pointer"
              fontWeight="bold"
              _hover={{
                bg: "red.400",
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
    </>
  );
}
