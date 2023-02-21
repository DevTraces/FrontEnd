import userAtom from "@/atoms/userAtom";
import { Flex, Icon } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { generateNavs, Nav } from "../../constants/nav";

export default function BottomBar() {
  const user = useRecoilValue(userAtom);
  const navs = useMemo(() => generateNavs(user.nickname), [user]);
  const router = useRouter();
  const selectedKeys: Nav["key"][] = ["feed", "saved", "newPost", "profile"];
  const selectedNavs = navs.filter(nav => selectedKeys.includes(nav.key));

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
        <Link key={href} href={href}>
          <Icon
            as={FontAwesomeIcon}
            icon={icon}
            boxSize={6}
            color={router.pathname === href ? "primary" : "black"}
          />
        </Link>
      ))}
    </Flex>
  );
}
