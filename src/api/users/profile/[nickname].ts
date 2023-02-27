import api from "@/api";
import { ProfilePatchData, ProfileData } from "@/types/data/user";

export const getUserProfile = (nickname: string) =>
  api.prod.get<ProfileData>(`/api/users/profile/${nickname}`);

export const patchUserProfile = ({
  nickname,
  data
}: {
  nickname: string;
  data: Partial<ProfilePatchData>;
}) => api.prod.patch<ProfilePatchData>(`/api/users/profile/${nickname}`, data);
