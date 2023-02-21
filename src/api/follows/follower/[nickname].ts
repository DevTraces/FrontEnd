import api from "@/api";
import { FollowItemData } from "../following/[nickname]";

export const getFollowerList: (
  nickname: string,
  page: number,
  pageSize?: number
) => Promise<FollowItemData[]> = (nickname, page, pageSize = 10) =>
  api.dev.get<FollowItemData[]>(`/api/follows/follower/${nickname}`, {
    params: { page, pageSize }
  });
