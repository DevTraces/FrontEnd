import api from "@/api";
import { EditorPublishData, FeedData, FileImage } from "@/types/data/feed";

export const getFeed = async (feedId: number) => {
  return api.prod.get<FeedData>(`/api/feeds/${feedId}`);
};

export const deleteFeed = (feedId: number) =>
  api.prod.delete(`/api/feeds/${feedId}`);

export const putFeed = (
  feedId: number,
  { images, textContent, tags }: Partial<EditorPublishData>
) => {
  const formData = new FormData();
  if (textContent) formData.append("content", textContent);

  if (images) {
    const newFiles = images.filter(
      (img): img is FileImage => img.type === "file"
    );
    newFiles.forEach(file => formData.append("imageFiles", file.src));

    const prevUrls = images
      .map((img, i) => ({ ...img, index: i }))
      .filter(img => img.type === "url")
      .map(img => `${img.src}${img.index}`);
    prevUrls.forEach(p => formData.append("existingImageUrls", p));
  }

  if (tags) tags.forEach(tag => formData.append("hashtags", tag));
  return api.prod.put(`/api/feeds/${feedId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
