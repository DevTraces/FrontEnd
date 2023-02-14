type NoticeBase = {
  noticeId: number;
  nickname: string;
  createdAt: string;
  imageUrl: string;
};

export type LikeNotice = NoticeBase & {
  noticeType: "LIKE";
  feedId: number;
};

export type FollowNotice = NoticeBase & {
  noticeType: "FOLLOW";
  isFollowing: boolean;
};

export type ReplyNotice = NoticeBase & {
  noticeType: "REPLY";
  feedId: number;
  replyId: number;
  content: string;
};

export type ReReplyNotice = Omit<ReplyNotice, "noticeType"> & {
  noticeType: "REREPLY";
  reReplyId: number;
};

export type NoticesCount = { noticeNumber: number };

export type NoticeList = (
  | LikeNotice
  | FollowNotice
  | ReplyNotice
  | ReReplyNotice
)[];
