import { getUserProfile } from "@/api/users/profile/[nickname]";
import FormTextInput from "@/components/@common/FormInput";
import FormTextarea from "@/components/@common/FormTextarea";
import NavLayout from "@/components/@common/NavLayout";
import ProfileAvatarEdit from "@/components/@common/ProfileAvatarEdit";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useAuth from "@/hooks/useAuth";
import useCheck from "@/hooks/useCheck";
import useImagePreviews from "@/hooks/useImagePreviews";
import useProfile from "@/hooks/useProfile";
import getServerSideProps from "@/lib/getServerSideProps/redirection";
import usersKeys from "@/queryKeys/usersKeys";
import { FileImage } from "@/types/data/feed";
import { ProfileData, ProfilePatchData } from "@/types/data/user";
import currentUser from "@/utils/currentUser";
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = Pick<ProfileData, "username" | "nickname" | "description">;

export default function Setting() {
  const router = useRouter();
  const nickname = currentUser.getNickname();
  const toast = useToast();
  const [isDeleted, setIsDeleted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({ mode: "onChange" });

  const profileQuery = useQuery({
    queryKey: usersKeys.userProfile(nickname),
    queryFn: () => getUserProfile(nickname)
  });

  const { images, clearAllImages, imagePreviews, addImage } =
    useImagePreviews();
  const { nicknameDuplicateMutation } = useCheck();
  const { signOutMutation } = useAuth();

  const {
    updateProfileMutation,
    updateProfileImageMutation,
    deleteProfileImageMutation
  } = useProfile();

  const updateProfileImage = (profileImage: File, newNickname: string) => {
    updateProfileImageMutation.mutate(
      { nickname: newNickname, profileImage },
      {
        onSuccess: () => {
          router.push(`/user/${newNickname}/posts`);
        }
      }
    );
  };

  const deleteProfileImage = (newNickname: string) => {
    deleteProfileImageMutation.mutate(
      { nickname: newNickname },
      {
        onSuccess: () => {
          router.push(`/user/${newNickname}/posts`);
        }
      }
    );
  };

  const updateProfile = (data: Partial<ProfilePatchData>) => {
    updateProfileMutation.mutate(
      { nickname, data },
      {
        onSuccess: ({ nickname: newNickname }) => {
          toast({
            title: "프로필 정보가 수정되었어요",
            status: "success",
            duration: 3000
          });
          if (imagePreviews.length > 0) {
            updateProfileImage((images[0] as FileImage).src, newNickname);
          } else if (isDeleted) {
            deleteProfileImage(newNickname);
          } else {
            router.push(`/user/${newNickname}/posts`);
          }
        }
      }
    );
  };

  const checkNicknameDuplicated = (newNickname: string) => {
    nicknameDuplicateMutation.mutate(
      { nickname: newNickname },
      {
        onSuccess: ({ duplicatedNickname }) => {
          if (duplicatedNickname) {
            setError("nickname", { message: "이미 사용중인 닉네임이에요" });
          }
        }
      }
    );
  };

  const handleFormSubmit = handleSubmit(formData => {
    const data = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) =>
          profileQuery.data &&
          value !==
            profileQuery.data[key as "nickname" | "username" | "description"]
      )
    );

    updateProfile(data);
  });

  const signOut = () =>
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/");
      }
    });

  return (
    <>
      <Head>
        <title>ArtBubble | Setting</title>
      </Head>
      <NavLayout>
        <Container pt={{ base: "40px", md: "none" }}>
          <VStack padding={10} w="full">
            <Flex justifyContent="end" w="full">
              <Button
                bg="primary"
                color="white"
                isLoading={isSubmitting}
                isDisabled={
                  (!isDirty || !isValid) && images.length === 0 && !isDeleted
                }
                onClick={handleFormSubmit}
              >
                저장하기
              </Button>
            </Flex>
            <VStack gap="8px">
              <ProfileAvatarEdit
                isLoading={
                  updateProfileImageMutation.isLoading ||
                  deleteProfileImageMutation.isLoading
                }
                onImageInput={file => {
                  clearAllImages();
                  addImage(file);
                  setIsDeleted(false);
                }}
                onImageDelete={() => {
                  clearAllImages();
                  setIsDeleted(true);
                }}
                previewImg={
                  isDeleted
                    ? ""
                    : imagePreviews[0]?.url ??
                      profileQuery.data?.profileImageUrl
                }
              />
            </VStack>
            <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
              {profileQuery.data && (
                <VStack spacing="40px">
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
                    {...register("nickname", VALIDATION_RULE.nickname)}
                    onBlur={() => {
                      const newNickname = getValues("nickname");
                      if (newNickname !== nickname)
                        checkNicknameDuplicated(newNickname);
                    }}
                  />
                  <FormTextarea
                    isInvalid={!!errors.description}
                    labelText="자기소개"
                    helperText="나를 소개해주세요."
                    errorMessage={errors.description?.message}
                    defaultValue={profileQuery.data.description}
                    resize="none"
                    height="200px"
                    {...register("description", VALIDATION_RULE.description)}
                  />
                </VStack>
              )}
            </form>
            <Text w="full" fontSize="16px" lineHeight="40px" color="black">
              계정 관리
            </Text>
            <Box w="full">
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
            <Box w="full">
              <Button
                borderColor="transparent"
                bg="white"
                color="red.500"
                onClick={signOut}
              >
                로그아웃
              </Button>
            </Box>
            <Box w="full">
              <Button
                borderColor="transparent"
                bg="white"
                color="red.500"
                onClick={() => {
                  router.push("/accounts/edit/withdrawal");
                }}
              >
                회원 탈퇴하기
              </Button>
            </Box>
          </VStack>
        </Container>
      </NavLayout>
    </>
  );
}

export { getServerSideProps };
