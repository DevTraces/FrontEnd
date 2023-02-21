import api from "@/api";

export const deleteReply = (feedId: number, replyId: number) =>
  api.prod.delete<null>(`/api/feeds/${feedId}/replies/${replyId}`);

export const putReply = (feedId: number, replyId: number, content: string) =>
  api.prod.put<null>(`/api/feeds/${feedId}/replies/${replyId}`, { content });
