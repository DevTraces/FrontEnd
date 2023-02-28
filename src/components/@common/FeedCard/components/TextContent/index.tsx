import feedAtom from "@/atoms/feedAtom";
import getDateFormat from "@/utils/date";
import { Button, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import LikeUsersModal from "./LikeUsersModal";

const MAX_PREVIEW_LENGTH = 40;

export default function TextContent() {
  const { numberOfLike, authorNickname, hashtags, content, createdAt } =
    useRecoilValue(feedAtom);
  const [isMoreLoaded, setIsMoreLoaded] = useState(false);
  const contentPreview = content.slice(0, MAX_PREVIEW_LENGTH);
  const contentMore = content.slice(MAX_PREVIEW_LENGTH);

  const likeUsersDisclosure = useDisclosure();

  useEffect(() => {
    if (content.length < MAX_PREVIEW_LENGTH) setIsMoreLoaded(true);
  }, [setIsMoreLoaded, content]);

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
          <Text>
            {contentPreview}
            {isMoreLoaded && contentMore}
          </Text>

          {!isMoreLoaded && (
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
            {getDateFormat(createdAt)}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
