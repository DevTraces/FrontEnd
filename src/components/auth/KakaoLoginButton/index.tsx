import Image from "next/image";
import { ComponentProps } from "react";
import KakaoImg from "$/kakao.png";
import AuthButton from "../AuthButton";

export default function KakaoLoginButton({
  ...props
}: ComponentProps<typeof AuthButton>) {
  return (
    <AuthButton
      bg="#FEE500"
      onClick={() => {}}
      color="#181600"
      leftIcon={
        <Image src={KakaoImg} alt="카카오 로고" width={20} height={20} />
      }
    >
      {props.children ?? "카카오 로그인"}
    </AuthButton>
  );
}
