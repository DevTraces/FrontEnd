import api from "..";

export const postLike = (feedId: number) => {
  return api.post({ path: `/api/like/${feedId}` });
};

export const deleteLike = (feedId: number) => {
  return api.delete({ path: `/api/like/${feedId}` });
};
