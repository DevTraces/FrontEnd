import api from "@/api";

export const deleteRereply = (
  feedId: number,
  replyId: number,
  rereplyId: number
) =>
  api.prod.delete<null>(
    `/api/feeds/${feedId}/replies/${replyId}/rereplies/${rereplyId}`
  );

export const putRereply = (
  feedId: number,
  replyId: number,
  rereplyId: number,
  content: string
) =>
  api.prod.put<null>(
    `/api/feeds/${feedId}/replies/${replyId}/rereplies/${rereplyId}`,
    { content }
  );
