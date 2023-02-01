import { Flex, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Nav, navs } from "../constants/nav";

export default function BottomBar() {
  const router = useRouter();
  const selectedKeys: Nav["key"][] = ["home", "like", "newPost", "profile"];
  const selectedNavs = navs.filter(nav => selectedKeys.includes(nav.key));
  return (
    <Flex
      w="100vw"
      h={50}
      bg="white"
      alignItems="center"
      justify="space-evenly"
      position="fixed"
      bottom={0}
      left={0}
      py={8}
      display={{
        sm: "flex",
        md: "none"
      }}
    >
      {selectedNavs.map(({ icon, href }) => (
        <Icon
          as={FontAwesomeIcon}
          icon={icon}
          boxSize={6}
          color={router.pathname === href ? "red.400" : "black"}
        />
      ))}
    </Flex>
  );
}
