import DeleteConfirmDialog from "@/components/@common/FeedCard/components/DeleteConfirmDialog";
import FormButton from "@/components/@common/FormButton";
import FormInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import Logo from "@/components/@common/Logo";
import useAuth from "@/hooks/useAuth";
import { Center, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import getServerSideProps from "@/lib/getServerSideProps/redirection";

type FormData = {
  password: string;
};

export default function Withdrawal() {
  const router = useRouter();

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();

  const {
    register,
    formState: { errors, isSubmitting, isValid }
  } = useForm<FormData>({ mode: "onChange" });

  const { withdrawalMutation } = useAuth();
  const withdrawal = () => {
    withdrawalMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/");
      }
    });
  };

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
          withdrawal();
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

export { getServerSideProps };
