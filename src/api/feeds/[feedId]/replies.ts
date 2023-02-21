import api from "@/api";
import { ReplyData } from "@/types/data/reply";

export const getReplies: (
  feedId: number,
  page: number,
  pageSize?: number
) => Promise<ReplyData[]> = (feedId, page, pageSize) =>
  api.prod.get<ReplyData[]>(`/api/feeds/${feedId}/replies`, {
    params: { page, pageSize }
  });

export const postReplies = (feedId: number, content: string) =>
  api.prod.post<ReplyData[]>(
    `/api/feeds/${feedId}/replies`,

    { content }
  );
