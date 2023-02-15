import { NoticesCount } from "@/types/data/notice";
import api from "..";

export const getNoticesCount = () => {
  return api.get<NoticesCount>({ path: "/api/notices/counts" });
};
