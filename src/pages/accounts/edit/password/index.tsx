import { patchPassword } from "@/api/users/password";
import FormButton from "@/components/@common/FormButton";
import FormLayout from "@/components/@common/FormLayout";
import FormInput from "@/components/@common/FormInput";
import Logo from "@/components/@common/Logo";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import { Center, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormData = {
  prevPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export default function EditPassword() {
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({ mode: "onChange" });

  const passwordMutation = useMutation({
    mutationFn: ({
      prevPassword,
      newPassword
    }: {
      prevPassword: string;
      newPassword: string;
    }) => patchPassword(prevPassword, newPassword),
    onSuccess: () => {
      router.back();
    },
    onError: () => {
      toast({
        title: "비밀번호 변경에 실패했습니다.",
        status: "error",
        duration: 3000
      });
    }
  });

  const handleFormSubmit = handleSubmit(({ prevPassword, newPassword }) => {
    passwordMutation.mutate({ prevPassword, newPassword });
  });
  return (
    <>
      <Head>
        <title>ArtBubble | Sign Up</title>
      </Head>
      <FormLayout>
        <Center color="black">
          <Logo type="full" height={50} />
        </Center>
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <FormInput
            type="password"
            labelText="이전 비밀번호"
            isInvalid={!!errors.prevPassword}
            placeholder="이전 비밀번호"
            errorMessage={errors.prevPassword?.message}
            {...register("prevPassword", VALIDATION_RULE.password)}
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
