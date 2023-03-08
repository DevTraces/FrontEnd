import { signUpUserAtom } from "@/atoms/auth/signUpUser";
import FormButton from "@/components/@common/FormButton";
import AuthTextInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import ProfileAvatarEdit from "@/components/@common/ProfileAvatarEdit";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useAuth from "@/hooks/useAuth";
import useCheck from "@/hooks/useCheck";
import useImagePreviews from "@/hooks/useImagePreviews";
import { FileImage } from "@/types/data/feed";
import { Button, Center, Icon, Text, useToast, VStack } from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

type FormData = { username: string; nickname: string; password: string };

export default function Profile() {
  const router = useRouter();
  const signUpUser = useRecoilValue(signUpUserAtom);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({
    mode: "onChange"
  });

  const { images, imagePreviews, addImage, clearAllImages } =
    useImagePreviews();

  const { signUpMutation } = useAuth();

  const { nicknameDuplicateMutation } = useCheck();

  const signUp = (data: {
    email: string;
    username: string;
    nickname: string;
    password: string;
    profileImage?: File;
    signUpKey: string;
  }) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        router.push("/auth/signIn");
        toast({
          title: "성공적으로 가입되었습니다.",
          status: "success",
          duration: 3000
        });
      }
    });
  };

  const nicknameDuplicateCheck = (nickname: string) => {
    nicknameDuplicateMutation.mutate(
      { nickname },
      {
        onSuccess: ({ duplicatedNickname }) => {
          if (duplicatedNickname)
            setError("nickname", {
              message: "이미 가입된 닉네임이에요"
            });
        }
      }
    );
  };

  const handleFormSubmit = handleSubmit(formData => {
    if (images.length > 0) {
      signUp({
        ...formData,
        email: signUpUser.email as string,
        profileImage: (images[0] as FileImage).src,
        signUpKey: signUpUser.signUpKey as string
      });
    } else {
      signUp({
        ...formData,
        email: signUpUser.email as string,
        signUpKey: signUpUser.signUpKey as string
      });
    }
  });

  return (
    <>
      <Head>
        <title>프로필 작성</title>
      </Head>

      <FormLayout>
        {!signUpUser.email || !signUpUser.signUpKey ? (
          <>
            <Center>
              <Icon
                as={FontAwesomeIcon}
                icon={faPaperPlane}
                color="primary"
                boxSize="60px"
              />
            </Center>
            <Text display="inline">이메일 인증을 다시 진행해주세요</Text>
            <Button
              onClick={() => {
                router.push("/auth/signUp");
              }}
            >
              이메일 인증 하기
            </Button>
          </>
        ) : (
          <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
            <VStack mb="12px">
              <ProfileAvatarEdit
                onImageInput={file => {
                  clearAllImages();
                  addImage(file);
                }}
                onImageDelete={() => {
                  clearAllImages();
                }}
                previewImg={imagePreviews[0]?.url}
              />
              <AuthTextInput
                isInvalid={!!errors.nickname}
                type="text"
                placeholder="닉네임"
                errorMessage={errors.nickname?.message}
                leftAddon="@"
                {...register("nickname", {
                  ...VALIDATION_RULE.nickname,
                  onBlur: e => {
                    if (!errors.nickname)
                      nicknameDuplicateCheck(e.target.value);
                  }
                })}
              />
              <AuthTextInput
                isInvalid={!!errors.username}
                type="text"
                placeholder="이름"
                errorMessage={errors.username?.message}
                {...register("username", VALIDATION_RULE.username)}
              />

              <AuthTextInput
                isInvalid={!!errors.password}
                type="password"
                placeholder="비밀번호"
                errorMessage={errors.password?.message}
                {...register("password", VALIDATION_RULE.password)}
              />
              <FormButton
                isLoading={
                  isSubmitting ||
                  nicknameDuplicateMutation.isLoading ||
                  signUpMutation.isLoading
                }
                isDisabled={!isValid || !isDirty}
              >
                가입 완료
              </FormButton>
            </VStack>
          </form>
        )}
      </FormLayout>
    </>
  );
}
