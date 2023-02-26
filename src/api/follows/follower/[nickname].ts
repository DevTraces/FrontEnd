import api from "@/api";
import { FollowItemData } from "@/types/data/follow";

export const getFollowerList = (
  nickname: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<FollowItemData[]>(`/api/follows/follower/${nickname}`, {
    params: { page, pageSize }
  });
