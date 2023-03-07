import feedAtom from "@/atoms/feedAtom";
import FeedCard from "@/components/@common/FeedCard";
import { FeedData } from "@/types/data/feed";
import { Flex } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

type FeedListProps = {
  feedsData: FeedData[];
} & React.ComponentProps<typeof Flex>;

export default function FeedList({ feedsData, ...restProps }: FeedListProps) {
  return (
    <Flex
      direction="column"
      gap="20px"
      alignItems="center"
      {...restProps}
      w="full"
    >
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
