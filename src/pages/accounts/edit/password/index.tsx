import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextInput from "@/components/auth/AuthTextInput";
import {
  Center,
  Divider,
  FormControl,
  Flex,
  FormHelperText,
  FormErrorMessage,
  Text,
  VStack,
  Wrap
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function EditPassword() {
  const router = useRouter();
  const isError = false;

  return (
    <>
      <Head>
        <title>Arterest | Sign Up</title>
      </Head>
      <AuthLayout>
        <Center color="black">Arterest</Center>

        <FormControl as={VStack} isInvalid={isError}>
          <AuthTextInput type="password" placeholder="이전 비밀번호" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
          <AuthTextInput type="password" placeholder="새 비밀번호" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
          <AuthTextInput type="password" placeholder="새 비밀번호 확인" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}

          <AuthButton
            bg="red.900"
            color="white"
            onClick={() => {
              router.back();
            }}
          >
            비밀번호 변경
          </AuthButton>
        </FormControl>
      </AuthLayout>
    </>
  );
}
