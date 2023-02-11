import api from "@/api";
import { ReplyData } from "./replies/[replyId]/rereplies";

export const getReplies = (feedId: number) => {
  return api.get<ReplyData[]>({
    path: `/api/feeds/${feedId}/replies`
  });
};
