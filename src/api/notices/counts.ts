import { NoticesCount } from "@/types/data/notice";
import api from "..";

export const getNoticesCount = () =>
  api.prod.get<NoticesCount>("/api/notices/counts");
