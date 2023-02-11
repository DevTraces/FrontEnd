/* eslint-disable import/prefer-default-export */

import api from "@/api";

export async function getNicknameDuplicateCheck(nickname: string) {
  return api.get<{ isDuplicated: boolean }>({
    path: "/api/users/nickname/check",
    query: { nickname }
  });
}
