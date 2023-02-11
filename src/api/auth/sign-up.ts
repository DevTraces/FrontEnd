import { SignUpUser } from "@/atoms/auth/signUpUser";
import api from "..";

export const postSignUp = (signUpUser: SignUpUser) =>
  api.post<{
    email: string;
    username: string;
    nickname: string;
    profileImageLink: string;
    description: string;
  }>({
    path: "/api/auth/sign-up",
    body: signUpUser
  });
