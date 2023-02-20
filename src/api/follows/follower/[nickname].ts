import api from "@/api";
import { FollowItemData } from "../following/[nickname]";

export const getFollowerList = (
  nickname: string,
  page: number,
  pageSize: number
) =>
  api.dev.get<FollowItemData[]>(`/api/follows/follower/${nickname}`, {
    params: { page, pageSize }
  });
