import { signUpUserAtom } from "@/atoms/auth/signUpUser";
import FormButton from "@/components/@common/FormButton";
import FormLayout from "@/components/@common/FormLayout";
import useAuth from "@/hooks/useAuth";
import useCheck from "@/hooks/useCheck";
import useClient from "@/hooks/useClient";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  PinInput,
  PinInputField,
  Text
} from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function EmailAuth() {
  const router = useRouter();

  const [authKey, setAuthKey] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const isClient = useClient();
  const [signUpUser, setSignUpUser] = useRecoilState(signUpUserAtom);

  const { emailAuthKeyCheckMutation } = useCheck();
  const { sendEmailAuthKeyMutation } = useAuth();

  const isAuthKeyValid = authKey.length === 6 && isDirty;

  if (!isClient) return null;

  const handleResendClick = () => {
    if (!signUpUser.email) return;
    sendEmailAuthKeyMutation.mutate({ email: signUpUser.email });
  };

  const handleAutKeyInputChange = (value: string) => {
    setIsDirty(true);
    setAuthKey(value);
  };

  const handleSubmit = () => {
    setIsDirty(false);
    if (isAuthKeyValid)
      emailAuthKeyCheckMutation.mutate(
        {
          email: signUpUser.email as string,
          authKey
        },
        {
          onSuccess: ({ isCorrect, signUpKey }) => {
            if (isCorrect) {
              setSignUpUser(prev => ({ ...prev, signUpKey }));
              router.push("/auth/signUp/profile");
            }
          }
        }
      );
  };

  return (
    <>
      <Head>
        <title>이메일 인증</title>
      </Head>
      <FormLayout>
        <Center>
          <Icon
            as={FontAwesomeIcon}
            icon={faPaperPlane}
            color="primary"
            boxSize="60px"
          />
        </Center>
        {!signUpUser.email ? (
          <>
            <Text display="inline">이메일 인증을 다시 진행해주세요</Text>
            <Button
              onClick={() => {
                router.push("/auth/signUp");
              }}
            >
              이메일 인증 하기
            </Button>
          </>
        ) : (
          <>
            <Box textAlign="center" wordBreak="keep-all">
              <Text display="inline">
                {signUpUser.email} 주소로 전송된 인증코드를 입력하세요.
              </Text>
              <Text
                as="span"
                display="inline"
                color="primary"
                ml="10px"
                fontWeight="bold"
                cursor="pointer"
                onClick={handleResendClick}
              >
                코드 재전송
              </Text>
            </Box>
            <HStack>
              <PinInput otp onChange={handleAutKeyInputChange}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>

            <FormButton
              isLoading={emailAuthKeyCheckMutation.isLoading}
              isDisabled={!isAuthKeyValid}
              onClick={() => handleSubmit()}
            >
              다음
            </FormButton>
          </>
        )}
      </FormLayout>
    </>
  );
}
