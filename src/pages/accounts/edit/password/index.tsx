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
import getServerSideProps from "@/lib/getServerSideProps/redirection";

type FormData = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export default function EditPassword() {
  const router = useRouter();

  const {
    register,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({ mode: "onChange" });

  const { changePasswordMutation } = useAuth();

  const changePassword = (currentPassword: string, newPassword: string) => {
    changePasswordMutation.mutate(
      {
        beforePassword: currentPassword,
        afterPassword: newPassword
      },
      {
        onSuccess: () => {
          router.back();
        }
      }
    );
  };

  const handleFormSubmit = handleSubmit(({ currentPassword, newPassword }) => {
    changePassword(currentPassword, newPassword);
  });

  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <FormLayout>
        <Center color="black">
          <Logo type="full" height={50} />
        </Center>
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <FormInput
            type="password"
            labelText="이전 비밀번호"
            isInvalid={!!errors.currentPassword}
            placeholder="이전 비밀번호"
            errorMessage={errors.currentPassword?.message}
            {...register("currentPassword", VALIDATION_RULE.password)}
          />
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
            비밀번호 변경
          </FormButton>
        </form>
      </FormLayout>
    </>
  );
}

export { getServerSideProps };
