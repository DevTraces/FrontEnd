import api from "../..";

export const getEmailDuplicateCheck = (email: string) =>
  api.get<{ isDuplicated: boolean }>({
    path: `/api/users/email/check`,
    query: { email }
  });
