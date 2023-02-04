import NavLayout from "@/components/NavLayout";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const username = "김경현";
export default function Profile() {
  const router = useRouter();
  const { nickname } = router.query;

  return (
    <>
      <Head>
        <title>Arterest | Profile</title>
      </Head>
      <NavLayout>
        <Flex direction="column" pt="100px" w="max-content" pb="40px" m="auto">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb="20px"
            gap="20px"
          >
            <Avatar boxSize="80px" />
            <Flex direction="row" gap="20px">
              <VStack>
                <Text fontWeight="bold">0</Text>
                <Text>게시물</Text>
              </VStack>
              <VStack>
                <Text fontWeight="bold">0</Text>
                <Text>팔로잉</Text>
              </VStack>
              <VStack>
                <Text fontWeight="bold">0</Text>
                <Text>팔로워</Text>
              </VStack>
            </Flex>
          </Flex>
          <Flex
            pb="20px"
            gap="40px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Text fontWeight="bold" w="full" fontSize="xl">
                {username}
              </Text>
              <Text fontSize="md" pr="8px" color="gray.700" w="full">
                @{nickname}
              </Text>
            </Box>
            <Box ml="40px">
              <Link href="/accounts/edit">
                <Button
                  bg="gray.200"
                  colorScheme="gray"
                  fontWeight="bold"
                  size="sm"
                >
                  프로필 편집
                </Button>
              </Link>
            </Box>
          </Flex>
        </Flex>

        <Tabs variant="line" align="center" colorScheme="red">
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
      </NavLayout>
    </>
  );
}
