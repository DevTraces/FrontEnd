import resetUserAtom from "@/atoms/resetUserAtom";
import FormButton from "@/components/@common/FormButton";
import FormInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import Logo from "@/components/@common/Logo";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useAuth from "@/hooks/useAuth";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

type FormData = {
  newPassword: string;
  newPasswordConfirm: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const resetUser = useRecoilValue(resetUserAtom);

  const {
    register,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({ mode: "onChange" });
  const { resetPasswordMutation } = useAuth();

  const resetPassword = (newPassword: string) => {
    resetPasswordMutation.mutate(
      {
        authKey: resetUser.authKey,
        afterPassword: newPassword
      },
      {
        onSuccess: () => {
          router.push("/auth/signIn");
        }
      }
    );
  };

  const handleFormSubmit = handleSubmit(({ newPassword }) => {
    resetPassword(newPassword);
  });

  return (
    <>
      <Head>
        <title>ArtBubble | 비밀번호 재설정</title>
      </Head>
      <FormLayout>
        <Center color="black">
          <Logo type="full" height={50} />
        </Center>
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <FormInput
            type="password"
            labelText="새로운 비밀번호"
            isInvalid={!!errors.newPassword}
            placeholder="새로운 비밀번호"
            errorMessage={errors.newPassword?.message}
            {...register("newPassword", {
              ...VALIDATION_RULE.password,
              onChange: e => {
                if (e.target.value === getValues("newPasswordConfirm"))
                  clearErrors("newPasswordConfirm");
              }
            })}
          />
          <FormInput
            type="password"
            labelText="새로운 비밀번호 확인"
            isInvalid={!!errors.newPasswordConfirm}
            placeholder="새로운 비밀번호 확인"
            errorMessage={errors.newPasswordConfirm?.message}
            {...register("newPasswordConfirm", {
              required: "새로운 비밀번호 확인이 필요해요",
              validate: newPasswordConfirm =>
                newPasswordConfirm === getValues("newPassword") ||
                "비밀번호가 일치하지 않아요"
            })}
          />
          <FormButton
            isDisabled={!isDirty || !isValid}
            isLoading={isSubmitting}
          >
            비밀번호 재설정
          </FormButton>
        </form>
      </FormLayout>
    </>
  );
}
