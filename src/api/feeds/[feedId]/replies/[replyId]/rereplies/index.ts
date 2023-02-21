import api from "@/api";
import { RereplyData } from "@/types/data/reply";

export const getRereplies = (feedId: number, replyId: number) =>
  api.prod.get<RereplyData[]>(
    `/api/feeds/${feedId}/replies/${replyId}/rereplies?page=0&pageSize=10`
  );

export const postRereplies = (
  feedId: number,
  replyId: number,
  content: string
) =>
  api.prod.post<RereplyData[]>(
    `/api/feeds/${feedId}/replies/${replyId}/rereplies`,
    { content }
  );
