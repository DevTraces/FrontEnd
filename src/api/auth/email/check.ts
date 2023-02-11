import api from "../..";

export const getEmailDuplicateCheck = (email: string) =>
  api.get({
    path: `/api/users/email/check`,
    query: { email }
  });
