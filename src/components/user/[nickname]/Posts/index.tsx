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
    queryFn: () => getFeeds(nickname, 0)
  });

  return (
    <VStack>
      {feedsQuery.data && <FeedList feedsData={feedsQuery.data} />}
    </VStack>
  );
}
