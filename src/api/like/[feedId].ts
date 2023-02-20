import api from "..";

export const postLike = (feedId: number) =>
  api.dev.post<null>(`/api/like/${feedId}`);

export const deleteLike = (feedId: number) =>
  api.dev.delete<null>(`/api/like/${feedId}`);
