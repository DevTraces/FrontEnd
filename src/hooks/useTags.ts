import { useState } from "react";
import { nanoid } from "nanoid";

type TagItem = { id: string; content: string };

export default function useTags(initialTags: string[] = []) {
  const [tags, setTags] = useState<TagItem[]>(
    initialTags.map(content => ({
      id: nanoid(),
      content
    }))
  );

  const addTag = (content: string) => {
    setTags(prev => [...prev, { id: nanoid(), content }]);
  };

  const removeTag = (id: string) => {
    setTags(prev => prev.filter(p => p.id !== id));
  };

  return { tags, addTag, removeTag };
}
