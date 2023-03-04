import { signUpUserAtom } from "@/atoms/auth/signUpUser";
import FormButton from "@/components/@common/FormButton";
import AuthTextInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import Logo from "@/components/@common/Logo";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useAuth from "@/hooks/useAuth";
import useCheck from "@/hooks/useCheck";
import { Center, Divider, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

type FormData = { email: string };

export default function SignUp() {
  const router = useRouter();
  const setSignUpUser = useSetRecoilState(signUpUserAtom);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({ mode: "onChange" });

  const { sendEmailAuthKeyMutation } = useAuth();
  const { emailDuplicateMutation } = useCheck();

  const sendEmailAuthkey = (email: string) => {
    sendEmailAuthKeyMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setSignUpUser(prev => ({ ...prev, email }));
          router.push("/auth/signUp/emailAuth");
        }
      }
    );
  };

  const checkEmailDuplicated = (email: string) => {
    emailDuplicateMutation.mutate(
      { email },
      {
        onSuccess: ({ duplicatedEmail }) => {
          if (!duplicatedEmail) sendEmailAuthkey(email);
          else setError("email", { message: "이미 가입된 이메일입니다" });
        }
      }
    );
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = handleSubmit(
    ({ email }) => checkEmailDuplicated(email)
  );

  return (
    <>
      <Head>
        <title>ArtBubble | Sign Up</title>
      </Head>
      <FormLayout>
        <Center>
          <Logo type="full" height={50} />
        </Center>
        <Text fontSize="2xl" textAlign="center" wordBreak="keep-all">
          그림을 좋아하는 사람들과 소통하려면 가입하세요.
        </Text>
        <KakaoLoginButton type="signUp" />
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
            가입하기
          </FormButton>
        </form>
      </FormLayout>
    </>
  );
}
