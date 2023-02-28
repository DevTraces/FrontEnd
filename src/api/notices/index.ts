import { NoticeList } from "@/types/data/notice";
import api from "..";

export const getNotices = (page: number, pageSize: number = 10) =>
  api.prod.get<NoticeList>("/api/notices", {
    params: {
      page,
      pageSize
    }
  });
