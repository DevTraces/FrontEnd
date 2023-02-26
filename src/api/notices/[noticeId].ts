import api from "..";

export const deleteNotice = (noticeId: number) =>
  api.dev.delete<null>(`/api/notices/${noticeId}`);
