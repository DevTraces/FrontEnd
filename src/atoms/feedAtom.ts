import { FeedData } from "@/types/data/feed";
import { atom } from "recoil";

export default atom<FeedData>({
  key: "feedAtom"
});
