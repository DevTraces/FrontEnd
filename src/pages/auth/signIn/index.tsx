import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextInput from "@/components/auth/AuthTextInput";
import {
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Divider,
  Wrap,
  VStack
} from "@chakra-ui/react";
import Head from "next/head";
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
        <Center color="black">Arterest</Center>
        <AuthButton bg="yellow.500" onClick={() => {}}>
          카카오 계정으로 로그인
        </AuthButton>
        <Divider />
        <FormControl as={VStack} isInvalid={isError}>
          <AuthTextInput type="email" placeholder="이메일 주소" />
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
          <Wrap w="full">
            <AuthButton
              bg="red.900"
              color="white"
              onClick={() => {
                router.push("/feed");
              }}
            >
              로그인
            </AuthButton>
            <AuthButton
              bg="red.900"
              color="white"
              onClick={() => {
                router.push("signUp");
              }}
            >
              가입하기
            </AuthButton>
          </Wrap>
        </FormControl>
      </AuthLayout>
    </>
  );
}
