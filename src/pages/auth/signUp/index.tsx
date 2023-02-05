import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextInput from "@/components/auth/AuthTextInput";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import Logo from "@/components/Logo";
import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Text,
  Divider
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const isError = false;

  return (
    <>
      <Head>
        <title>ArtBubble | Sign Up</title>
      </Head>
      <AuthLayout>
        <Center>
          <Logo type="full" height={50} />
        </Center>
        <Text fontSize="2xl" textAlign="center" wordBreak="keep-all">
          그림을 좋아하는 사람들과 소통하려면 가입하세요.
        </Text>
        <KakaoLoginButton>카카오로 시작하기</KakaoLoginButton>
        <Divider />
        <FormControl as={Flex} direction="column" isInvalid={isError} gap="5px">
          <AuthTextInput type="email" placeholder="이메일" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
          <AuthButton
            onClick={() => {
              router.push("signUp/emailAuth");
            }}
          >
            가입하기
          </AuthButton>
        </FormControl>
      </AuthLayout>
    </>
  );
}
