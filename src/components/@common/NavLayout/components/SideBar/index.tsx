import navigationAtom, { NavType } from "@/atoms/navigationAtom";
import Logo from "@/components/@common/Logo";
import { Box, Flex, Icon, Show, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import NAV_ICON from "../../constants/NAV_ICON";
import useDrawer from "../../hooks/useDrawer";
import useSideBar from "../../hooks/useSideBar";
import Drawer from "../Drawer";

const navItems: NavType[] = [
  "feed",
  "search",
  "alert",
  "saved",
  "newPost",
  "profile"
];

const navTitle: { [k in NavType]: string } = {
  feed: "홈",
  search: "검색",
  alert: "알림",
  saved: "저장한 목록",
  newPost: "새 포스트",
  profile: "프로필"
};

export default function SideBar() {
  const nav = useRecoilValue(navigationAtom);

  const { isOpen } = useDrawer();
  const { select } = useSideBar();
  return (
    <>
      {isOpen && <Drawer />}
      <Flex
        direction="column"
        bg="white"
        position="fixed"
        top={0}
        left={0}
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

          {navItems.map(n => (
            <Flex
              key={n}
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
              color={nav === n ? "primary" : "black"}
              onClick={() => select(n)}
            >
              <Icon
                key={n}
                as={FontAwesomeIcon}
                icon={NAV_ICON[n]}
                boxSize="20px"
              />
              {!isOpen && (
                <Text
                  display={{
                    base: "none",
                    xl: "block"
                  }}
                >
                  {navTitle[n]}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>
  );
}
