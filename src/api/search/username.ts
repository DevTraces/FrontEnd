import api from "@/api";

type UserResultData = {
  userId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export async function getUsernameResult(username: string) {
  return api.dev.get<UserResultData[]>("/api/search/username", {
    params: { keyword: username }
  });
}
