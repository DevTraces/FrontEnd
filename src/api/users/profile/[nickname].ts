import api from "@/api";
import { ProfileData } from "@/types/data/user";

export const getUserProfile = (nickname: string) =>
  api.prod.get<ProfileData>(`/api/users/profile/${nickname}`);
