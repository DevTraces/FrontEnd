import feedAtom from "@/atoms/feedAtom";
import { FeedData } from "@/types/data/feed";
import { Flex } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import NewFeedCard from "./NewFeedCard";

type FeedListProps = {
  feedsData: FeedData[];
};

export default function NewFeedList({ feedsData }: FeedListProps) {
  return (
    <Flex
      direction="column"
      w="full"
      mt={{ base: "80px", md: "0" }}
      h={{ base: "calc(100vh - 140px)", md: "100vh" }}
    >
      {feedsData?.map(feed => (
        <RecoilRoot
          key={feed.feedId}
          initializeState={snapshot => {
            snapshot.set(feedAtom, feed);
          }}
        >
          <NewFeedCard feedData={feed} />
        </RecoilRoot>
      ))}
    </Flex>
  );
}
