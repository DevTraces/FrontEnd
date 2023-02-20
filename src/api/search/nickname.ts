import api from "@/api";

type UserResultData = {
  userId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export async function getNicknameResult(nickname: string) {
  return api.get<UserResultData[]>({
    path: "/api/search/nickname",
    query: { keyword: nickname }
  });
}
