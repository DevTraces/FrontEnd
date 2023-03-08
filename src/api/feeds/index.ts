import { EditorPublishData, FeedData } from "@/types/data/feed";
import api from "..";

export const postFeeds = ({ images, textContent, tags }: EditorPublishData) => {
  const formData = new FormData();
  formData.append("content", textContent);
  images.forEach(file => formData.append("imageFiles", file.src));
  tags.forEach(tag => formData.append("hashtags", tag));
  return api.prod.post<FeedData>("/api/feeds", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
