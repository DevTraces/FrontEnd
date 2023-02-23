import { Button, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function APIError() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Artbubble | API Error</title>
      </Head>
      <Center>
        <Button onClick={() => router.back()}>요청 다시하기</Button>
      </Center>
    </>
  );
}
