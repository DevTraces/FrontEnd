import { getUserProfile } from "@/api/users/profile/[nickname]";
import userAtom from "@/atoms/userAtom";
import FormTextInput from "@/components/@common/FormInput";
import FormTextarea from "@/components/@common/FormTextarea";
import ProfileAvatarEdit from "@/components/@common/ProfileAvatarEdit";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useImagePreviews from "@/hooks/useImagePreviews";
import useProfile from "@/hooks/useProfile";
import usersKeys from "@/queryKeys/usersKeys";
import { FileImage } from "@/types/data/feed";
import { ProfileData, ProfilePatchData } from "@/types/data/user";
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
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

type FormData = Pick<ProfileData, "username" | "nickname" | "description">;

const NavLayout = dynamic(() => import("@/components/@common/NavLayout"), {
  ssr: false
});

export default function Setting() {
  const { nickname } = useRecoilValue(userAtom);
  const router = useRouter();
  const toast = useToast();
  const [isDeleted, setIsDeleted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>();

  const profileQuery = useQuery({
    queryKey: usersKeys.userProfile(nickname),
    queryFn: () => getUserProfile(nickname)
  });

  const { images, clearAllImages, imagePreviews, addImage } =
    useImagePreviews();

  const {
    updateProfileMutation,
    updateProfileImageMutation,
    deleteProfileImageMutation
  } = useProfile();

  const updateProfile = (data: Partial<ProfilePatchData>) => {
    updateProfileMutation.mutate(
      { nickname, data },
      {
        onSuccess: () => {
          toast({
            title: "프로필 정보가 수정되었어요",
            status: "success",
            duration: 3000
          });
          reset();
        }
      }
    );
  };

  const updateProfileImage = (profileImage: File) => {
    updateProfileImageMutation.mutate({ nickname, profileImage });
  };

  const deleteProfileImage = () => {
    deleteProfileImageMutation.mutate({ nickname });
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
    if (imagePreviews.length > 0) {
      updateProfileImage((images[0] as FileImage).src);
    } else if (isDeleted) {
      deleteProfileImage();
    }
  });

  return (
    <>
      <Head>
        <title>ArtBubble | Setting</title>
      </Head>
      <NavLayout>
        <Container pt={{ sm: "40px", md: "none" }}>
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
            <form onSubmit={handleFormSubmit}>
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
                  />
                  <FormTextarea
                    isInvalid={!!errors.description}
                    labelText="자기소개"
                    helperText="고유하게 사용할 이름이에요."
                    errorMessage={errors.description?.message}
                    defaultValue={profileQuery.data.description}
                    {...register("description", VALIDATION_RULE.description)}
                  />
                </VStack>
              )}
            </form>
            <Box w="full">
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
          </VStack>
        </Container>
      </NavLayout>
    </>
  );
}
