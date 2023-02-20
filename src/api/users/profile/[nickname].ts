import api from "@/api";
import { ProfileData } from "@/types/data/user";

export const getUserProfile = (nickname: string) =>
  api.dev.get<ProfileData>(`/api/users/profile/${nickname}`);
