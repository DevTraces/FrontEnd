import api from "@/api";

export type FollowItemData = {
  username: string;
  nickname: string;
  profileImageUrl: string;
  isFollowing: boolean;
};

export const getFollowingList = async (
  nickname: string,
  page: number,
  pageSize: number
) => {
  return api.get<FollowItemData[]>({
    path: `/api/follows/following/${nickname}`,
    query: { page, pageSize }
  });
};
