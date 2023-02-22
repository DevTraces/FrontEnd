import api from "@/api";
import { FollowItemData } from "@/types/data/follow";

export const getFollowingList = (
  nickname: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<FollowItemData[]>(`/api/follows/following/${nickname}`, {
    params: { page, pageSize }
  });
