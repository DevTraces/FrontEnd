import searchValueAtom from "@/atoms/searchValueAtom";
import { SearchValue } from "@/types/data/search";
import { useRecoilState } from "recoil";

let timeoutId = null as unknown as ReturnType<typeof setTimeout>;
const SEARCH_DEBOUNCE_TIME = 500;

export default function useSearch() {
  const [searchValue, setSearchValue] = useRecoilState(searchValueAtom);

  const changeType = (type: SearchValue["type"]) => {
    setSearchValue(prev => ({ ...prev, type }));
  };

  const search = (keyword: string) => {
    if (timeoutId) clearTimeout(timeoutId);

    setSearchValue(prev => ({
      ...prev,
      isTyping: keyword !== ""
    }));

    timeoutId = setTimeout(() => {
      setSearchValue(prev => ({
        ...prev,
        isTyping: false,
        value: keyword
      }));
    }, SEARCH_DEBOUNCE_TIME);
  };

  return { searchValue, changeType, search };
}
