import { postSignIn } from "@/api/auth/sign-in";
import FormButton from "@/components/FormButton";
import FormLayout from "@/components/FormLayout";
import AuthTextInput from "@/components/FormInput";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import Logo from "@/components/Logo";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import { Center, Divider, HStack, Text, useToast } from "@chakra-ui/react";
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
    setError,
    formState: { isDirty, isSubmitting, errors, isValid },
    handleSubmit
  } = useForm<FormData>({ mode: "onChange" });

  const handleFormSubmit = handleSubmit(async formData => {
    try {
      await postSignIn(formData.email, formData.password);
      router.push("/feed");
    } catch (e) {
      let errorMsg = "Unknown error";
      if (e instanceof Error) errorMsg = e.message;
      setError("root", { message: errorMsg });
      toast({
        title: errorMsg,
        status: "error",
        duration: 1000
      });
    }
  });
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
