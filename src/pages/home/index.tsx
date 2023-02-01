/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import BottomBar from "./components/BottomBar";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <Box bg="gray.200" w="100vw" h="100vh">
        <TopBar />
        <SideBar />
        <BottomBar />
      </Box>
    </>
  );
}
