import Logo from "@/components/@common/Logo";
import { Box, Flex, Icon, Show, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import useNavBar, { Nav, NavKey } from "../../hooks/useNavBar";
import Drawer from "../Drawer";

export default function SideBar() {
  const router = useRouter();
  const {
    navs,
    onNavClick,
    isCurrentNav,
    drawerRef,
    isDrawerOpen,
    onDrawerToggle,
    onDrawerOpen
  } = useNavBar();

  const handleNavClick = (key: NavKey, href: Nav["href"]) => {
    onNavClick(key);

    switch (key) {
      case "search":
      case "alert":
        if (isCurrentNav(key)) {
          onDrawerToggle();
        } else {
          onDrawerOpen();
        }
        break;
      default:
        if (href) router.push(href);
    }
  };

  return (
    <>
      {isDrawerOpen && (
        <Drawer
          display={{
            sm: "none",
            md: "block"
          }}
          ref={drawerRef}
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
              <Box pl={isDrawerOpen ? 0 : "8px"}>
                <Logo
                  type={isDrawerOpen ? "icon" : "text"}
                  height={isDrawerOpen ? 44 : 22}
                />
              </Box>
            </Show>
          </Flex>

          {navs.map(({ key, title, icon, href }) => (
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
              color={isCurrentNav(key) ? "primary" : "black"}
              onClick={() => handleNavClick(key, href)}
            >
              <Icon key={key} as={FontAwesomeIcon} icon={icon} boxSize="20px" />
              {!isDrawerOpen && (
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
