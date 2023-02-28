import api from "..";

export const deleteNotice = (noticeId: number) =>
  api.prod.delete<null>(`/api/notices/${noticeId}`);
