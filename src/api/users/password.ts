import api from "..";

export const patchPassword = (beforePassword: string, afterPassword: string) =>
  api.patch({
    path: "/api/users/password",
    body: { beforePassword, afterPassword }
  });
