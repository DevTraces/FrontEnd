import api from "@/api";
import { SignUpUser } from "@/atoms/auth/signUpUser";

export const postEmailAuthKey = (email: SignUpUser["email"]) =>
  api.post({ path: "/api/auth/email/auth-key", body: { email } });
