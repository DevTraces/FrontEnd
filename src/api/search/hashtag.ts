import api from "@/api";

type HashTagData = {
  feedId: number;
  imageUrl: string;
};

type HashTagResult = {
  totalNumberOfSearches: number;
  feedList: HashTagData[];
};

export const getHashtagResult = (
  hashtag: string,
  page: number,
  pageSize: number = 10
) =>
  api.prod.get<HashTagResult>("/api/search/hashtags", {
    params: { keyword: hashtag, page, pageSize }
  });
