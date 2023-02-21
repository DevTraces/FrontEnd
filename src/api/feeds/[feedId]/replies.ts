import api from "@/api";
import { ReplyData } from "@/types/data/reply";

export const getReplies = (feedId: number) =>
  api.prod.get<ReplyData[]>(`/api/feeds/${feedId}/replies?page=0&pageSize=10`);

export const postReplies = (feedId: number, content: string) =>
  api.prod.post<ReplyData[]>(
    `/api/feeds/${feedId}/replies`,

    { content }
  );
