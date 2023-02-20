import api from "@/api";

export const postFollow = (nickname: string) =>
  api.dev.post<null>(`/api/follows/${nickname}`);

export const deleteFollow = (nickname: string) =>
  api.dev.delete<null>(`/api/follows/${nickname}`);
