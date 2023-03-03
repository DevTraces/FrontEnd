import { FeedData } from "@/types/data/feed";
import api from "..";

export const getFeedMain = (page: number, pageSize: number = 10) =>
  api.prod.get<FeedData[]>("/api/feeds/main", { params: { page, pageSize } });
