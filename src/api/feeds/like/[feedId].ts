import api from "@/api";

export const getFeedsLikeUsers = ({
  feedId,
  page,
  pageSize = 10
}: {
  feedId: number;
  page: number;
  pageSize?: number;
}) =>
  api.prod.get<
    {
      username: string;
      nickname: string;
      profileImageLink: string;
    }[]
  >(`/api/feeds/like/${feedId}`, {
    params: { page, pageSize }
  });
