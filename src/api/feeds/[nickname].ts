import api from "@/api";
import { FeedData } from "@/types/data/feed";

export const getFeeds = (
  nickname: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<FeedData[]>(`/api/feeds/list/${nickname}`, {
    params: { page, pageSize }
  });
