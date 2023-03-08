import resetUserAtom from "@/atoms/resetUserAtom";
import FormButton from "@/components/@common/FormButton";
import FormLayout from "@/components/@common/FormLayout";
import useAuth from "@/hooks/useAuth";
import useCheck from "@/hooks/useCheck";
import useClient from "@/hooks/useClient";
import {
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
  const [resetUser, setResetUser] = useRecoilState(resetUserAtom);
  const isClient = useClient();
  const [authKey, setAuthKey] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const { emailAuthKeyCheckForResetMutation } = useCheck();
  const { sendEmailAuthKeyMutation } = useAuth();

  const isAuthKeyValid = authKey.length === 6 && isDirty;

  if (!isClient) return null;

  const handleResendClick = () => {
    if (!resetUser.email) return;
    sendEmailAuthKeyMutation.mutate({ email: resetUser.email });
  };

  const handleAutKeyInputChange = (value: string) => {
    setIsDirty(true);
    setAuthKey(value);
  };

  const handleSubmit = () => {
    setIsDirty(false);
    if (isAuthKeyValid)
      emailAuthKeyCheckForResetMutation.mutate(
        {
          email: resetUser.email as string,
          authKey
        },
        {
          onSuccess: ({ isCorrect, passwordResetKey }) => {
            if (isCorrect) {
              setResetUser(prev => ({ ...prev, passwordResetKey }));
              router.push("/accounts/reset/password");
            }
          }
        }
      );
  };

  return (
    <>
      <Head>
        <title>비밀번호 재설정</title>
      </Head>
      <FormLayout>
        {!resetUser.email ? (
          <>
            <Center>
              <Icon
                as={FontAwesomeIcon}
                icon={faPaperPlane}
                color="primary"
                boxSize="60px"
              />
            </Center>
            <Text display="inline">이메일 인증을 다시 진행해주세요</Text>
            <Button
              onClick={() => {
                router.push("/accounts/reset/sendEmail");
              }}
            >
              이메일 인증 하기
            </Button>
          </>
        ) : (
          <>
            <Center>
              <Icon
                as={FontAwesomeIcon}
                icon={faPaperPlane}
                color="primary"
                boxSize="60px"
              />
            </Center>
            <Text textAlign="center" wordBreak="keep-all">
              {resetUser.email} 주소로 전송된 인증코드를 입력하세요.
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
            </Text>
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
              isLoading={emailAuthKeyCheckForResetMutation.isLoading}
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
