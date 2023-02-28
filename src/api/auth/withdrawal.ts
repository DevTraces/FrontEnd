import api from "@/api";

export const postWithdrawUser = ({ password }: { password: string }) =>
  api.prod.post<{
    password: string;
  }>("/api/auth/withdrawal", { password });
