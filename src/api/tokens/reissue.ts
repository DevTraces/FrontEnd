import api from "@/api";

export const postTokensReissue = () =>
  api.prod.post<{
    nickname: string;
  }>("/api/tokens/reissue");
