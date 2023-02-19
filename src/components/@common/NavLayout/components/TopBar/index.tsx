import Logo from "@/components/@common/Logo";
import {
  Box,
  Button,
  Flex,
  Icon,
  useDisclosure,
  useOutsideClick
} from "@chakra-ui/react";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Nav } from "../../constants/nav";
import SearchProvider from "../../SearchContext";
import Drawer from "../Drawer";
import InputContainer from "../Search/components/Input";

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

  const handleInputClick = () => {
    setSelectedNav("search");
    onOpen();
  };

  const handleAlertClick = () => {
    setSelectedNav("alert");
    if (selectedNav === "alert") {
      onToggle();
    } else {
      onOpen();
    }
  };

  return (
    <SearchProvider>
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
        <Box mr={20} w="200px" h="100px">
          <Logo type="text" fill />
        </Box>
        <InputContainer onClick={handleInputClick} mr={10} />
        <Button
          boxSize="40px"
          px="10px"
          data-type="navItem"
          bg="white"
          colorScheme="whiteAlpha"
          onClick={handleAlertClick}
        >
          <Icon as={FontAwesomeIcon} icon={faBell} color="black" />
        </Button>
      </Flex>
    </SearchProvider>
  );
}
