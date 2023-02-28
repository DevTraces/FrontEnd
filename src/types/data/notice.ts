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
  senderNickname: string;
  replyContent: string;
  feedId: number;
  replyId: number;
  senderProfileImageUrl: string;
  feedFirstImageUrl: string;
};

export type ReReplyNotice = NoticeBase<"REREPLY"> & {
  senderNickname: string;
  rereplyContent: string;
  feedId: number;
  replyId: number;
  feedFirstImageUrl: string;
  reReplyId: number;
  noticeTarget: string;
  senderProfileImageUrl: string;
};

export type NoticesCount = { noticeNumber: number };

export type NoticeList = (
  | LikeNotice
  | FollowNotice
  | ReplyNotice
  | ReReplyNotice
)[];
