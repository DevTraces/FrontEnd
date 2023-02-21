import api from "@/api";

type BookmarkData = {
  feedId: string;
  imageUrl: string;
};

export const getBookmarkList = (page: number, pageSize: number = 10) =>
  api.prod.get<BookmarkData[]>("/api/bookmark", {
    params: { page, pageSize }
  });
