type NoticeTypes = "LIKE" | "FOLLOW" | "REPLY" | "REREPLY";

type NoticeBase<T extends NoticeTypes> = {
  noticeId: number;
  createdAt: string;
  noticeType: T;
};

export type LikeNotice = NoticeBase<"LIKE"> & {
  nickname: string;
  feedId: number;
  feedContent: string;
  likeProfileImageUrl: string;
  feedFirstImageUrl: string;
};

export type FollowNotice = NoticeBase<"FOLLOW"> & {
  senderNickname: string;
  isFollowing: boolean;
  followerProfileImageUrl: string;
};

export type ReplyNotice = NoticeBase<"REPLY"> & {
  nickname: string;
  content: string;
  feedId: number;
  replyId: number;
  replierProfileImageUrl: string;
  feedFirstImageUrl: string;
};

export type ReReplyNotice = NoticeBase<"REREPLY"> & {
  nickname: string;
  content: string;
  feedId: number;
  replyId: number;
  feedFirstImageUrl: string;
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
