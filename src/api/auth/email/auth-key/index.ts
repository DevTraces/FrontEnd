import api from "@/api";

export const postEmailAuthKey = (email: string) =>
  api.prod.post<null>("/api/auth/email/auth-key", { email });
