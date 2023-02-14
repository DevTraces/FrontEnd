import { Avatar, Card, Flex, Text } from "@chakra-ui/react";
import { ComponentProps, useState } from "react";
import { PostCardData } from "@/types/data/feed";
import Carousel from "./components/Carousel";
import ReplyList from "./components/ReplyList";
import TextContent from "./components/TextContent";
import Toolbar from "./components/Toolbar";

type PostCardProps = PostCardData & ComponentProps<typeof Card>;

export default function PostCard({
  feedId,
  authorNickname,
  authorProfileImageUrl,
  imageUrls,
  numberOfLike,
  hashtags,
  content,
  createdAt,
  liked,
  saved,
  ...restProps
}: PostCardProps) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  return (
    <Flex
      direction="column"
      bg="white"
      rounded="12px"
      w="450px"
      zIndex="base"
      {...restProps}
    >
      <Flex alignItems="center" gap={4} px="12px" py="20px">
        <Avatar boxSize={10} />
        <Text fontWeight="bold">{authorNickname}</Text>
      </Flex>
      <Carousel imgs={imageUrls} boxSize={450} />
      <TextContent
        content={content}
        authorNickname={authorNickname}
        numberOfLike={numberOfLike}
        hashtags={hashtags}
        createdAt={createdAt}
      />
      <Toolbar
        feedId={feedId}
        liked={liked}
        saved={saved}
        setIsReplyOpen={setIsReplyOpen}
      />
      {isReplyOpen && <ReplyList feedId={feedId} />}
    </Flex>
  );
}
