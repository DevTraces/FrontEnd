import api from "@/api";
import { EditorImage, FeedData } from "@/types/data/feed";

export const getFeed = async (feedId: number) => {
  return api.get<FeedData>({
    path: `/api/feeds/${feedId}`
  });
};

export const deleteFeed = (feedId: number) =>
  api.delete({ path: `/api/feeds/${feedId}` });

export const putFeed = (
  feedId: number,
  modifiedData: {
    content?: string;
    images?: EditorImage[];
    hashtags?: string[];
  }
) =>
  api.put({
    path: `/api/feeds/${feedId}`,
    body: modifiedData
  });
