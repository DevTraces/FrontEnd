import { Flex, Icon, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { NAVS } from "../../constants/nav";

export default function SideBar() {
  const router = useRouter();

  return (
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
      pt={10}
    >
      <Flex as="nav" direction="column" gap="50px">
        <Flex pl={10} gap={5}>
          <Text color="red" fontSize="3xl" fontFamily="cursive">
            A
          </Text>
          <Text
            gap={10}
            fontSize="3xl"
            display={{ md: "none", xl: "inline-block" }}
          >
            Arterest
          </Text>
        </Flex>
        {NAVS.map(({ key, title, icon, href }) => (
          <Link href={href}>
            <Flex
              pl={10}
              h={50}
              gap={10}
              align="center"
              cursor="pointer"
              fontWeight="bold"
              _hover={{
                bg: "red.400",
                color: "white"
              }}
              color={router.pathname === href ? "red.400" : "black"}
            >
              <Icon key={key} as={FontAwesomeIcon} icon={icon} />
              <Text
                display={{
                  sm: "none",
                  xl: "block"
                }}
              >
                {title}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}
