import api from "@/api";

export const postFollow = (nickname: string) => {
  return api.post<{ data: null }>({ path: `/api/follows/${nickname}` });
};

export const deleteFollow = (nickname: string) => {
  return api.delete<{ data: null }>({ path: `/api/follows/${nickname}` });
};
