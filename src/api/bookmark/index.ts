import api from "@/api";

type BookmarkData = {
  feedId: string;
  imageUrl: string;
};

export const getBookmark = async () => {
  return api.get<BookmarkData[]>({ path: "/api/bookmark" });
};
