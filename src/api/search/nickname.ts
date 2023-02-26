import api from "@/api";
import { UserSearchResultData } from "@/types/data/search";

export const getNicknameResult = (
  nickname: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<UserSearchResultData[]>("/api/search/nickname", {
    params: { keyword: nickname, page, pageSize }
  });
