import { SignUpUser, signUpUserAtom } from "@/atoms/auth/signUpUser";
import FormButton from "@/components/@common/FormButton";
import AuthTextInput from "@/components/@common/FormInput";
import FormLayout from "@/components/@common/FormLayout";
import ImageAddAvatar from "@/components/auth/ImageAddAvatar";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useAuth from "@/hooks/useAuth";
import useCheck from "@/hooks/useCheck";
import useImagePreviews from "@/hooks/useImagePreviews";
import { FileImage } from "@/types/data/feed";
import { useToast, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

type FormData = Pick<SignUpUser, "nickname" | "username" | "password">;

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

  const signUp = (user: SignUpUser) =>
    signUpMutation.mutate(user, {
      onSuccess: () => {
        router.push("/auth/signIn");
        toast({
          title: "성공적으로 가입되었습니다.",
          status: "success",
          duration: 3000
        });
      }
    });

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
    signUp({
      ...signUpUser,
      ...formData,
      profileImage: (images[0] as FileImage).src
    });
  });

  return (
    <>
      <Head>
        <title>ArtBubble | Profile</title>
      </Head>

      <FormLayout>
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <VStack mb="12px">
            <ImageAddAvatar
              onImageInput={file => {
                clearAllImages();
                addImage(file);
              }}
              previewImg={imagePreviews[0]?.url}
            />
          </VStack>
          <AuthTextInput
            isInvalid={!!errors.nickname}
            type="text"
            placeholder="닉네임"
            errorMessage={errors.nickname?.message}
            leftAddon="@"
            {...register("nickname", {
              ...VALIDATION_RULE.nickname,
              onBlur: e => {
                if (!errors.nickname) nicknameDuplicateCheck(e.target.value);
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
        </form>
      </FormLayout>
    </>
  );
}
