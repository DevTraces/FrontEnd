import api from "@/api";

export const patchPasswordReset = (data: {
  email: string;
  passwordResetKey: string;
  newPassword: string;
}) =>
  api.prod.patch<{ isPasswordResetKeyCorrect: boolean }>(
    "/api/users/password/reset",
    data
  );
