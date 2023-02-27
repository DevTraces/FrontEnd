import api from "@/api";
import { ProfilePatchData } from "@/types/data/user";

export const postUserProfileImage = ({
  nickname,
  profileImage
}: {
  nickname: string;
  profileImage: File;
}) => {
  const formData = new FormData();
  formData.append("profileImage", profileImage);

  return api.prod.post<{ profileImageUrl: string }>(
    `/api/users/profile/images/${nickname}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

export const deleteUserProfileImage = ({ nickname }: { nickname: string }) =>
  api.prod.delete<ProfilePatchData>(`/api/users/profile/images/${nickname}`);
