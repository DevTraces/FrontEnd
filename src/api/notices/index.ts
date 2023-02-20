import { NoticeList } from "@/types/data/notice";
import api from "..";

type NoticeData = {
  noticeList: NoticeList;
};

export const getNotices = () => api.dev.get<NoticeData>("/api/notices");
