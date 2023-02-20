import api from "@/api";
import { EditorImage, FeedData } from "@/types/data/feed";

export const getFeed = async (feedId: number) => {
  return api.dev.get<FeedData>(`/api/feeds/${feedId}`);
};

export const deleteFeed = (feedId: number) =>
  api.prod.delete(`/api/feeds/${feedId}`);

export const putFeed = (
  feedId: number,
  modifiedData: {
    content?: string;
    images?: EditorImage[];
    hashtags?: string[];
  }
) => api.dev.put(`/api/feeds/${feedId}`, modifiedData);
