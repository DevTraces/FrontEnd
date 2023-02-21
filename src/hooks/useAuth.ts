import { postSignIn } from "@/api/auth/sign-in";
import { postSignOut } from "@/api/auth/sign-out";
import { postOAuth } from "@/api/oauth/kakao/callback";
import { postOAuthToken } from "@/api/oauth/token";
import userAtom from "@/atoms/userAtom";
import { APIError } from "@/types/error";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";

type SignInData = {
  email: string;
  password: string;
};

type UseAuthParams = {
  onSignIn?: () => void;
  onSignOut?: () => void;
  onOAuthKakao?: () => void;
};

export default function useAuth({
  onSignIn = () => {},
  onSignOut = () => {},
  onOAuthKakao = () => {}
}: UseAuthParams = {}) {
  const toast = useToast();

  const setUser = useSetRecoilState(userAtom);
  const resetUser = useResetRecoilState(userAtom);

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: SignInData) =>
      postSignIn(email, password),
    onSuccess: ({ accessToken, nickname }) => {
      sessionStorage.setItem("accessToken", accessToken);
      setUser({ nickname });
      onSignIn();
    },
    onError: (e: APIError) => {
      toast({
        title:
          e.errorCode === "WRONG_EMAIL_OR_PASSWORD"
            ? "이메일 혹은 비밀번호가 올바르지 않아요"
            : "로그인에 실패했어요",
        status: "error",
        duration: 3000
      });
    }
  });

  const signOutMutation = useMutation({
    mutationFn: () => postSignOut(),
    onSuccess: () => {
      sessionStorage.removeItem("accessToken");
      resetUser();
      onSignOut();
    },
    onError: () => {
      toast({
        title: "로그아웃에 실패했어요",
        status: "error",
        duration: 3000
      });
    }
  });

  const oAuthSignInMutation = useMutation({
    mutationFn: (oAuthToken: string) => postOAuth(oAuthToken),
    onSuccess: ({ accessToken, nickname }) => {
      sessionStorage.setItem("accessToken", accessToken);
      setUser({ nickname });
      onOAuthKakao();
    },
    onError: () => {
      toast({
        title: "로그인에 실패했어요",
        status: "error",
        duration: 3000
      });
    }
  });

  const { mutate: oAuthKakaoSignInMutate } = useMutation({
    mutationFn: (code: string) => postOAuthToken(code),
    onSuccess: res => {
      const { access_token: oAuthToken } = res.data;
      oAuthSignInMutation.mutate(oAuthToken);
    }
  });

  return {
    signIn: (data: SignInData) => signInMutation.mutate(data),
    signOut: () => signOutMutation.mutate(),
    oAuthKakao: useCallback(
      (code: string) => oAuthKakaoSignInMutate(code),
      [oAuthKakaoSignInMutate]
    )
  };
}
