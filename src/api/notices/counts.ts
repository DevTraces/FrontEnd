import { NoticesCount } from "@/types/data/notice";
import api from "..";

export const getNoticesCount = () =>
  api.dev.get<NoticesCount>("/api/notices/counts");
