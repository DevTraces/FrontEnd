import navigationAtom, { RouterNavType } from "@/atoms/navigationAtom";
import { Flex, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import NAV_ICON from "../../constants/NAV_ICON";
import useBottomBar from "../../hooks/useBottomBar";

export default function BottomBar() {
  const nav = useRecoilValue(navigationAtom);
  const { select } = useBottomBar();

  const navItems: RouterNavType[] = ["feed", "saved", "newPost", "profile"];

  return (
    <Flex
      w="100vw"
      h="60px"
      bg="white"
      zIndex="9999"
      alignItems="center"
      justify="space-evenly"
      position="fixed"
      bottom={0}
      left={0}
      py={8}
    >
      {navItems.map(n => (
        <Icon
          key={n}
          as={FontAwesomeIcon}
          icon={NAV_ICON[n]}
          boxSize={6}
          cursor="pointer"
          color={nav === n ? "primary" : "black"}
          onClick={() => select(n)}
        />
      ))}
    </Flex>
  );
}
