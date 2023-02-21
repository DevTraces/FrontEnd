import api from "@/api";
import { FollowItemData } from "../following/[nickname]";

export const getFollowerList = (
  nickname: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<FollowItemData[]>(`/api/follows/follower/${nickname}`, {
    params: { page, pageSize }
  });
