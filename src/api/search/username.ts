import api from "@/api";

type UserResultData = {
  userId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export const getUsernameResult = (
  username: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<UserResultData[]>("/api/search/username", {
    params: { keyword: username, page, pageSize }
  });
