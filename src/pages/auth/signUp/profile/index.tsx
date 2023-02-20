import { postSignUp } from "@/api/auth/sign-up";
import { getNicknameDuplicateCheck } from "@/api/users/nickname/check";
import { SignUpUser, signUpUserAtom } from "@/atoms/auth/signUpUser";
import FormButton from "@/components/@common/FormButton";
import FormLayout from "@/components/@common/FormLayout";
import AuthTextInput from "@/components/@common/FormInput";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import { Avatar, Button, Input, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

type FormData = Pick<SignUpUser, "nickname" | "username" | "password"> & {
  profileImages: FileList;
};

export default function Profile() {
  const router = useRouter();
  const signUpUser = useRecoilValue(signUpUserAtom);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [previewImg, setPreviewImg] = useState("");
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<FormData>({
    mode: "onChange"
  });

  const profileImages = watch("profileImages");

  useEffect(() => {
    if (profileImages && profileImages.length > 0) {
      setPreviewImg(URL.createObjectURL(profileImages[0]));
    }
  }, [profileImages]);

  const nicknameMutation = useMutation({
    mutationFn: ({ nickname }: Pick<FormData, "nickname">) =>
      getNicknameDuplicateCheck(nickname as string),
    onSuccess: ({ duplicatedNickname }) => {
      if (duplicatedNickname)
        setError("nickname", { message: "이미 가입된 닉네임이에요" });
    }
  });

  const signupMutation = useMutation({
    mutationFn: (user: SignUpUser) => postSignUp(user),
    onSuccess: () => {
      router.push("/auth/signIn");
      toast({
        title: "성공적으로 가입되었습니다.",
        status: "success",
        duration: 3000
      });
    },
    onError: () => {
      toast({
        title: "회원가입에 실패하였습니다",
        status: "error",
        duration: 3000
      });
    }
  });

  const { ref: profileImagesRef, ...profileImagesRegisterRest } =
    register("profileImages");

  const handleFormSubmit = handleSubmit(
    ({ profileImages: pImgs, ...formData }) => {
      signupMutation.mutate({
        ...signUpUser,
        ...formData,
        profileImage: pImgs[0]
      });
    }
  );

  return (
    <>
      <Head>
        <title>ArtBubble | Profile</title>
      </Head>

      <FormLayout>
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <VStack mb="12px">
            {previewImg !== "" ? (
              <Avatar size="2xl" src={previewImg} />
            ) : (
              <Avatar size="2xl" />
            )}
            <Button
              variant="ghost"
              colorScheme="none"
              color="primary"
              type="button"
              onClick={async () => {
                imgRef.current?.click();
              }}
            >
              사진 업로드
            </Button>
            <Input
              type="file"
              display="none"
              accept="image/*"
              {...profileImagesRegisterRest}
              ref={e => {
                profileImagesRef(e);
                imgRef.current = e;
              }}
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
                if (!errors.nickname)
                  nicknameMutation.mutate({ nickname: e.target.value });
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
              nicknameMutation.isLoading ||
              signupMutation.isLoading
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