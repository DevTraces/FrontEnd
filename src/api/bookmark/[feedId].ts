import api from "@/api";

export const postBookmark = (feedId: number) =>
  api.prod.post<null>(`/api/bookmark/${feedId}`);

export const deleteBookmark = (feedId: number) =>
  api.prod.delete<null>(`/api/bookmark/${feedId}`);
