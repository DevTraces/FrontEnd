import { postSignIn } from "@/api/auth/sign-in";
import userAtom from "@/atoms/userAtom";
import { APIError } from "@/types/error";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

type SignInData = {
  email: string;
  password: string;
};

type UseAuthParams = {
  onSignIn?: () => void;
  onSignOut?: () => void;
};

export default function useAuth({ onSignIn = () => {} }: UseAuthParams = {}) {
  const toast = useToast();

  const setUser = useSetRecoilState(userAtom);

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: SignInData) =>
      postSignIn(email, password),
    onSuccess: ({ accessToken }) => {
      sessionStorage.setItem("accessToken", accessToken);
      setUser({ nickname: "codeisneverodd" });
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

  return {
    signIn: (data: SignInData) => signInMutation.mutate(data),
    signOut: () => {}
  };
}
