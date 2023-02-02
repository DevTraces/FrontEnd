import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextInput from "@/components/auth/AuthTextInput";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import {
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const isError = false;

  return (
    <>
      <Head>
        <title>Arterest | Sign In</title>
      </Head>
      <AuthLayout>
        <Center color="black">
          <span />
        </Center>
        <KakaoLoginButton />
        <Divider />
        <FormControl as={VStack} isInvalid={isError}>
          <AuthTextInput type="email" placeholder="이메일" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
          <AuthTextInput type="password" placeholder="비밀번호" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}

          <AuthButton
            onClick={() => {
              router.push("/feed");
            }}
          >
            로그인
          </AuthButton>
          <Divider />
          <HStack>
            <Text>아직 계정이 없으신가요?</Text>
            <Text color="primary" fontWeight="bold">
              <Link href="/auth/signUp">계정 만들기</Link>
            </Text>
          </HStack>
        </FormControl>
      </AuthLayout>
    </>
  );
}
