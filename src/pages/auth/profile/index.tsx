import { SignUpUser, signUpUserAtom } from "@/atoms/auth/signUpUser";
import AuthButton from "@/components/auth/AuthButton";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTextInput from "@/components/auth/AuthTextInput";
import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack
} from "@chakra-ui/react";
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

  const {
    handleSubmit,
    register,
    setError,
    watch,
    formState: { errors, isSubmitting }
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
    mutationFn: ({ nickname }: Pick<FormData, "nickname">) => {
      return fetch(`/api/users/nickname/check?nickname=${nickname}`);
    },
    onSuccess: async res => {
      if (res.status !== 200 && !errors?.nickname)
        setError("nickname", { message: (await res.json()).errorMessage });
    }
  });

  const signUpMutation = useMutation({
    mutationFn: (formData: FormData) => {
      const { email } = signUpUser;
      const { password, username, nickname } = formData;

      const reqBody: SignUpUser = {
        email,
        password,
        username,
        nickname,
        profileImage: profileImages[0]
      };

      return fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify(reqBody)
      });
    },
    onSuccess: res => {
      if (res.status === 201) {
        router.push("/feed");
      }
    }
  });

  const { ref: profileImagesRef, ...profileImagesRegisterRest } =
    register("profileImages");

  return (
    <>
      <Head>
        <title>ArtBubble | Profile</title>
      </Head>

      <AuthLayout>
        <form
          onSubmit={handleSubmit(values => {
            signUpMutation.mutate(values);
          })}
          style={{ width: "100%" }}
        >
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
          <FormControl isInvalid={!!errors.nickname}>
            <InputGroup size="lg">
              <InputLeftAddon color="gray">@</InputLeftAddon>
              <AuthTextInput
                type="text"
                roundedLeft="none"
                placeholder="닉네임"
                {...register("nickname", {
                  required: "닉네임이 필요해요",

                  validate: nickname => {
                    if (!nickname) return true;
                    if (!/^[a-zA-Z0-9]*$/.test(nickname))
                      return "영어와 숫자만 사용할 수 있어요";
                    nicknameMutation.mutate({ nickname });
                    return true;
                  }
                })}
              />
            </InputGroup>

            {!errors.nickname ? (
              <FormHelperText w="full" h="30px" opacity="0">
                닉네임을 입력해야해요
              </FormHelperText>
            ) : (
              <FormErrorMessage w="full" h="30px">
                {errors.nickname.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.username}>
            <AuthTextInput
              type="text"
              placeholder="이름"
              {...register("username", {
                required: "이름이 필요해요"
              })}
            />

            {!errors.username ? (
              <FormHelperText w="full" h="30px" opacity="0">
                이름을 입력해야해요
              </FormHelperText>
            ) : (
              <FormErrorMessage w="full" h="30px">
                {errors.username.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <AuthTextInput
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호가 필요해요"
              })}
            />

            {!errors.password ? (
              <FormHelperText w="full" h="30px" opacity="0">
                비밀번호를 입력해야해요
              </FormHelperText>
            ) : (
              <FormErrorMessage w="full" h="30px">
                {errors.password.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <AuthButton type="submit" isLoading={isSubmitting}>
            가입 완료
          </AuthButton>
        </form>
      </AuthLayout>
    </>
  );
}
