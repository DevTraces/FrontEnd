import api from "@/api";

type UserResultData = {
  userId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export async function getNicknameResult(nickname: string) {
  return api.dev.get<UserResultData[]>("/api/search/nickname", {
    params: { keyword: nickname }
  });
}
