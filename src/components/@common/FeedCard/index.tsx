import feedAtom from "@/atoms/feedAtom";
import { FeedData } from "@/types/data/feed";
import { Flex } from "@chakra-ui/react";
import { ComponentProps, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import Carousel from "./components/Carousel";
import ReplyList from "./components/ReplyList";
import TextContent from "./components/TextContent";
import Toolbar from "./components/Toolbar";

type FeedCardProps = {
  feedData: FeedData;
} & ComponentProps<typeof Flex>;

export default function FeedCard({ feedData, ...restProps }: FeedCardProps) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const setFeed = useSetRecoilState(feedAtom);

  useEffect(() => {
    setFeed(feedData);
  }, [feedData, setFeed]);

  return (
    <Flex
      overflow="hidden"
      direction="column"
      bg="white"
      rounded="12px"
      w={{
        base: 300,
        sm: 400,
        md: 500,
        lg: 600,
        xl: 700
      }}
      {...restProps}
    >
      <Carousel />
      <TextContent setIsReplyOpen={setIsReplyOpen} />

      <Toolbar setIsReplyOpen={setIsReplyOpen} />
      {isReplyOpen && <ReplyList />}
    </Flex>
  );
}
