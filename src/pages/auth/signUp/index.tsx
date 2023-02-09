import { SignUpUser, signUpUserAtom } from "@/atoms/auth/signUpUser";
import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextInput from "@/components/auth/AuthTextInput";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import Logo from "@/components/Logo";
import {
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Text
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

type FormData = Pick<SignUpUser, "email">;

const sendAuthKey = async (email: SignUpUser["email"]) => {
  const res = await fetch("/api/auth/email/auth-key", {
    method: "POST",
    body: JSON.stringify({
      email
    })
  });

  if (!res.ok) throw Error((await res.json()).errorMessage);

  return res.json() as Promise<{ data: null }>;
};

const checkDuplicate = async (email: SignUpUser["email"]) => {
  const res = await fetch(`/api/users/email/check?email=${email}`);

  if (!res.ok) throw Error((await res.json()).errorMessage);

  return res.json() as Promise<{ isDuplicated: boolean }>;
};

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
        const res = await checkDuplicate(email);
        if (res.isDuplicated) {
          setError("email", { message: "이미 가입된 이메일입니다" });
        } else {
          await sendAuthKey(email);
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
      <AuthLayout>
        <Center>
          <Logo type="full" height={50} />
        </Center>
        <Text fontSize="2xl" textAlign="center" wordBreak="keep-all">
          그림을 좋아하는 사람들과 소통하려면 가입하세요.
        </Text>
        <KakaoLoginButton>카카오로 시작하기</KakaoLoginButton>
        <Divider />
        <form style={{ width: "100%" }} onSubmit={handleFormSubmit}>
          <FormControl
            as={Flex}
            direction="column"
            isInvalid={!!errors.email}
            gap="5px"
          >
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
                가입 할 이메일을 입력해주세요
              </FormHelperText>
            ) : (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
            <AuthButton
              isLoading={isSubmitting}
              isDisabled={!isValid || !isDirty}
              type="submit"
            >
              가입하기
            </AuthButton>
          </FormControl>
        </form>
      </AuthLayout>
    </>
  );
}
