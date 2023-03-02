import Logo from "@/components/@common/Logo";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useNavBar from "../../hooks/useNavBar";
import Drawer from "../Drawer";
import InputContainer from "../Search/components/Input";

export default function TopBar() {
  const {
    navs,
    onNavClick,
    isCurrentNav,
    drawerRef,
    isDrawerOpen,
    onDrawerToggle,
    onDrawerOpen
  } = useNavBar({
    navKeys: ["search", "alert"]
  });

  const handleNavClick = (key: string) => {
    onNavClick(key);
    onDrawerToggle();
    onDrawerOpen();
  };

  return (
    <>
      {isDrawerOpen && (
        <Drawer
          display={{
            sm: "block",
            md: "none"
          }}
          ref={drawerRef}
        />
      )}
      <Flex
        position="fixed"
        zIndex="9999"
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
        <InputContainer
          onClick={() => {
            handleNavClick("search");
          }}
          mr={10}
        />
        <Button
          boxSize="40px"
          px="10px"
          data-type="navItem"
          bg="white"
          colorScheme="whiteAlpha"
          onClick={() => handleNavClick("alert")}
        >
          <Icon
            as={FontAwesomeIcon}
            icon={navs[navs.findIndex(nav => nav.key === "alert")].icon}
            color={isCurrentNav("alert") ? "primary" : "black"}
          />
        </Button>
      </Flex>
    </>
  );
}
