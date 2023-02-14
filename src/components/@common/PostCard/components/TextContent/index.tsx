import { PostCardData } from "@/types/data/feed";
import { Button, Flex, HStack, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import { ComponentProps, useEffect, useState } from "react";

type TextContentProps = Pick<
  PostCardData,
  "numberOfLike" | "authorNickname" | "hashtags" | "createdAt" | "content"
> &
  ComponentProps<typeof Box>;

const MAX_PREVIEW_LENGTH = 10;

export default function TextContent({
  numberOfLike,
  authorNickname,
  hashtags,
  content,
  createdAt,
  ...restProps
}: TextContentProps) {
  const [isMoreLoaded, setIsMoreLoaded] = useState(false);
  const contentPreview = content.slice(0, MAX_PREVIEW_LENGTH);
  const contentMore = content.slice(MAX_PREVIEW_LENGTH);

  useEffect(() => {
    if (content.length < MAX_PREVIEW_LENGTH) setIsMoreLoaded(true);
  }, [setIsMoreLoaded, content]);

  return (
    <Box px="12px" {...restProps} py="20px">
      <Text fontWeight="bold" textAlign="left">
        좋아요 {numberOfLike}개
      </Text>
      <Flex direction="column" alignItems="flex-start" w="full">
        <Text fontWeight="bold">{authorNickname}</Text>
        <HStack>
          {hashtags.map(tag => (
            <Link href={`/explore/tags/${tag}`} key={tag}>
              <Text color="blue.700">#{tag}</Text>
            </Link>
          ))}
        </HStack>
        <Text>{contentPreview}</Text>

        {isMoreLoaded ? (
          <Text>{contentMore}</Text>
        ) : (
          <Button
            as={Button}
            width="full"
            color="blue.700"
            onClick={() => setIsMoreLoaded(!isMoreLoaded)}
          >
            더보기
          </Button>
        )}
        <Text fontSize="12px" color="gray">
          {createdAt.toLocaleString()}
        </Text>
      </Flex>
    </Box>
  );
}
