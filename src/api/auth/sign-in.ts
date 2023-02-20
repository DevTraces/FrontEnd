import api from "..";

export const postSignIn = async (email: string, password: string) =>
  api.prod
    .post<{ accessToken: string }>("/api/auth/sign-in", {
      email,
      password
    })
    .then(({ accessToken }) => {
      sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
    });
