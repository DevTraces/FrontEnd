import api from "@/api";

export const postPasswordEmailCheck = ({
  email,
  authKey
}: {
  email: string;
  authKey: string;
}) =>
  api.prod.post<{
    passwordResetKey: string;
    isCorrect: boolean;
  }>("/api/users/password/email/check", { email, authKey });
