import api from "..";

export const deleteNotice = (noticeId: number) => {
  return api.delete<null>({
    path: `/api/notices/counts/${noticeId}`
  });
};
