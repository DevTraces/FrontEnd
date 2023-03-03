import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

const useApiError = () => {
  const router = useRouter();
  const toast = useToast();

  const handleError = useCallback(
    (error: any) => {
      const { status } = error.response;
      const { errorCode } = error.response.data;

      if (!errorCode || status >= 500) router.push("/api-error");

      switch (errorCode) {
        case "ACCESS_DENIED":
        case "INVALID_TOKEN":
        case "EXPIRED_ACCESS_TOKEN":
        case "FORBIDDEN":
          router.push("/auth/signIn");
          break;
        case "NOT_AUTHENTICATION_YET":
          router.push("/auth/signUp");
          break;
        case "WRONG_EMAIL_OR_PASSWORD":
        case "VALIDATION_FAILED":
          toast({
            title: "이메일 혹은 비밀번호가 올바르지 않아요",
            status: "error",
            duration: 3000
          });
          break;
        case "ALREADY_EXIST_EMAIL":
          toast({
            title: "이미 가입된 이메일이에요",
            status: "error",
            duration: 3000
          });
          break;
        case "ALREADY_EXIST_NICKNAME":
          toast({
            title: "이미 가입된 닉네임이에요",
            status: "error",
            duration: 3000
          });
          break;
        case "INVALID_IMAGE_EXTENSION":
          toast({
            title: "지원하지 않는 이미지 형식이에요",
            status: "error",
            duration: 3000
          });
          break;
        case "FEED_NOT_FOUND":
          toast({
            title: "존재하지 않는 게시물이에요",
            status: "error",
            duration: 3000
          });
          break;
        case "USER_NOT_FOUND":
          toast({
            title: "존재하지 않는 유저예요",
            status: "error",
            duration: 3000
          });
          break;
        case "UPDATE_PASSWORD_NOT_ALLOWED_FOR_KAKAO_USER":
          toast({
            title: "카카오로 가입한 사용자는 비밀번호를 설정할 수 없어요",
            status: "error",
            duration: 3000
          });
          break;
        case "CONTENT_LIMIT_EXCEED":
          toast({
            title: "내용은 1000자를 초과할 수 없어요",
            status: "error",
            duration: 3000
          });
          break;
        case "HASHTAG_LIMIT_EXCEED":
          toast({
            title: "해시태그는 10개를 초과할 수 없어요",
            status: "error",
            duration: 3000
          });
          break;
        case "FOLLOW_LIMIT_EXCEED":
          toast({
            title: "팔로우는 5000명을 초과할 수 없어요",
            status: "error",
            duration: 3000
          });
          break;
        case "REPLY_NOT_FOUND":
          toast({
            title: "존재하지 않는 댓글이에요",
            status: "error",
            duration: 3000
          });
          break;

        default:
          router.push("/api-error");
      }
    },
    [router, toast]
  );

  return { handleError };
};

export default useApiError;
