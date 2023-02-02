import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Text,
  Divider,
  VStack
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import AuthLayout from "../../components/AuthLayout";
import AuthTextInput from "../../components/AuthTextInput";

export default function EmailAuth() {
  const router = useRouter();
  const isError = false;

  return (
    <>
      <Head>
        <title>Arterest | Email Authorization</title>
      </Head>
      <AuthLayout>
        <Center>Arterest</Center>
        <Divider />
        <Text>
          <Text>codeisneverodd@gmail.com</Text> 주소로 전송된 인증코드를
          입력하세요.
        </Text>
        <Button bg="none" color="red.900">
          코드 재전송
        </Button>
        <FormControl as={VStack} isInvalid={isError}>
          <AuthTextInput type="number" placeholder="인증 코드" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>인증코드를 입력해주세요.</FormErrorMessage>
          )}
          <Button
            bg="red.900"
            color="white"
            onClick={() => {
              router.push("/auth/profile");
            }}
          >
            다음
          </Button>
        </FormControl>
      </AuthLayout>
    </>
  );
}
