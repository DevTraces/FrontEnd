import { NoticeCount } from "@/types/data/notice";
import api from "..";

export const getNoticesCount = () => {
  return api.get<NoticeCount>({ path: "/api/notices/counts" });
};
