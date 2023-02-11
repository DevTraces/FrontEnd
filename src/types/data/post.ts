export type PostData = {
  feedId: number;
  authorNickname: string;
  imageUrls: string[];
  numberOfLike: number;
  hashtags: string[];
  content: string;
  createdAt: Date;
  liked: boolean;
  saved: boolean;
};
