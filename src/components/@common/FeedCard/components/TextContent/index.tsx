import feedAtom from "@/atoms/feedAtom";
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const MAX_PREVIEW_LENGTH = 10;

export default function TextContent() {
  const { numberOfLike, authorNickname, hashtags, content, createdAt } =
    useRecoilValue(feedAtom);
  const [isMoreLoaded, setIsMoreLoaded] = useState(false);
  const contentPreview = content.slice(0, MAX_PREVIEW_LENGTH);
  const contentMore = content.slice(MAX_PREVIEW_LENGTH);

  useEffect(() => {
    if (content.length < MAX_PREVIEW_LENGTH) setIsMoreLoaded(true);
  }, [setIsMoreLoaded, content]);

  return (
    <Box px="12px" py="20px">
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
