import searchValueAtom from "@/atoms/searchValueAtom";
import { SearchValue } from "@/types/data/search";
import { useRef } from "react";
import { useRecoilState } from "recoil";

const SEARCH_DEBOUNCE_TIME = 500;

export default function useSearch() {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtom);

  const changeType = (type: SearchValue["type"]) => {
    setSearchValue(prev => ({ ...prev, type }));
  };

  const search = (keyword: string) => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

    setSearchValue(prev => ({
      ...prev,
      isTyping: keyword !== ""
    }));

    timeoutIdRef.current = setTimeout(() => {
      setSearchValue(prev => ({
        ...prev,
        isTyping: false,
        value: keyword
      }));
    }, SEARCH_DEBOUNCE_TIME);
  };

  return { searchValue, changeType, search };
}
