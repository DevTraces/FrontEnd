type NoticeBase = {
  noticeId: number;
  createdAt: string;
};

export type LikeNotice = NoticeBase & {
  nickname: string;
  noticeType: "LIKE";
  feedId: number;
  feedContent: string;
  likeProfileImageUrl: string;
  feedFirstImageUrl: string;
  createdAt: string;
};

export type FollowNotice = NoticeBase & {
  senderNickname: string;
  noticeType: "FOLLOW";
  isFollowing: boolean;
  followerProfileImageUrl: string;
};

export type ReplyNotice = NoticeBase & {
  nickname: string;
  noticeType: "REPLY";
  content: string;
  feedId: number;
  replyId: number;
  replierProfileImageUrl: string;
  feedFirstImageUrl: string;
};

export type ReReplyNotice = Omit<
  ReplyNotice,
  "noticeType" | "replierProfileImageUrl"
> & {
  nickname: string;
  noticeType: "REREPLY";
  reReplyId: number;
  noticeTarget: string;
  rereplierImageUrl: string;
};

export type NoticesCount = { noticeNumber: number };

export type NoticeList = (
  | LikeNotice
  | FollowNotice
  | ReplyNotice
  | ReReplyNotice
)[];
