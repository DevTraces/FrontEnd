import api from "..";

export const postLike = (feedId: number) => {
  return api.post<null>({ path: `/api/like/${feedId}` });
};

export const deleteLike = (feedId: number) => {
  return api.delete<null>({ path: `/api/like/${feedId}` });
};
