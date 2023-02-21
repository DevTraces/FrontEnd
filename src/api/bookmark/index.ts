import api from "@/api";

type BookmarkData = {
  feedId: string;
  imageUrl: string;
};

export const getBookmarkList: (
  page: number,
  pageSize?: number
) => Promise<BookmarkData[]> = (page, pageSize = 10) =>
  api.dev.get<BookmarkData[]>("/api/bookmark", {
    params: { page, pageSize }
  });
