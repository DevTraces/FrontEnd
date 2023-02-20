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

export const getRereplies = (feedId: number, replyId: number) =>
  api.dev.get<ReplyData[]>(`/api/feeds/${feedId}/replies/${replyId}/rereplies`);

export const postRereplies = (
  feedId: number,
  replyId: number,
  content: string
) =>
  api.dev.post<ReplyData[]>(
    `/api/feeds/${feedId}/replies/${replyId}/rereplies`,
    { content }
  );
