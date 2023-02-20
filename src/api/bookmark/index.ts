import api from "@/api";

type BookmarkData = {
  feedId: string;
  imageUrl: string;
};

export const getBookmarkList = () =>
  api.dev.get<BookmarkData[]>("/api/bookmark");
