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

// TODO: 비밀번호 재설정 API 연결
export const resetPassword = ({
  authKey,
  afterPassword
}: {
  authKey: string;
  afterPassword: string;
}) =>
  api.prod.patch("/some-api-here", {
    authKey,
    afterPassword
  });
