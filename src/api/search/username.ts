import api from "@/api";
import { UserSearchResultData } from "@/types/data/search";

export const getUsernameResult = (
  username: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<UserSearchResultData[]>("/api/search/username", {
    params: { keyword: username, page, pageSize }
  });
