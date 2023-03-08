type NoticeTypes = "LIKE" | "FOLLOW" | "REPLY" | "REREPLY";

type NoticeBase<T extends NoticeTypes> = {
  noticeId: number;
  createdAt: string;
  noticeType: T;
  senderProfileImageUrl: string;
  senderNickname: string;
};

export type LikeNotice = NoticeBase<"LIKE"> & {
  feedId: number;
  feedContent: string;
  feedFirstImageUrl: string;
};

export type FollowNotice = NoticeBase<"FOLLOW"> & {
  isFollowing: boolean;
};

export type ReplyNotice = NoticeBase<"REPLY"> & {
  replyContent: string;
  feedId: number;
  replyId: number;
  feedFirstImageUrl: string;
};

export type ReReplyNotice = NoticeBase<"REREPLY"> & {
  rereplyContent: string;
  feedId: number;
  replyId: number;
  feedFirstImageUrl: string;
  reReplyId: number;
  noticeTarget: string;
};

export type NoticesCount = { noticeNumber: number };

export type NoticeList = (
  | LikeNotice
  | FollowNotice
  | ReplyNotice
  | ReReplyNotice
)[];
