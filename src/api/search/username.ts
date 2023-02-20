import api from "@/api";

type UserResultData = {
  userId: number;
  username: string;
  nickname: string;
  profileImageUrl: string;
};

export async function getUsernameResult(username: string) {
  return api.get<UserResultData[]>({
    path: "/api/search/username",
    query: { keyword: username }
  });
}
