import api from "..";

export const patchPassword = (beforePassword: string, afterPassword: string) =>
  api.prod.patch("/api/users/password", {
    beforePassword,
    afterPassword
  });
