import { getEmailDuplicateCheck } from "@/api/users/email/check";
import { getNicknameDuplicateCheck } from "@/api/users/nickname/check";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

export default function useCheck() {
  const toast = useToast();

  const nicknameDuplicateMutation = useMutation({
    mutationFn: ({ nickname }: { nickname: string }) =>
      getNicknameDuplicateCheck(nickname),
    onError: () => {
      toast({
        title: "닉네임 중복체크에 실패했습니다",
        status: "error",
        duration: 3000
      });
    }
  });

  const emailDuplicateMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => getEmailDuplicateCheck(email),
    onError: () => {
      toast({
        title: "이메일 중복체크에 실패했습니다",
        status: "error",
        duration: 3000
      });
    }
  });

  return {
    nicknameDuplicateMutation,
    emailDuplicateMutation
  };
}
