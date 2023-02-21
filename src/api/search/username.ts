import api from "@/api";

type UserResultData = {
  userId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export const getUsernameResult: (
  username: string,
  page: number,
  pageSize?: number
) => Promise<UserResultData[]> = (username: string, page, pageSize = 10) => {
  return api.dev.get<UserResultData[]>("/api/search/username", {
    params: { keyword: username, page, pageSize }
  });
};
