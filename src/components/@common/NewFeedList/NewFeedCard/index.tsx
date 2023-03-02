import feedAtom from "@/atoms/feedAtom";
import { FeedData } from "@/types/data/feed";
import { Flex } from "@chakra-ui/react";
import { ComponentProps, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Header from "./Header";
import NewCarousel from "./NewCarousel";
import NewContent from "./NewContent";

type FeedCardProps = {
  feedData: FeedData;
} & ComponentProps<typeof Flex>;

export default function NewFeedCard({ feedData, ...restProps }: FeedCardProps) {
  const setFeedData = useSetRecoilState(feedAtom);
  useEffect(() => {
    setFeedData(feedData);
  }, [setFeedData, feedData]);

  return (
    <Flex pos="relative" direction="column" w="full" h="full" {...restProps}>
      <Header />
      <NewCarousel />
      <NewContent />
    </Flex>
  );
}
