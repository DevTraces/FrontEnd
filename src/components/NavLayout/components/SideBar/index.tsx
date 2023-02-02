import {
  Box,
  Flex,
  Icon,
  Text,
  useDisclosure,
  useOutsideClick
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Nav, NAVS } from "../../../../pages/home/constants/nav";
import Alert from "./Alert";
import Like from "./Like";
import Search from "./Search";

export default function SideBar() {
  const router = useRouter();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [selectedNav, setSelectedNav] = useState<Nav["key"]>("home");
  const drawerWantedNavs: Nav["key"][] = ["search", "alert", "like"];

  const drawerRef = useRef(null);
  useOutsideClick({
    ref: drawerRef,
    handler: e => {
      const target = e.target as Element;
      if (target.closest('[data-type="navItem"]')) return;
      onClose();
    }
  });

  return (
    <>
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
              color={selectedNav === key ? "red.400" : "black"}
              onClick={() => {
                if (drawerWantedNavs.includes(key)) {
                  if (key === selectedNav) {
                    onToggle();
                  } else {
                    onOpen();
                  }
                } else {
                  router.push(href);
                  onClose();
                }

                setSelectedNav(key);
              }}
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
      {drawerWantedNavs.includes(selectedNav) && isOpen && (
        <Box
          zIndex="modal"
          display={{
            sm: "none",
            md: "block"
          }}
          position="fixed"
          left="100px"
          top={0}
          p="40px"
          w={300}
          bg="white"
          h="100vh"
          ref={drawerRef}
        >
          {selectedNav === "search" && <Search />}
          {selectedNav === "alert" && <Alert />}
          {selectedNav === "like" && <Like />}
        </Box>
      )}
    </>
  );
}
