import api from "@/api";

type HashTagData = {
  feedId: number;
  imageUrl: string;
};

type HashTagResult = {
  totalNumberOfSearches: number;
  feedInfoList: HashTagData[];
};

export const getHashtagResult = (
  hashtag: string,
  page: number,
  pageSize: number = 10
) =>
  api.dev.get<HashTagResult>("/api/search/hashtags", {
    params: { keyword: hashtag, page, pageSize }
  });
