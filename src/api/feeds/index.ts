import api from "..";

export const postFeeds = (
  content: string,
  imageFiles: File[],
  hashtags: string[]
) => {
  const formData = new FormData();
  formData.append("content", content);
  imageFiles.forEach(file => formData.append("imageFiles", file));
  hashtags.forEach(tag => formData.append("hashtags", tag));
  return api.prod.post("/api/feeds", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
