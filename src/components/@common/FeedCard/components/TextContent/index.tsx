import feedAtom from "@/atoms/feedAtom";
import getDateFormat from "@/utils/date";
import { Box, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import LikeUsersModal from "./LikeUsersModal";

const MAX_PREVIEW_LENGTH = 100;

type TextContentProps = {
  setIsReplyOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TextContent({ setIsReplyOpen }: TextContentProps) {
  const {
    numberOfLike,
    numberOfReply,
    authorNickname,
    hashtags,
    content,
    createdAt
  } = useRecoilValue(feedAtom);
  const [isMoreLoaded, setIsMoreLoaded] = useState(
    content?.length < MAX_PREVIEW_LENGTH ?? false
  );

  const likeUsersDisclosure = useDisclosure();

  const handleReplyClick = () => {
    setIsReplyOpen(true);
  };

  return (
    <>
      {likeUsersDisclosure.isOpen && (
        <LikeUsersModal disclosure={likeUsersDisclosure} />
      )}
      <Flex px="12px" pt="20px" direction="column" gap="12px" w="full">
        <Flex direction="column" alignItems="flex-start" w="full" gap="8px">
          <Text fontWeight="bold">{authorNickname}</Text>
          <Text fontSize="12px" color="gray">
            {getDateFormat(createdAt)}
          </Text>

          <HStack>
            {hashtags?.map(tag => (
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

          <Flex
            gap="10px"
            color="gray.600"
            justifyContent="space-between"
            fontSize="15px"
            borderTop="1px"
            borderColor="gray.300"
            w="full"
            py="5px"
          >
            <Text
              as="span"
              onClick={likeUsersDisclosure.onOpen}
              _hover={{ textDecoration: "underline" }}
              cursor="pointer"
            >
              좋아요 {numberOfLike}개
            </Text>
            {numberOfReply > 0 && (
              <Text
                as="span"
                onClick={handleReplyClick}
                _hover={{ textDecoration: "underline" }}
                cursor="pointer"
              >
                댓글 {numberOfReply}개
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
