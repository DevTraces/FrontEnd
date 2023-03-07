import api from "@/api";

export const postEmailAuthKeyCheck = (email: string, authKey: string) =>
  api.prod.post<{ isCorrect: boolean; signUpKey: string }>(
    "/api/auth/email/auth-key/check",
    {
      email,
      authKey
    }
  );
