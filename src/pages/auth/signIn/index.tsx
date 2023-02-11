import { postSignIn } from "@/api/auth/sign-in";
import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextInput from "@/components/auth/AuthTextInput";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import Logo from "@/components/Logo";
import {
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Text,
  useToast
} from "@chakra-ui/react";
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
      <AuthLayout>
        <Center color="black">
          <Logo type="full" height={50} />
        </Center>
        <KakaoLoginButton />
        <Divider />
        <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
          <FormControl isInvalid={!!errors.email}>
            <AuthTextInput
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해야해요",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "이메일 형식을 지켜주세요"
                }
              })}
            />
            {!errors.email ? (
              <FormHelperText opacity={0}>
                로그인 할 이메일을 입력해주세요
              </FormHelperText>
            ) : (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <AuthTextInput
              placeholder="비밀번호"
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해야해요"

                // pattern: {
                //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                //   message: "이메일 형식을 지켜주세요"
                // }
              })}
            />
            {!errors.password ? (
              <FormHelperText opacity={0}>
                로그인 할 비밀번호를 입력해주세요
              </FormHelperText>
            ) : (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <AuthButton
            isLoading={isSubmitting}
            isDisabled={!isValid || !isDirty}
            type="submit"
          >
            로그인
          </AuthButton>
        </form>

        <Divider />
        <HStack>
          <Text>아직 계정이 없으신가요?</Text>
          <Text color="primary" fontWeight="bold">
            <Link href="/auth/signUp">계정 만들기</Link>
          </Text>
        </HStack>
      </AuthLayout>
    </>
  );
}
