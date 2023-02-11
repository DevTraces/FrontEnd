import api from "@/api";

export const postEmailAuthKey = (email: string) =>
  api.post({ path: "/api/auth/email/auth-key", body: { email } });
