import api from "@/api";

export type FollowItemData = {
  username: string;
  nickname: string;
  profileImageUrl: string;
  isFollowing: boolean;
};

export const getFollowingList: (
  nickname: string,
  page: number,
  pageSize?: number
) => Promise<FollowItemData[]> = (nickname, page, pageSize = 10) =>
  api.dev.get<FollowItemData[]>(`/api/follows/following/${nickname}`, {
    params: { page, pageSize }
  });
