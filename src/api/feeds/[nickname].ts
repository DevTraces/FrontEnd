import api from "@/api";
import { FeedData } from "@/types/data/feed";

export const getFeeds = async (nickname: string) =>
  api.prod.get<FeedData[]>(`/api/feeds/list/${nickname}?page=0&pageSize=10`);
