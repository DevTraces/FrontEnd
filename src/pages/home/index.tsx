/* eslint-disable @typescript-eslint/no-use-before-define */
import NavLayout from "@/components/NavLayout";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import PostCard from "./components/PostCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <NavLayout>
        <Flex direction="column" gap={10} m="auto" mt={20} mb={20}>
          <PostCard />
          <PostCard />
        </Flex>
      </NavLayout>
    </>
  );
}
