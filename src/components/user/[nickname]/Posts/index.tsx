import { getFeeds } from "@/api/feeds/list/[nickname]";
import FeedList from "@/components/feed/FeedList";
import feedsKeys from "@/queryKeys/feedsKeys";
import { Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

type PostsProps = {
  nickname: string;
};

export default function Posts({ nickname }: PostsProps) {
  const feedsQuery = useQuery({
    queryKey: feedsKeys.feeds(nickname),
    queryFn: () => getFeeds(nickname, 0)
  });
  if (feedsQuery.data?.length === 0) {
    return <Text>작성된 게시물이 없어요</Text>;
  }
  return (
    <VStack>
      {feedsQuery.data && <FeedList feedsData={feedsQuery.data} />}
    </VStack>
  );
}
