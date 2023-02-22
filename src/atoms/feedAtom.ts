import { FeedData } from "@/types/data/feed";
import { atom } from "recoil";

export default atom<FeedData>({
  key: "feedAtom",
  default: {
    feedId: 1,
    authorNickname: "",
    numberOfLike: 1,
    hashtags: [],
    content: "string",
    createdAt: new Date(),
    imageUrls: [],
    authorProfileImageUrl: "string",
    liked: true,
    bookMarked: true,
    modifiedAt: new Date(),
    numberOfReply: 1
  }
});
