import resetUserAtom from "@/atoms/resetUserAtom";
import FormButton from "@/components/@common/FormButton";
import AuthTextInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import Logo from "@/components/@common/Logo";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useAuth from "@/hooks/useAuth";
import useCheck from "@/hooks/useCheck";
import { Center, Divider, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

type FormData = { email: string };

export default function SendEmail() {
  const router = useRouter();
  const toast = useToast();
  const setResetUser = useSetRecoilState(resetUserAtom);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({ mode: "onChange" });

  const { sendEmailAuthKeyMutation } = useAuth();
  const { emailDuplicateMutation } = useCheck();

  const sendEmailAuthkey = (email: string) => {
    sendEmailAuthKeyMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setResetUser(prev => ({ ...prev, email }));
          router.push("/accounts/reset/emailAuth");
        },
        onError: () => {
          toast({
            title: "인증코드 전송에 실패했어요",
            status: "error",
            duration: 2000
          });
        }
      }
    );
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = handleSubmit(
    ({ email }) => sendEmailAuthkey(email)
  );

  return (
    <>
      <Head>
        <title>ArtBubble | 비밀번호 재설정</title>
      </Head>
      <FormLayout>
        <Center>
          <Logo type="full" height={50} />
        </Center>
        <Text fontSize="2xl" textAlign="center" wordBreak="keep-all">
          비밀번호를 재설정 할 이메일을 입력해주세요
        </Text>
        <Divider />
        <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
          <AuthTextInput
            placeholder="이메일"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register("email", VALIDATION_RULE.email)}
          />
          <FormButton
            isLoading={
              isSubmitting ||
              sendEmailAuthKeyMutation.isLoading ||
              emailDuplicateMutation.isLoading
            }
            isDisabled={!isValid || !isDirty}
          >
            인증코드 전송
          </FormButton>
        </form>
      </FormLayout>
    </>
  );
}
