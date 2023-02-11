import api from "@/api";

export const postBoomark = (feedId: number) => {
  return api.post({ path: `/api/bookmark/${feedId}` });
};

export const deleteBookmark = (feedId: number) => {
  return api.delete({ path: `/api/bookmark/${feedId}` });
};
