import api from "..";

export const patchPassword = ({
  beforePassword,
  afterPassword
}: {
  beforePassword: string;
  afterPassword: string;
}) =>
  api.prod.patch("/api/users/password", {
    beforePassword,
    afterPassword
  });
