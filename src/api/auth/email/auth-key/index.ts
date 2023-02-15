import api from "@/api";

export const postEmailAuthKey = (email: string) =>
  api.post<null>({
    path: "/api/auth/email/auth-key",
    body: { email },
    mode: "prod"
  });
