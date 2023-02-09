/* eslint-disable import/prefer-default-export */
import { get } from "@/api";

export async function getNicknameDuplicateCheck(nickname: string) {
  return get<{ isDuplicated: boolean }>({
    path: "/api/users/nickname/check",
    query: { nickname }
  });
}
