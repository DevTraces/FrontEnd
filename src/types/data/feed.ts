export type FeedData = {
  feedId: number;
  authorNickname: string;
  numberOfLike: number;
  hashtags: string[];
  content: string;
  createdAt: Date;
  imageUrls: string[];
  authorProfileImageUrl: string;
  liked: boolean;
  saved: boolean;
  modifiedAt: Date;
  numberOfReply?: number;
};

export type PostCardData = Omit<FeedData, "numberOfReply" | "modifiedAt">;
