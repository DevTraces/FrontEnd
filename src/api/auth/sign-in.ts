import api from "..";

export const postSignIn = async (email: string, password: string) =>
  api.prod.post<{ accessToken: string; nickname: string }>(
    "/api/auth/sign-in",
    {
      email,
      password
    }
  );
