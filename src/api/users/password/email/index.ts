import api from "@/api";

export const postPasswordEmail = ({ email }: { email: string }) =>
  api.prod.post<null>("/api/users/password/email", { email });
