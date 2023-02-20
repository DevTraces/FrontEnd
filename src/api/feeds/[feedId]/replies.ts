import api from "@/api";
import { ReplyData } from "./replies/[replyId]/rereplies";

export const getReplies = (feedId: number) =>
  api.dev.get<ReplyData[]>(`/api/feeds/${feedId}/replies`);

export const postReplies = (feedId: number, content: string) =>
  api.dev.post<ReplyData[]>(
    `/api/feeds/${feedId}/replies`,

    { content }
  );
