import FeedCard from "@/components/@common/FeedCard";
import { FeedData } from "@/types/data/feed";
import { Flex } from "@chakra-ui/react";

type FeedListProps = {
  feedsData: FeedData[];
};
export default function FeedList({ feedsData }: FeedListProps) {
  return (
    <Flex direction="column" pt={20} gap={10} m="auto" mb={20}>
      {feedsData.map(feed => (
        <FeedCard key={feed.feedId} feedData={feed} />
      ))}
    </Flex>
  );
}
