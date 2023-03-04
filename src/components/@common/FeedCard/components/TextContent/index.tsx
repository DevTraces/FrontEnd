import feedAtom from "@/atoms/feedAtom";
import getDateFormat from "@/utils/date";
import { Box, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import LikeUsersModal from "./LikeUsersModal";

const MAX_PREVIEW_LENGTH = 100;

export default function TextContent() {
  const { numberOfLike, authorNickname, hashtags, content, createdAt } =
    useRecoilValue(feedAtom);
  const [isMoreLoaded, setIsMoreLoaded] = useState(
    content?.length < MAX_PREVIEW_LENGTH ?? false
  );

  const likeUsersDisclosure = useDisclosure();

  return (
    <>
      {likeUsersDisclosure.isOpen && (
        <LikeUsersModal disclosure={likeUsersDisclosure} />
      )}
      <Flex px="12px" py="20px" direction="column" gap="12px" w="full">
        <Text
          fontWeight="bold"
          textAlign="left"
          onClick={likeUsersDisclosure.onOpen}
          cursor="pointer"
        >
          좋아요 {numberOfLike}개
        </Text>
        <Flex direction="column" alignItems="flex-start" w="full" gap="8px">
          <Text fontWeight="bold">{authorNickname}</Text>
          <HStack>
            {hashtags.map(tag => (
              <Link href={`/explore/tags/${tag}`} key={tag}>
                <Text color="blue.700">#{tag}</Text>
              </Link>
            ))}
          </HStack>

          <Box w="full" wordBreak="keep-all" textAlign="left">
            <Text display="inline">
              {content?.slice(0, MAX_PREVIEW_LENGTH)}
            </Text>
            <Text
              display="inline"
              color={isMoreLoaded ? "inherit" : "gray"}
              onClick={() => setIsMoreLoaded(true)}
              cursor="pointer"
            >
              {isMoreLoaded ? content?.slice(MAX_PREVIEW_LENGTH) : "... 더보기"}
            </Text>
          </Box>

          <Text fontSize="12px" color="gray">
            {getDateFormat(createdAt)}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
