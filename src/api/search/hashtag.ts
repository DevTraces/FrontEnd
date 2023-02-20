import api from "@/api";

type HashTagData = {
  feedId: number;
  imageUrl: string;
};

type HashTagResult = {
  totalNumberOfSearches: number;
  feedInfoList: HashTagData[];
};

export async function getHashtagResult(hashtag: string) {
  return api.dev.get<HashTagResult>("/api/search/hashtags", {
    params: { keyword: hashtag }
  });
}
