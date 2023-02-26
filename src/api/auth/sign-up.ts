import { SignUpUser } from "@/atoms/auth/signUpUser";
import api from "@/api";

export const postSignUp = (signUpUser: SignUpUser) =>
  api.prod.post<{
    email: string;
    username: string;
    nickname: string;
    profileImageUrl: string;
    description: string;
  }>("/api/auth/sign-up", signUpUser, {
    headers: { "Content-Type": "multipart/form-data" }
  });
