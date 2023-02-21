import api from "@/api";

export const deleteReply = (feedId: number, replyId: number) =>
  api.prod.delete<null>(`/api/feeds/${feedId}/replies/${replyId}`);
