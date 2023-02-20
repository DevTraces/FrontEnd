import { getFeeds } from "@/api/feeds/[nickname]";
import FeedList from "@/components/feed/FeedList";
import feedsKeys from "@/queryKeys/feedsKeys";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

type PostsProps = {
  nickname: string;
};

export default function Posts({ nickname }: PostsProps) {
  const feedsQuery = useQuery({
    queryKey: feedsKeys.feeds(nickname),
    queryFn: () => getFeeds(nickname)
  });

  if (feedsQuery.isLoading) return <>Posts 로딩중...</>;
  if (feedsQuery.isError) return <>Posts 에서 에러가 발생했습니다.</>;

  return (
    <VStack>
      <FeedList feedsData={feedsQuery.data} />
    </VStack>
  );
}
