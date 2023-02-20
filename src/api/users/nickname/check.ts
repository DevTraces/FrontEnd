import api from "@/api";

export const getNicknameDuplicateCheck = (nickname: string) =>
  api.prod.get<{ duplicatedNickname: boolean }>("/api/users/nickname/check", {
    params: { nickname }
  });
