import api from "@/api";

export type FollowItemData = {
  username: string;
  nickname: string;
  profileImageUrl: string;
  isFollowing: boolean;
};

export const getFollowingList = (
  nickname: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<FollowItemData[]>(`/api/follows/following/${nickname}`, {
    params: { page, pageSize }
  });
