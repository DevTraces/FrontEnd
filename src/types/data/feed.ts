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
  bookMarked: boolean;
  modifiedAt: Date;
  numberOfReply?: number;
};

export type PostCardData = Omit<FeedData, "numberOfReply" | "modifiedAt">;

export type FileImage = {
  type: "file";
  src: File;
  imageId: string;
};
export type UrlImage = {
  type: "url";
  src: string;
  imageId: string;
};

export type EditorImage = FileImage | UrlImage;

export type EditorPublishData = {
  images: EditorImage[];
  textContent: string;
  tags: string[];
};
