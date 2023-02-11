import api from "@/api";

export const postEmailAuthKeyCheck = (email: string, authKey: string) =>
  api.post<{ isCorrect: boolean }>({
    path: "/api/auth/email/auth-key/check",
    body: { email, authKey }
  });
