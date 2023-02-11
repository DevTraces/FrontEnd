import api from "@/api";
import { FollowItemData } from "../following/[nickname]";

export const getFollowerList = async (
  nickname: string,
  page: number,
  pageSize: number
) => {
  return api.get<FollowItemData[]>({
    path: `/api/follows/follower/${nickname}`,
    query: { page, pageSize }
  });
};
