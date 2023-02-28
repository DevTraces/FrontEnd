import { postEmailAuthKey } from "@/api/auth/email/auth-key";
import { postSignIn } from "@/api/auth/sign-in";
import { postSignOut } from "@/api/auth/sign-out";
import { postSignUp } from "@/api/auth/sign-up";
import { postOAuth } from "@/api/oauth/kakao/callback";
import { postOAuthToken } from "@/api/oauth/token";
import { SignUpUser, signUpUserAtom } from "@/atoms/auth/signUpUser";
import { APIError } from "@/types/error";
import currentUser from "@/utils/currentUser";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

export default function useAuth({ onOAuthKakao = () => {} } = {}) {
  const toast = useToast();

  const setSignUpUser = useSetRecoilState(signUpUserAtom);

  const signUpMutation = useMutation({
    mutationFn: (user: SignUpUser) => postSignUp(user),
    onError: () => {
      toast({
        title: "회원가입에 실패하였습니다",
        status: "error",
        duration: 3000
      });
    }
  });

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postSignIn(email, password),
    onSuccess: ({ nickname }) => {
      currentUser.setNickname(nickname);
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
    mutationFn: postSignOut,
    onSuccess: () => {
      currentUser.removeNickname();
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
    onSuccess: ({ nickname }) => {
      currentUser.setNickname(nickname);
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

  const sendEmailAuthKeyMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => postEmailAuthKey(email),
    onSuccess: (data, { email }) => {
      setSignUpUser(prev => ({ ...prev, email }));
    },
    onError: () => {
      toast({
        title: "인증코드 전송중 오류가 발생했습니다",
        status: "error",
        duration: 3000
      });
    }
  });

  return {
    signUpMutation,
    signInMutation,
    signOutMutation,
    oAuthKakao: useCallback(
      (code: string) => oAuthKakaoSignInMutate(code),
      [oAuthKakaoSignInMutate]
    ),
    sendEmailAuthKeyMutation
  };
}
