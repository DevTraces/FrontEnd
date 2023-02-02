import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <Head>
        <title>Next.js App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="white" h="100vh">
        <HStack justifyContent="space-between" p="10px">
          <HStack>
            <Text fontSize="3xl" color="red" fontFamily="cursive">
              A
            </Text>
            <Text>Arterest</Text>
          </HStack>
          <HStack>
            <Link href="/auth/signIn">
              <Button bg="red" color="white">
                로그인
              </Button>
            </Link>
            <Link href="/auth/signUp">
              <Button>가입하기</Button>
            </Link>
          </HStack>
        </HStack>
        <Center m="auto" mt="20%" w="50%">
          <Text
            fontSize={{ sm: "4xl", md: "5xl", xl: "6xl" }}
            textAlign="center"
            wordBreak="keep-all"
          >
            그림을 좋아하는 사람들과 소통해보세요
          </Text>
        </Center>
      </Box>
    </>
  );
}
