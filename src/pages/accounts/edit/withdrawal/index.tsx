import { postWithdrawUser } from "@/api/auth/withdrawal";
import DeleteConfirmDialog from "@/components/@common/FeedCard/components/DeleteConfirmDialog";
import FormButton from "@/components/@common/FormButton";
import FormInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import Logo from "@/components/@common/Logo";
import { APIError } from "@/types/error";
import { Center, useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormData = {
  password: string;
};

export default function Withdrawal() {
  const router = useRouter();
  const toast = useToast();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();

  const {
    register,
    getValues,
    formState: { errors, isSubmitting, isValid }
  } = useForm<FormData>({ mode: "onChange" });

  const withdrawalMutation = useMutation({
    mutationFn: ({ password }: { password: string }) =>
      postWithdrawUser({ password }),
    onSuccess: () => {
      router.back();
    },
    onError: (e: APIError) => {
      toast({
        title:
          e.errorCode === "WRONG_EMAIL_OR_PASSWORD_BAD_REQUEST"
            ? "비밀번호가 올바르지 않아요"
            : "회원 탈퇴에 실패했어요",
        status: "error",
        duration: 3000
      });
    }
  });

  return (
    <>
      <Head>
        <title>ArtBubble | Withdrawal</title>
      </Head>
      <DeleteConfirmDialog
        title="계정"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onDelete={() => {
          withdrawalMutation.mutate({ password: getValues("password") });
          onAlertClose();
        }}
      />
      <FormLayout>
        <Center color="black">
          <Logo type="full" height={50} />
        </Center>
        <form
          style={{ width: "100%" }}
          onSubmit={e => {
            e.preventDefault();
            onAlertOpen();
          }}
        >
          <FormInput
            type="password"
            labelText="비밀번호"
            isInvalid={!!errors.password}
            placeholder="비밀번호"
            errorMessage={errors.password?.message}
            {...register("password", {
              required: "비밀번호를 입력해주세요"
            })}
          />
          <FormButton isDisabled={!isValid} isLoading={isSubmitting}>
            회원 탈퇴하기
          </FormButton>
        </form>
      </FormLayout>
    </>
  );
}
