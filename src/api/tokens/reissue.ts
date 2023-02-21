import api from "@/api";

export const postTokensReissue = () =>
  api.prod.post<{
    accessToken: string;
    nickname: string;
  }>("/api/tokens/reissue");
