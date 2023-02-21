import api from "@/api";

type UserResultData = {
  userId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export const getNicknameResult: (
  nickname: string,
  page: number,
  pageSize?: number
) => Promise<UserResultData[]> = (nickname: string, page, pageSize) => {
  return api.dev.get<UserResultData[]>("/api/search/nickname", {
    params: { keyword: nickname, page, pageSize }
  });
};
