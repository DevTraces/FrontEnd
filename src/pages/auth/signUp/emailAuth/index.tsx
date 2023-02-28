import { signUpUserAtom } from "@/atoms/auth/signUpUser";
import FormButton from "@/components/@common/FormButton";
import FormLayout from "@/components/@common/FormLayout";
import useAuth from "@/hooks/useAuth";
import useCheck from "@/hooks/useCheck";
import {
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
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function EmailAuth() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [authKey, setAuthKey] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const user = useRecoilValue(signUpUserAtom);

  const { emailAuthKeyCheckMutation } = useCheck();
  const { sendEmailAuthKeyMutation } = useAuth();

  const isAuthKeyValid = authKey.length === 6 && isDirty;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleResendClick = () => {
    if (!user.email) return;
    sendEmailAuthKeyMutation.mutate({ email: user.email });
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
          email: user.email as string,
          authKey
        },
        {
          onSuccess: ({ correct }) => {
            if (correct) router.push("/auth/signUp/profile");
          }
        }
      );
  };

  return (
    <>
      <Head>
        <title>ArtBubble | Email Authorization</title>
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
        <Text textAlign="center" wordBreak="keep-all">
          {user.email} 주소로 전송된 인증코드를 입력하세요.
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
          isLoading={emailAuthKeyCheckMutation.isLoading}
          isDisabled={!isAuthKeyValid}
          onClick={() => handleSubmit()}
        >
          다음
        </FormButton>
      </FormLayout>
    </>
  );
}
