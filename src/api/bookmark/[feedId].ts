import api from "@/api";

export const postBookmark = (feedId: number) => {
  return api.post<null>({ path: `/api/bookmark/${feedId}` });
};

export const deleteBookmark = (feedId: number) => {
  return api.delete<null>({ path: `/api/bookmark/${feedId}` });
};
