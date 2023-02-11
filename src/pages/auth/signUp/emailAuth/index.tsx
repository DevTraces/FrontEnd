import { postEmailAuthKey } from "@/api/auth/email/auth-key";
import { postEmailAuthKeyCheck } from "@/api/auth/email/auth-key/check";
import { signUpUserAtom } from "@/atoms/auth/signUpUser";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

interface FormData {
  authKey: string;
}

export default function EmailAuth() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const user = useRecoilValue(signUpUserAtom);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleResendClick = async () => {
    try {
      if (!user.email) throw Error("이메일이 없습니다");
      await postEmailAuthKey(user.email);
      toast({
        title: "인증코드가 전송되었습니다.",
        status: "success",
        duration: 3000
      });
    } catch (e) {
      let message = "Unknown Error";
      if (e instanceof Error) message = e.message;
      toast({
        title: message,
        status: "warning",
        duration: 3000
      });
    }
  };

  const handleFormSubmit = handleSubmit(async formData => {
    const { authKey } = formData;
    try {
      if (!user.email) throw new Error("이메일이 없습니다.");
      const res = await postEmailAuthKeyCheck(user.email, authKey);
      if (res.isCorrect) {
        router.push("/auth/profile");
      } else {
        setError("authKey", { message: "인증코드가 올바르지 않습니다" });
      }
    } catch (e) {
      let message = "Unknown Error";
      if (e instanceof Error) message = e.message;
      setError("authKey", { message });
    }
  });

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
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <FormControl as={VStack} isInvalid={!!errors.authKey}>
            <AuthTextInput
              type="text"
              placeholder="인증 코드"
              {...register("authKey", {
                required: "인증코드를 입력해야해요."
              })}
            />
            {!errors.authKey ? (
              <FormHelperText opacity={0} h="20px">
                {user.email} 주소로 전송된 인증코드를 확인해주세요.
              </FormHelperText>
            ) : (
              <FormErrorMessage h="20px" w="full">
                {errors.authKey?.message}
              </FormErrorMessage>
            )}
            <AuthButton type="submit" isLoading={isSubmitting}>
              다음
            </AuthButton>
          </FormControl>
        </form>
      </AuthLayout>
    </>
  );
}
