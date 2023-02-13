import { getUserProfile } from "@/api/users/profile/[nickname]";
import FormTextarea from "@/components/@common/FormTextarea";
import FormTextInput from "@/components/@common/FormInput";
import { ProfileData } from "@/types/data/user";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Text,
  VStack
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import NavLayout from "@/components/@common/NavLayout";

type FormData = Pick<ProfileData, "username" | "nickname" | "description">;

export default function Setting() {
  const router = useRouter();
  const { nickname } = router.query as { nickname: string };

  const {
    register,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({ mode: "onChange" });

  const profileQuery = useQuery({
    queryKey: ["profile", nickname],
    queryFn: ({ queryKey }) => {
      return getUserProfile(queryKey[1]);
    }
  });

  if (profileQuery.isLoading) return <>Setting 로딩 중...</>;
  if (profileQuery.isError) return <>Setting 에러발생</>;

  return (
    <NavLayout>
      <Head>
        <title>ArtBubble | Setting</title>
      </Head>
      <Container pt={{ sm: "40px", md: "none" }}>
        <VStack padding={10} w="full">
          <form>
            <Flex justifyContent="end" w="full">
              <Button
                bg="primary"
                color="white"
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!isDirty || !isValid}
              >
                저장하기
              </Button>
            </Flex>
            <VStack gap="8px">
              <Avatar size="2xl" />
              <Button bg="white">프로필 사진 변경</Button>
            </VStack>
            <FormTextInput
              isInvalid={!!errors.username}
              labelText="이름"
              helperText="사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요."
              errorMessage={errors.username?.message}
              defaultValue={profileQuery.data.username}
              {...register("username", VALIDATION_RULE.username)}
            />
            <FormTextInput
              isInvalid={!!errors.nickname}
              labelText="사용자 이름"
              helperText="고유하게 사용할 이름이에요."
              errorMessage={errors.nickname?.message}
              defaultValue={profileQuery.data.nickname}
              {...register("username", VALIDATION_RULE.nickname)}
            />
            <FormTextarea
              isInvalid={!!errors.description}
              labelText="자기소개"
              helperText="고유하게 사용할 이름이에요."
              errorMessage={errors.description?.message}
              defaultValue={profileQuery.data.description}
              {...register("description", VALIDATION_RULE.description)}
            />
            <Box>
              <Text fontSize="16px" lineHeight="40px" color="black">
                비밀번호
              </Text>
              <Button
                borderColor="transparent"
                bg="white"
                onClick={() => {
                  router.push("/accounts/edit/password");
                }}
              >
                비밀번호 변경
              </Button>
            </Box>
          </form>
        </VStack>
      </Container>
    </NavLayout>
  );
}
