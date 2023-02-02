/* eslint-disable @typescript-eslint/no-use-before-define */
import { Center, Flex } from "@chakra-ui/react";
import Head from "next/head";
import BottomBar from "./components/BottomBar";
import PostCard from "./components/PostCard";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <Center bg="gray.100" top={0} left={0} right={0} bottom={0}>
        <TopBar />
        <SideBar />
        <BottomBar />
        <Flex direction="column" gap={10} m="auto" mt={20} mb={20}>
          <PostCard />
          <PostCard />
        </Flex>
      </Center>
    </>
  );
}
