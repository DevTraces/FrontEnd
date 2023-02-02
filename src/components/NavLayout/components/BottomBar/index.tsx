import { Flex, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { Nav, NAVS } from "../../../../pages/feed/constants/nav";

export default function BottomBar() {
  const router = useRouter();
  const selectedKeys: Nav["key"][] = ["feed", "like", "newPost", "profile"];
  const selectedNavs = NAVS.filter(nav => selectedKeys.includes(nav.key));
  return (
    <Flex
      w="100vw"
      h={50}
      bg="white"
      zIndex={50}
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
        <Link href={href}>
          <Icon
            as={FontAwesomeIcon}
            icon={icon}
            boxSize={6}
            color={router.pathname === href ? "red.400" : "black"}
          />
        </Link>
      ))}
    </Flex>
  );
}
