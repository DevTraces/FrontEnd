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
  return api.get<HashTagResult>({
    path: "/api/search/hashtags",
    query: { keyword: hashtag }
  });
}
