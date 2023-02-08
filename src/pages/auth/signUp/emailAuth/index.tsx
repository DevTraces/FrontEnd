import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextInput from "@/components/auth/AuthTextInput";
import {
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Icon,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";

export default function EmailAuth() {
  const router = useRouter();
  const toast = useToast();
  const isError = false;

  return (
    <>
      <Head>
        <title>ArtBubble | Email Authorization</title>
      </Head>
      <AuthLayout>
        <Center>
          <Icon
            as={FontAwesomeIcon}
            icon={faPaperPlane}
            color="primary"
            boxSize="60px"
          />
        </Center>
        <Text textAlign="center" wordBreak="keep-all">
          codeisneverodd@gmail.com 주소로 전송된 인증코드를 입력하세요.
          <Text
            as="span"
            display="inline"
            color="primary"
            ml="10px"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => {
              toast({
                title: "인증코드가 전송되었습니다.",
                status: "success",
                duration: 3000
              });
            }}
          >
            코드 재전송
          </Text>
        </Text>

        <FormControl as={VStack} isInvalid={isError}>
          <AuthTextInput type="number" placeholder="인증 코드" />
          {!isError ? (
            <FormHelperText />
          ) : (
            <FormErrorMessage>인증코드를 입력해주세요.</FormErrorMessage>
          )}
          <AuthButton
            onClick={() => {
              router.push("/auth/profile");
            }}
          >
            다음
          </AuthButton>
        </FormControl>
      </AuthLayout>
    </>
  );
}
