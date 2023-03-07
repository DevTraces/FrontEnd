import FormButton from "@/components/@common/FormButton";
import AuthTextInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import Logo from "@/components/@common/Logo";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useAuth from "@/hooks/useAuth";
import { SignInData } from "@/types/data/auth";
import { Center, Divider, HStack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    formState: { isDirty, isSubmitting, errors, isValid },
    handleSubmit
  } = useForm<{
    email: string;
    password: string;
  }>({ mode: "onChange" });

  const { signInMutation } = useAuth();
  const signIn = (data: SignInData) =>
    signInMutation.mutate(data, {
      onSuccess: () => {
        router.push("/feed");
      }
    });

  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <FormLayout>
        <Center color="black">
          <Logo type="full" height={50} />
        </Center>
        <KakaoLoginButton type="signIn" />
        <Divider />
        <form style={{ width: "100%" }} onSubmit={handleSubmit(signIn)}>
          <AuthTextInput
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            placeholder="이메일"
            {...register("email", VALIDATION_RULE.email)}
          />
          <AuthTextInput
            isInvalid={!!errors.password}
            helperText={
              <Text color="primary" fontWeight="bold">
                <Link href="/accounts/reset/sendEmail">
                  비밀번호를 잊으셨나요?
                </Link>
              </Text>
            }
            errorMessage={errors.password?.message}
            placeholder="비밀번호"
            type="password"
            {...register("password", { required: "비밀번호가 필요해요" })}
          />

          <FormButton
            mt="12px"
            isLoading={isSubmitting || signInMutation.isLoading}
            isDisabled={!isValid || !isDirty}
          >
            로그인
          </FormButton>
        </form>

        <Divider />
        <HStack>
          <Text>아직 계정이 없으신가요?</Text>
          <Text color="primary" fontWeight="bold">
            <Link href="/auth/signUp">계정 만들기</Link>
          </Text>
        </HStack>
      </FormLayout>
    </>
  );
}
