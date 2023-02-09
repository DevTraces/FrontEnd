/* eslint-disable import/prefer-default-export */
import { get } from "@/api";

export async function getUserProfile(nickname: string) {
  return get<{
    username: string;
    nickname: string;
    description: string;
    profileImageUrl: string;
    totalFeedNumber: number;
    followerNumber: number;
    followingNumber: number;
  }>({ path: `/api/users/profile/${nickname}` });
}
