import { postEmailAuthKey } from "@/api/auth/email/auth-key";
import { getEmailDuplicateCheck } from "@/api/auth/email/check";
import { SignUpUser, signUpUserAtom } from "@/atoms/auth/signUpUser";
import FormButton from "@/components/@common/FormButton";
import FormLayout from "@/components/@common/FormLayout";
import AuthTextInput from "@/components/@common/FormInput";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import Logo from "@/components/@common/Logo";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import { Center, Divider, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

type FormData = Pick<SignUpUser, "email">;

export default function SignUp() {
  const router = useRouter();
  const setSignUpUser = useSetRecoilState(signUpUserAtom);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({ mode: "onChange" });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = handleSubmit(
    async formData => {
      const { email } = formData;

      try {
        if (!email) throw Error("이메일을 입력해야 합니다.");
        const res = await getEmailDuplicateCheck(email);

        if (res.isDuplicated) {
          setError("email", { message: "이미 가입된 이메일입니다" });
        } else {
          await postEmailAuthKey(email);
          setSignUpUser(prev => ({ ...prev, ...formData }));
          router.push("/auth/signUp/emailAuth");
        }
      } catch (e) {
        let message = "Unknown Error";
        if (e instanceof Error) message = e.message;
        setError("email", { message });
      }
    }
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
        <KakaoLoginButton />
        <Divider />
        <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
          <AuthTextInput
            placeholder="이메일"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register("email", VALIDATION_RULE.email)}
          />
          <FormButton
            isLoading={isSubmitting}
            isDisabled={!isValid || !isDirty}
          >
            가입하기
          </FormButton>
        </form>
      </FormLayout>
    </>
  );
}
