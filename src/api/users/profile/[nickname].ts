import api from "@/api";

type UserProfileData = {
  username: string;
  nickname: string;
  description: string;
  profileImageUrl: string;
  totalFeedNumber: number;
  followerNumber: number;
  followingNumber: number;
};
export async function getUserProfile(nickname: string) {
  return api.get<UserProfileData>({ path: `/api/users/profile/${nickname}` });
}
