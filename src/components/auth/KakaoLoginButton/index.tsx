import Image from "next/image";
import KakaoImg from "public/kakao.png";
import { ComponentProps } from "react";
import FormButton from "../../@common/FormButton";

type KakaoLoginButtonProps = Omit<
  ComponentProps<typeof FormButton>,
  "isLoading" | "isDisabled"
>;
export default function KakaoLoginButton(props: KakaoLoginButtonProps) {
  return (
    <FormButton
      isLoading={false}
      isDisabled={false}
      bg="#FEE500"
      type="button"
      onClick={() => {}}
      color="#181600"
      leftIcon={
        <Image src={KakaoImg} alt="카카오 로고" width={20} height={20} />
      }
      {...props}
    >
      카카오 로그인
    </FormButton>
  );
}
