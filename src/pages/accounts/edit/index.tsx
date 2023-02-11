import { getUserProfile } from "@/api/users/profile/[nickname]";
import LabeledInput from "@/components/accounts/edit/LabeledInput";
import NavLayout from "@/components/NavLayout";
import { ProfileData } from "@/components/[nickname]/Profile/ProfileInfo";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormData = Pick<ProfileData, "username" | "nickname" | "description">;

export default function Setting() {
  const router = useRouter();
  const { nickname } = router.query;

  const {
    register,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({ mode: "onChange" });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", nickname],
    queryFn: ({ queryKey }) => {
      return getUserProfile(queryKey[1] as string);
    }
  });

  if (isLoading) return <>Setting 로딩 중...</>;
  if (isError) return <>Setting 에러발생</>;

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
            <LabeledInput
              isError={!!errors.username}
              labelText="이름"
              helperText="사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요."
              ErrorText={errors.username?.message ?? ""}
              defaultValue={data.username}
              {...register("username", {
                required: "이름이 필요해요"
              })}
            />
            <LabeledInput
              isError={!!errors.nickname}
              labelText="사용자 이름"
              helperText="고유하게 사용할 이름이에요."
              ErrorText={errors.nickname?.message ?? ""}
              defaultValue={data.nickname}
              {...register("nickname", {
                required: "사용자 이름이 필요해요",
                pattern: {
                  value: /^[a-zA-Z0-9]*$/,
                  message: "영어와 숫자만 사용할 수 있어요"
                }
              })}
            />

            <FormControl isInvalid={!!errors.description}>
              <FormLabel lineHeight={10}>
                <Text fontSize="16px">자기소개</Text>
                <Textarea
                  bg="white"
                  rounded="12px"
                  p="12px"
                  defaultValue={data.description}
                  {...register("description", {
                    maxLength: {
                      value: 150,
                      message: "150자 이하로만 가능해요"
                    }
                  })}
                />

                {!errors.description ? (
                  <FormHelperText color="gray.500" w="full" h="40px">
                    당신을 사람들에게 소개해주세요
                  </FormHelperText>
                ) : (
                  <FormErrorMessage w="full" h="40px">
                    {errors.description?.message}
                  </FormErrorMessage>
                )}
              </FormLabel>
            </FormControl>
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
