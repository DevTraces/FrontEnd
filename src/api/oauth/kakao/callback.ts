import api from "@/api";

export const postOAuth = async (token: string) =>
  api.prod.post<{ accessToken: string; nickname: string }>(
    "/api/oauth/kakao/callback",
    {
      accessTokenFromKakao: token
    }
  );
