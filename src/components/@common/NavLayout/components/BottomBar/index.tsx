import { Flex, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import useNavBar from "../../hooks/useNavBar";

export default function BottomBar() {
  const router = useRouter();

  const { navs, isCurrentNav, onNavClick } = useNavBar({
    navKeys: ["feed", "saved", "new", "user"]
  });

  const handleNavClick = (key: string, href?: string) => {
    onNavClick(key);
    if (href) router.push(href);
  };

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
      display={{
        base: "flex",
        md: "none"
      }}
    >
      {navs.map(({ key, icon, href }) => (
        <Icon
          key={href}
          as={FontAwesomeIcon}
          icon={icon}
          boxSize={6}
          cursor="pointer"
          color={isCurrentNav(key) ? "primary" : "black"}
          onClick={() => handleNavClick(key, href)}
        />
      ))}
    </Flex>
  );
}
