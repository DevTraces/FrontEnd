import api from "@/api";
import { ReplyData } from "./replies/[replyId]/rereplies";

export const getReplies = (feedId: number) => {
  return api.get<ReplyData[]>({
    path: `/api/feeds/${feedId}/replies`
  });
};

export const postReplies = (feedId: number, content: string) => {
  return api.post<ReplyData[]>({
    path: `/api/feeds/${feedId}/replies`,
    body: { content }
  });
};
