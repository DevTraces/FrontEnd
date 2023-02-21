import api from "@/api";

export const postOAuthSignIn = async (token: string) =>
  api.prod.post<{ accessToken: string }>("/api/oauth/kakao/callback", {
    accessTokenFromKakao: token
  });
