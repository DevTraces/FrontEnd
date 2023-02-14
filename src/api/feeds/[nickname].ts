import api from "@/api";
import { FeedData } from "@/types/data/feed";

export const getFeeds = async (nickname: string) => {
  return api.get<FeedData[]>({
    path: `/api/feeds/${nickname}`
  });
};
