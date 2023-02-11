import api from "@/api";

type FeedData = {
  feedId: number;
  authorNickname: string;
  content: string;
  authorProfileImageUrl: string;
  numberOfReply: number;
  createdAt: Date;
  modifiedAt: Date;
  imageUrls: string[];
  hashtags: string[];
  numberOfLike: number;
  liked: boolean;
  saved: boolean;
};

export const getFeeds = async (nickname: string) => {
  return api.get<FeedData[]>({
    path: `/api/feeds/${nickname}`
  });
};
