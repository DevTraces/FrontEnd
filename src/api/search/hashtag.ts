import api from "@/api";

type HashTagData = {
  feedId: number;
  imageUrl: string;
};

type HashTagResult = {
  totalNumberOfSearches: number;
  feedInfoList: HashTagData[];
};

export const getHashtagResult: (
  hashtag: string,
  page: number,
  pageSize?: number
) => Promise<HashTagResult> = (hashtag: string, page, pageSize = 10) => {
  return api.dev.get<HashTagResult>("/api/search/hashtags", {
    params: { keyword: hashtag, page, pageSize }
  });
};
