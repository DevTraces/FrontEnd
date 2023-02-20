import { postSignIn } from "@/api/auth/sign-in";
import FormButton from "@/components/@common/FormButton";
import AuthTextInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import Logo from "@/components/@common/Logo";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import { APIError } from "@/types/error";
import { Center, Divider, HStack, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    formState: { isDirty, isSubmitting, errors, isValid },
    handleSubmit
  } = useForm<FormData>({ mode: "onChange" });

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: FormData) => postSignIn(email, password),
    onSuccess: () => {
      router.push("/feed");
    },
    onError: (e: APIError) => {
      toast({
        title:
          e.errorCode === "WRONG_EMAIL_OR_PASSWORD"
            ? "이메일 혹은 비밀번호가 올바르지 않아요"
            : "로그인에 실패했어요",
        status: "error",
        duration: 3000
      });
    }
  });

  const handleFormSubmit = handleSubmit(formData =>
    signInMutation.mutate(formData)
  );

  return (
    <>
      <Head>
        <title>ArtBubble | Sign In</title>
      </Head>
      <FormLayout>
        <Center color="black">
          <Logo type="full" height={50} />
        </Center>
        <KakaoLoginButton />
        <Divider />
        <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
          <AuthTextInput
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            placeholder="이메일"
            {...register("email", VALIDATION_RULE.email)}
          />
          <AuthTextInput
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            placeholder="비밀번호"
            type="password"
            {...register("password", VALIDATION_RULE.password)}
          />

          <FormButton
            isLoading={isSubmitting}
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
