import api from "..";

export const postLike = (feedId: number) =>
  api.prod.post<null>(`/api/like/${feedId}`);

export const deleteLike = (feedId: number) =>
  api.prod.delete<null>(`/api/like/${feedId}`);
