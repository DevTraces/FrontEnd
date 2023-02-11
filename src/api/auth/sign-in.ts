import api from "..";

export const postSignIn = (email: string, password: string) =>
  api.post<null>({
    path: "/api/auth/sign-in",
    body: {
      email,
      password
    }
  });
