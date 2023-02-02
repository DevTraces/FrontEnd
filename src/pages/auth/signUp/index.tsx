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
import AuthButton from "../components/AuthButton";
import AuthLayout from "../components/AuthLayout";
import AuthTextInput from "../components/AuthTextInput";

export default function SignUp() {
  const router = useRouter();
  const isError = false;

  return (
    <>
      <Head>
        <title>Arterest | Sign Up</title>
      </Head>
      <AuthLayout>
        <Center>Arterest</Center>
        <Text>그림을 좋아하는 사람들과 소통하려면 가입하세요.</Text>
        <AuthButton bg="yellow.500" color="white">
          카카오 계정으로 시작하기
        </AuthButton>
        <Divider />
        <FormControl as={Flex} direction="column" isInvalid={isError}>
          <AuthTextInput type="email" placeholder="이메일 주소" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
          <AuthButton
            bg="red.900"
            color="white"
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
