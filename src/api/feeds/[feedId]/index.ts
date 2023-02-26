import api from "@/api";
import {
  EditorPublishData,
  FeedData,
  FileImage,
  UrlImage
} from "@/types/data/feed";

export const getFeed = async (feedId: number) =>
  api.prod.get<FeedData>(`/api/feeds/${feedId}`);

export const deleteFeed = (feedId: number) =>
  api.prod.delete(`/api/feeds/${feedId}`);

export const postFeed = (
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
      .map((img, i) => ({ ...img, index: `${i}` }))
      .filter((img): img is UrlImage & { index: string } => img.type === "url");

    prevUrls.forEach(p => formData.append("existingUrlList", p.src));
    prevUrls.forEach(p => formData.append("indexList", p.index));
  }

  if (tags) tags.forEach(tag => formData.append("hashtags", tag));

  return api.prod.post(`/api/feeds/${feedId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
