import NavLayout from "@/components/NavLayout";
import {
  Avatar,
  Button,
  Container,
  HStack,
  Text,
  VStack,
  Icon,
  Divider,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Stack
} from "@chakra-ui/react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { nickname } = router.query;

  return (
    <>
      <Head>
        <title>Arterest | Profile</title>
      </Head>
      <NavLayout>
        <Container centerContent p={10}>
          <HStack spacing={10} p={10}>
            <Avatar size="2xl" />
            <VStack spacing={2}>
              <HStack w="full" spacing={5} alignItems="center">
                <Text>사용자 이름</Text>
                <Link href="/accounts/edit">
                  <Button
                    bg="gray.400"
                    fontWeight="bold"
                    display={{ sm: "none", md: "block", xl: "block" }}
                  >
                    프로필 편집
                  </Button>
                </Link>
                <Link href="/accounts/edit">
                  <Button display={{ sm: "block", md: "none", xl: "none" }}>
                    <Icon
                      as={FontAwesomeIcon}
                      icon={faPencil}
                      color="gray.400"
                      boxSize={5}
                    />
                  </Button>
                </Link>
              </HStack>
              <Stack
                direction={{ sm: "column", md: "row", xl: "row" }}
                spacing={{ sm: "5px", md: 10, xl: 10 }}
                w="full"
              >
                <HStack spacing={2}>
                  <Text>게시물</Text>
                  <Text fontWeight="bold">0</Text>
                </HStack>
                <HStack spacing={2}>
                  <Text>팔로잉</Text>
                  <Text fontWeight="bold">0</Text>
                </HStack>
                <HStack spacing={2}>
                  <Text>팔로워</Text>
                  <Text fontWeight="bold">0</Text>
                </HStack>
              </Stack>
              <Text w="full" fontWeight="bold">
                {nickname}
              </Text>
            </VStack>
          </HStack>
          <Tabs>
            <TabList>
              <Tab>게시물</Tab>
              <Tab>좋아요</Tab>
              <Tab>팔로잉</Tab>
              <Tab>팔로워</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>게시물</TabPanel>
              <TabPanel>좋아요</TabPanel>
              <TabPanel>팔로잉</TabPanel>
              <TabPanel>팔로워</TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
        <Divider />
      </NavLayout>
    </>
  );
}
