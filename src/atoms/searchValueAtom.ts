import { SearchValue } from "@/types/data/search";
import { atom } from "recoil";

export default atom<SearchValue>({
  key: "searchValueAtom",
  default: {
    type: "username",
    value: "",
    isTyping: false
  }
});
