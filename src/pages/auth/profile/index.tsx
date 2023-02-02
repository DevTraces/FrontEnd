import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  VStack
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthButton from "../components/AuthButton";
import AuthLayout from "../components/AuthLayout";
import AuthTextInput from "../components/AuthTextInput";

export default function Profile() {
  const router = useRouter();
  const isError = false;

  return (
    <>
      <Head>
        <title>Arterest | Profile</title>
      </Head>
      <AuthLayout>
        <Avatar m="auto" size="2xl" />
        <Button bg="none" color="red.900" onClick={() => {}}>
          사진 업로드
        </Button>
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
            bg="red.900"
            color="white"
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
