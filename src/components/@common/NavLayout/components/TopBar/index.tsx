import navigationAtom from "@/atoms/navigationAtom";
import Logo from "@/components/@common/Logo";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import NAV_ICON from "../../constants/NAV_ICON";
import useDrawer from "../../hooks/useDrawer";
import useTopBar from "../../hooks/useTopBar";
import Drawer from "../Drawer";
import InputContainer from "../Search/components/Input";

export default function TopBar() {
  const nav = useRecoilValue(navigationAtom);
  const { isOpen } = useDrawer();
  const { select } = useTopBar();

  return (
    <>
      {isOpen && <Drawer />}
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
      >
        <Box mr={20} w="200px" h="100px">
          <Logo type="text" fill />
        </Box>
        <InputContainer onClick={() => select("search")} mr={10} />
        <Button
          boxSize="40px"
          px="10px"
          data-type="navItem"
          bg="white"
          colorScheme="whiteAlpha"
          onClick={() => select("alert")}
        >
          <Icon
            as={FontAwesomeIcon}
            icon={NAV_ICON.alert}
            color={nav === "alert" ? "primary" : "black"}
          />
        </Button>
      </Flex>
    </>
  );
}
