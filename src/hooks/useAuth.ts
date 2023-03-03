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
import { SignUpUser, signUpUserAtom } from "@/atoms/auth/signUpUser";
import { APIError } from "@/types/error";
import currentUser from "@/utils/currentUser";
import { ToastId, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { useSetRecoilState } from "recoil";

export default function useAuth({ onOAuthKakao = () => {} } = {}) {
  const toast = useToast();
  const sendAuthKeyToastRef = useRef<ToastId>("");

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
    onMutate: () => {
      sendAuthKeyToastRef.current = toast({
        title: "인증코드 전송중",
        status: "info",
        duration: 10000
      });
    },
    onSuccess: (data, { email }) => {
      setSignUpUser(prev => ({ ...prev, email }));
      toast.update(sendAuthKeyToastRef.current, {
        title: "인증코드가 전송되었습니다",
        status: "success",
        duration: 2000
      });
    },

    onError: () => {
      toast.update(sendAuthKeyToastRef.current, {
        title: "인증코드 전송에 실패했어요",
        status: "error",
        duration: 3000
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
    },

    onError: () => {
      toast.update(sendAuthKeyToastRef.current, {
        title: "인증코드 전송에 실패했어요",
        status: "error",
        duration: 3000
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
    },
    onError: () => {
      toast({
        title: "비밀번호 변경에 실패했어요.",
        status: "error",
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
    },
    onError: () => {
      toast({
        title: "비밀번호 재설정에 실패했어요.",
        status: "error",
        duration: 3000
      });
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
    },
    onError: (e: APIError) => {
      toast({
        title:
          e.errorCode === "WRONG_EMAIL_OR_PASSWORD_BAD_REQUEST"
            ? "비밀번호가 올바르지 않아요"
            : "회원 탈퇴에 실패했어요",
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
    sendEmailAuthKeyMutation,
    sendEmailAutKeyForResetMutation,
    changePasswordMutation,
    resetPasswordMutation,
    withdrawalMutation
  };
}
