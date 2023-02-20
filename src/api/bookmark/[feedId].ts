import api from "@/api";

export const postBookmark = (feedId: number) =>
  api.dev.post<null>(`/api/bookmark/${feedId}`);

export const deleteBookmark = (feedId: number) =>
  api.dev.delete<null>(`/api/bookmark/${feedId}`);
