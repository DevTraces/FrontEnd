import api from "@/api";

type BookmarkData = {
  feedId: string;
  imageUrl: string;
};

export const getBookmarkList = async () => {
  return api.get<BookmarkData[]>({ path: "/api/bookmark" });
};
