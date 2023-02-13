import { postEmailAuthKey } from "@/api/auth/email/auth-key";
import { postEmailAuthKeyCheck } from "@/api/auth/email/auth-key/check";
import { signUpUserAtom } from "@/atoms/auth/signUpUser";
import FormButton from "@/components/@common/FormButton";
import FormLayout from "@/components/@common/FormLayout";
import AuthTextInput from "@/components/@common/FormInput";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import { Center, Icon, Text, useToast } from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useMutation } from "@tanstack/react-query";

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
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const emailAuthKeyMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => postEmailAuthKey(email),
    onSuccess: () => {
      toast({
        title: "인증코드가 전송되었습니다",
        status: "success",
        duration: 3000
      });
    },
    onError: () => {
      toast({
        title: "인증코드 전송에 실패하였습니다",
        status: "error",
        duration: 3000
      });
    }
  });

  const emailAuthKeyCheckMutation = useMutation({
    mutationFn: ({ email, authKey }: { email: string; authKey: string }) =>
      postEmailAuthKeyCheck(email, authKey),
    onSuccess: res => {
      if (res.isCorrect) {
        router.push("/auth/profile");
      } else {
        setError("authKey", { message: "인증코드가 올바르지 않습니다" });
      }
    },
    onError: () => {
      setError("authKey", {
        message: "인증코드 확인중 에러가 발생하였습니다."
      });
    }
  });

  if (!isClient) return null;

  const handleResendClick = () => {
    if (!user.email) return;
    emailAuthKeyMutation.mutate({ email: user.email });
  };

  const handleFormSubmit = handleSubmit(async formData => {
    if (!user.email) return;
    const { authKey } = formData;
    emailAuthKeyCheckMutation.mutate({ email: user.email, authKey });
  });

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
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <AuthTextInput
            type="text"
            isInvalid={!!errors.authKey}
            placeholder="인증 코드"
            errorMessage={errors.authKey?.message}
            {...register("authKey", VALIDATION_RULE.authKey)}
          />
          <FormButton
            isLoading={isSubmitting}
            isDisabled={!isDirty || !isValid}
          >
            다음
          </FormButton>
        </form>
      </FormLayout>
    </>
  );
}
