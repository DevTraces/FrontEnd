import { SignUpUser } from "@/atoms/auth/signUpUser";
import api from "..";

export const postSignUp = (signUpUser: SignUpUser) =>
  api.post({
    path: "/api/auth/sign-up",
    body: signUpUser
  });
