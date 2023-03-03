import { postEmailAuthKeyCheck } from "@/api/auth/email/auth-key/check";
import { getEmailDuplicateCheck } from "@/api/users/email/check";
import { getNicknameDuplicateCheck } from "@/api/users/nickname/check";
import { postPasswordEmailCheck } from "@/api/users/password/email/check";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

export default function useCheck() {
  const toast = useToast();

  const nicknameDuplicateMutation = useMutation({
    mutationFn: ({ nickname }: { nickname: string }) =>
      getNicknameDuplicateCheck(nickname)
  });

  const emailDuplicateMutation = useMutation({
    mutationFn: ({ email }: { email: string }) => getEmailDuplicateCheck(email)
  });

  const emailAuthKeyCheckMutation = useMutation({
    mutationFn: ({ email, authKey }: { email: string; authKey: string }) =>
      postEmailAuthKeyCheck(email, authKey),
    onSuccess: ({ correct }) => {
      if (!correct) {
        toast({
          title: "인증코드가 올바르지 않아요.",
          status: "warning",
          duration: 3000
        });
      }
    }
  });
  const emailAuthKeyCheckForResetMutation = useMutation({
    mutationFn: postPasswordEmailCheck,
    onSuccess: ({ isCorrect }) => {
      if (!isCorrect) {
        toast({
          title: "인증코드가 올바르지 않아요.",
          status: "warning",
          duration: 3000
        });
      }
    }
  });

  return {
    nicknameDuplicateMutation,
    emailDuplicateMutation,
    emailAuthKeyCheckMutation,
    emailAuthKeyCheckForResetMutation
  };
}
