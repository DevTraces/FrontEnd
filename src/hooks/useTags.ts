import { nanoid } from "nanoid";
import { useState } from "react";

type TagItem = { id: string; content: string };

export default function useTags(initialTags: string[] = []) {
  const [tags, setTags] = useState<TagItem[]>(
    initialTags.map(content => ({
      id: nanoid(),
      content
    }))
  );

  const addTag = async (rawContent: string) => {
    const content = rawContent.trim();

    if (tags.find(t => t.content === content))
      return Promise.reject(new Error("이미 존재하는 태그입니다"));

    if (content === "") {
      return Promise.reject(new Error("태그를 입력해주세요"));
    }
    if (content.length > 100)
      return Promise.reject(new Error("태그는 100자 이하로 입력해주세요"));

    if (!/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s]+$/.test(content))
      return Promise.reject(
        new Error("태그는 한글, 영어, 숫자, 띄어쓰기만 입력할 수 있어요")
      );

    return Promise.resolve(
      setTags(prev => [...prev, { id: nanoid(), content }])
    );
  };

  const removeTag = (id: string) => {
    setTags(prev => prev.filter(p => p.id !== id));
  };

  return { tags, addTag, removeTag };
}
