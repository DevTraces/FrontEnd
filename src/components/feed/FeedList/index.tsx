import feedAtom from "@/atoms/feedAtom";
import FeedCard from "@/components/@common/FeedCard";
import { FeedData } from "@/types/data/feed";
import { Flex } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

type FeedListProps = {
  feedsData: FeedData[];
};
export default function FeedList({ feedsData }: FeedListProps) {
  return (
    <Flex direction="column" pt={20} gap={10} m="auto" mb={20}>
      {feedsData?.map(feed => (
        <RecoilRoot
          key={feed.feedId}
          initializeState={snapshot => {
            snapshot.set(feedAtom, feed);
          }}
        >
          <FeedCard feedData={feed} />
        </RecoilRoot>
      ))}
    </Flex>
  );
}
