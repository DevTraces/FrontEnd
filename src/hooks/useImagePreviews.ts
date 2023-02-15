import { useState } from "react";

type Image = {
  file: File;
  imageId: string;
};

type ImagePreview = { url: string; imageId: string };

export default function useImagePreviews() {
  const [images, setImages] = useState<Image[]>([]);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const addImage = (image: File) => {
    const imageId = window.self.crypto.randomUUID();
    setImages(prev => [...prev, { file: image, imageId }]);
    setImagePreviews(prev => [
      ...prev,
      { url: URL.createObjectURL(image), imageId }
    ]);
  };

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(p => p.imageId !== imageId));
    setImagePreviews(prev => prev.filter(p => p.imageId !== imageId));
  };

  return { images, imagePreviews, addImage, removeImage };
}
