import api from "@/api";

export const postEmailAuthKeyCheck = (email: string, authKey: string) =>
  api.prod.post<{ correct: boolean }>("/api/auth/email/auth-key/check", {
    email,
    authKey
  });
