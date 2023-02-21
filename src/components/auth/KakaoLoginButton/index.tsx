import Image from "next/image";
import KakaoImg from "public/kakao.png";
import { ComponentProps } from "react";
import FormButton from "../../@common/FormButton";

type KakaoLoginButtonProps = { type: "signIn" | "signUp" } & Omit<
  ComponentProps<typeof FormButton>,
  "isLoading" | "isDisabled"
>;
export default function KakaoLoginButton({
  type,
  ...props
}: KakaoLoginButtonProps) {
  const kakaoAuthorize = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
    });
  };

  return (
    <FormButton
      isLoading={false}
      isDisabled={false}
      bg="#FEE500"
      type="button"
      onClick={kakaoAuthorize}
      color="#181600"
      leftIcon={
        <Image src={KakaoImg} alt="카카오 로고" width={20} height={20} />
      }
      {...props}
    >
      카카오로 {type === "signIn" ? "로그인" : "회원가입"}
    </FormButton>
  );
}
