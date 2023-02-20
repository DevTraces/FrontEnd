import api from "../..";

export const getEmailDuplicateCheck = (email: string) =>
  api.prod.get<{ duplicatedEmail: boolean }>("/api/users/email/check", {
    params: { email }
  });
