/* eslint-disable @typescript-eslint/no-use-before-define */
import NavLayout from "@/components/NavLayout";
import { Center, Flex } from "@chakra-ui/react";
import Head from "next/head";
import PostCard from "./components/PostCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <NavLayout>
        <Center>
          <Flex direction="column" pt={20} gap={10} m="auto" mb={20}>
            <PostCard />
            <PostCard />
          </Flex>
        </Center>
      </NavLayout>
    </>
  );
}
