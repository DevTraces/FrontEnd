import Logo from "@/components/Logo";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useOutsideClick
} from "@chakra-ui/react";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Nav } from "../../constants/nav";
import Drawer from "../Drawer";

export default function TopBar() {
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

  return (
    <>
      {isOpen && (
        <Drawer
          display={{
            sm: "block",
            md: "none"
          }}
          ref={drawerRef}
          selectedNav={selectedNav}
        />
      )}
      <Flex
        position="fixed"
        zIndex={50}
        direction="row"
        top={0}
        left={0}
        w="100vw"
        h="80px"
        bg="white"
        align="center"
        py={8}
        px={4}
        display={{
          sm: "flex",
          md: "none"
        }}
      >
        <Box mr={20} w="200px" h="100px" position="relative">
          <Logo type="text" fill />
        </Box>
        <InputGroup mr={10} data-type="navItem">
          <InputLeftElement pointerEvents="none">
            <Icon as={FontAwesomeIcon} icon={faSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            onClick={() => {
              setSelectedNav("search");
              onOpen();
            }}
            type="text"
            bg="gray.200"
            placeholder="검색"
          />
        </InputGroup>
        <Button
          boxSize="40px"
          px="10px"
          data-type="navItem"
          bg="white"
          colorScheme="whiteAlpha"
          onClick={() => {
            setSelectedNav("alert");
            if (selectedNav === "alert") {
              onToggle();
            } else {
              onOpen();
            }
          }}
        >
          <Icon as={FontAwesomeIcon} icon={faBell} color="black" />
        </Button>
      </Flex>
    </>
  );
}
