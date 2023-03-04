import Logo from "@/components/@common/Logo";
import AnimatedBubble from "@/components/root/AnimatedBubble";
import useAuth from "@/hooks/useAuth";
import useClient from "@/hooks/useClient";
import currentUser from "@/utils/currentUser";
import { Box, Button, Center, HStack, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { signOutMutation } = useAuth();
  const isValidUser = currentUser.isValidUser();
  const isClient = useClient();
  const toast = useToast();

  if (!isClient) return null;

  return (
    <>
      <Head>
        <title>ArtBubble</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box bg="white" h="100vh">
        <Box zIndex="modal">
          <HStack justifyContent="space-between" p="32px">
            <Box>
              <Logo type="text" width={140} />
            </Box>

            <HStack>
              {isValidUser ? (
                <>
                  <Link href="/feed">
                    <Button bg="primary" color="white">
                      내 피드
                    </Button>
                  </Link>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => {
                      signOutMutation.mutate(undefined, {
                        onSuccess: () => {
                          toast({
                            title: "로그아웃에 성공했어요",
                            status: "success",
                            duration: 3000
                          });
                        }
                      });
                    }}
                  >
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/signIn">
                    <Button bg="primary" color="white">
                      로그인
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      router.push("/auth/signUp");
                    }}
                  >
                    가입하기
                  </Button>
                </>
              )}
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
      </Box>

      <Box position="absolute" top="50%" left="20%" zIndex="base">
        <AnimatedBubble color="blue" scale={2} delay={0.5} />
      </Box>
      <Box
        position="absolute"
        top={{ sm: "40%", md: "10%" }}
        left="50%"
        zIndex="base"
      >
        <AnimatedBubble color="green" scale={2.5} delay={1.5} />
      </Box>
      <Box
        position="absolute"
        bottom={{ sm: "30%", md: "20%" }}
        right="30%"
        zIndex="base"
      >
        <AnimatedBubble color="purple" scale={3} delay={2.5} />
      </Box>
    </>
  );
}
