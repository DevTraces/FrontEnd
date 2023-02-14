import api from "@/api";

export type ReplyData = {
  replyId: number;
  feedId: number;
  authorNickname: string;
  content: string;
  authorProfileImageUrl: string;
  numberOfRereply: number;
  createdAt: Date;
  modifiedAt: Date;
};

export const getRereplies = (feedId: number, replyId: number) => {
  return api.get<ReplyData[]>({
    path: `/api/feeds/${feedId}/replies/${replyId}/rereplies`
  });
};

export const postRereplies = (
  feedId: number,
  replyId: number,
  content: string
) => {
  return api.post<ReplyData[]>({
    path: `/api/feeds/${feedId}/replies/${replyId}/rereplies`,
    body: { content }
  });
};
