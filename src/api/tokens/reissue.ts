import api from "@/api";

export async function postTokensReissue() {
  return api.dev.post<{
    accessToken: string;
  }>("/api/tokens/reissue");
}
