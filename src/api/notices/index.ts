import { NoticeList } from "@/types/data/notice";
import api from "..";

type NoticeData = {
  noticeList: NoticeList;
};

export const getNotices = () => {
  return api.get<NoticeData>({ path: "/api/notices" });
};
