import { postEmailAuthKey } from "@/api/auth/email/auth-key";
import { postSignIn } from "@/api/auth/sign-in";
import { postSignOut } from "@/api/auth/sign-out";
import { postSignUp } from "@/api/auth/sign-up";
import { postWithdrawUser } from "@/api/auth/withdrawal";
import { postOAuth } from "@/api/oauth/kakao/callback";
import { postOAuthToken } from "@/api/oauth/token";
import { patchPassword } from "@/api/users/password";
import { postPasswordEmail } from "@/api/users/password/email";
import { patchPasswordReset } from "@/api/users/password/reset";
import currentUser from "@/utils/currentUser";
import { ToastId, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

export default function useAuth({ onOAuthKakao = () => {} } = {}) {
  const toast = useToast();
  const sendAuthKeyToastRef = useRef<ToastId>("");

  const signUpMutation = useMutation({
    mutationFn: postSignUp
  });

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postSignIn(email, password),
    onSuccess: ({ nickname }) => {
      currentUser.setNickname(nickname);
    }
  });

  const signOutMutation = useMutation({
    mutationFn: postSignOut,
    onSuccess: () => {
      currentUser.removeNickname();
    }
  });

  const oAuthSignInMutation = useMutation({
    mutationFn: (oAuthToken: string) => postOAuth(oAuthToken),
    onSuccess: ({ nickname }) => {
      currentUser.setNickname(nickname);
      onOAuthKakao();
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
    onMutate: () => {
      sendAuthKeyToastRef.current = toast({
        title: "인증코드 전송중",
        status: "info",
        duration: 10000
      });
    },
    onSuccess: () => {
      toast.update(sendAuthKeyToastRef.current, {
        title: "인증코드가 전송되었습니다",
        status: "success",
        duration: 2000
      });
    }
  });

  const sendEmailAutKeyForResetMutation = useMutation({
    mutationFn: postPasswordEmail,
    onMutate: () => {
      sendAuthKeyToastRef.current = toast({
        title: "인증코드 전송중",
        status: "info",
        duration: 10000
      });
    },
    onSuccess: () => {
      toast.update(sendAuthKeyToastRef.current, {
        title: "인증코드가 전송되었습니다",
        status: "success",
        duration: 2000
      });
    }
  });

  const changePasswordMutation = useMutation({
    mutationFn: patchPassword,
    onSuccess: () => {
      toast({
        title: "비밀번호가 변경되었어요.",
        status: "success",
        duration: 3000
      });
    }
  });

  const resetPasswordMutation = useMutation({
    mutationFn: patchPasswordReset,
    onSuccess: ({ isPasswordResetKeyCorrect }) => {
      if (isPasswordResetKeyCorrect) {
        toast({
          title: "비밀번호가 재설정되었어요.",
          status: "success",
          duration: 3000
        });
      }
    }
  });

  const withdrawalMutation = useMutation({
    mutationFn: postWithdrawUser,
    onSuccess: () => {
      toast({
        title: "회원탈퇴가 완료되었어요",
        status: "success",
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
    sendEmailAuthKeyMutation,
    sendEmailAutKeyForResetMutation,
    changePasswordMutation,
    resetPasswordMutation,
    withdrawalMutation
  };
}
