import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextInput from "@/components/auth/AuthTextInput";
import {
  Avatar,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  VStack
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const isError = false;

  return (
    <>
      <Head>
        <title>Arterest | Profile</title>
      </Head>
      <AuthLayout>
        <VStack>
          <Avatar size="2xl" />
          <AuthButton bg="none" color="primary" onClick={() => {}}>
            사진 업로드
          </AuthButton>
        </VStack>
        <FormControl as={VStack} isInvalid={isError}>
          <AuthTextInput type="text" placeholder="닉네임" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
          <AuthTextInput type="text" placeholder="이름" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
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
            가입 완료
          </AuthButton>
        </FormControl>
      </AuthLayout>
    </>
  );
}
