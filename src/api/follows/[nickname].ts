import api from "@/api";

export const postFollow = (nickname: string) => {
  return api.post<null>({ path: `/api/follows/${nickname}` });
};

export const deleteFollow = (nickname: string) => {
  return api.delete<null>({ path: `/api/follows/${nickname}` });
};
