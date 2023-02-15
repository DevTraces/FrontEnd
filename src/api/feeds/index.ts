import api from "..";

export const postFeeds = (
  content: string,
  imageFiles: File[],
  hashtags: string[]
) => api.post({ path: "/api/feeds", body: { content, imageFiles, hashtags } });
