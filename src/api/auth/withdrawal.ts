import api from "@/api";

export const postWithdrawUser = () =>
  api.prod.post<{
    password: string;
  }>("/api/auth/withdrawal");
