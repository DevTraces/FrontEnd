export type FeedContent = {
  feedId: number;
  authorNickname: string;
  numberOfLike: number;
  hashtags: string[];
  content: string;
  createdAt: Date;
  liked: boolean;
  saved: boolean;
};

export type FeedData = FeedContent & {
  imageUrls: string[];
  authorProfileImageUrl: string;
  numberOfReply?: number;
  modifiedAt: Date;
  liked: boolean;
  saved: boolean;
};

export type PostCardData = Omit<FeedData, "numberOfReply" | "modifiedAt">;
