import { EditorImage, UrlImage } from "@/types/data/feed";
import { useMemo, useState } from "react";
import { nanoid } from "nanoid";

type ImagePreview = { url: string; imageId: string };

export default function useImagePreviews(imageUrls: string[] = []) {
  const initImages = useMemo(
    () =>
      imageUrls.map<EditorImage>(url => ({
        type: "url",
        src: url,
        imageId: nanoid()
      })),
    [imageUrls]
  );

  const [images, setImages] = useState<EditorImage[]>(initImages);

  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>(
    initImages
      .filter((image): image is UrlImage => image.type === "url")
      .map<ImagePreview>(({ src, imageId }) => ({ url: src, imageId }))
  );

  const addImage = (image: File) => {
    const imageId = nanoid();
    setImages(prev => [...prev, { src: image, imageId, type: "file" }]);
    setImagePreviews(prev => [
      ...prev,
      { url: URL.createObjectURL(image), imageId }
    ]);
  };

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(p => p.imageId !== imageId));
    setImagePreviews(prev => prev.filter(p => p.imageId !== imageId));
  };

  const clearAllImages = () => {
    setImages([]);
    setImagePreviews([]);
  };

  return { images, imagePreviews, addImage, removeImage, clearAllImages };
}
