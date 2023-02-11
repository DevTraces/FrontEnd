import api from "@/api";
import { ProfileData } from "@/types/data/user";

export async function getUserProfile(nickname: string) {
  return api.get<ProfileData>({ path: `/api/users/profile/${nickname}` });
}
