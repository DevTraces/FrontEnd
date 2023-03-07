import DeleteConfirmDialog from "@/components/@common/FeedCard/components/DeleteConfirmDialog";
import FormButton from "@/components/@common/FormButton";
import FormInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import Logo from "@/components/@common/Logo";
import useAuth from "@/hooks/useAuth";
import getServerSideProps from "@/lib/getServerSideProps/redirection";
import currentUser from "@/utils/currentUser";
import { Box, Center, Text, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export default function Withdrawal() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const nickname = currentUser.getNickname();
  const confirmText = `${nickname}을 삭제하겠습니다.`;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, [isClient]);

  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();

  const { withdrawalMutation } = useAuth();
  const withdrawal = () => {
    withdrawalMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/");
      }
    });
  };
  if (!isClient) return null;

  return (
    <>
      <Head>
        <title>회원탈퇴</title>
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

        <Text textAlign="center">
          삭제를 원하시면 아래와 같이 입력 후 탈퇴를 진행해주세요.
        </Text>
        <Box bg="gray.100" w="full" textAlign="center" py="20px" rounded="12px">
          <Text>{confirmText}</Text>
        </Box>
        <form
          onSubmit={e => {
            e.preventDefault();
            onAlertOpen();
          }}
          style={{ width: "100%" }}
        >
          <FormInput
            placeholder={confirmText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setIsValid(confirmText === e.target.value);
            }}
          />

          <FormButton
            isDisabled={!isValid}
            isLoading={withdrawalMutation.isLoading}
            type="submit"
          >
            회원 탈퇴하기
          </FormButton>
        </form>
      </FormLayout>
    </>
  );
}

export { getServerSideProps };
