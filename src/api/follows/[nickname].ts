import api from "@/api";

export const postFollow = (nickname: string) =>
  api.prod.post<null>(`/api/follows/${nickname}`);

export const deleteFollow = (nickname: string) =>
  api.prod.delete<null>(`/api/follows/${nickname}`);
