import api from "@/api";
import { FeedData } from "@/types/data/feed";

export const getFeed = async (feedId: number) => {
  return api.get<FeedData>({
    path: `/api/feeds/${feedId}`
  });
};

export const deleteFeed = (feedId: number) =>
  api.delete({ path: `/api/feeds/${feedId}` });
