import { Button, Flex, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import {
  faBookmark as faBookmarkBlank,
  faComment,
  faHeart as faHeartBlank
} from "@fortawesome/free-regular-svg-icons";
import {
  faBookmark as faBookmarkFilled,
  faHeart as faHeartFilled,
  faLink
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import MAX_PREVIEW_LENGTH from "../../constants/posts";

export default function Content({
  like,
  nickname,
  content,
  hashtag,
  date
}: {
  like: number;
  nickname: string;
  content: string;
  hashtag: any[];
  date: string;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMoreLoaded, setIsMoreLoaded] = useState(false);
  const contentPreview = content.slice(0, MAX_PREVIEW_LENGTH);
  const contentMore = content.slice(MAX_PREVIEW_LENGTH);

  const toast = useToast();

  useEffect(() => {
    if (content.length < MAX_PREVIEW_LENGTH) setIsMoreLoaded(true);
  }, [setIsMoreLoaded, content]);

  return (
    <Flex direction="column" alignItems="flex-start" bg="white" gap="4px">
      <Flex gap={4} justifyContent="space-between">
        <HStack spacing="15px">
          <Icon
            as={FontAwesomeIcon}
            icon={isLiked ? faHeartFilled : faHeartBlank}
            color={isLiked ? "red" : "black"}
            boxSize={6}
            onClick={() => setIsLiked(prev => !prev)}
            cursor="pointer"
          />
          <Icon
            cursor="pointer"
            as={FontAwesomeIcon}
            icon={faComment}
            boxSize={6}
          />
          <Icon
            cursor="pointer"
            as={FontAwesomeIcon}
            icon={faLink}
            boxSize={6}
            onClick={() => {
              navigator.clipboard.writeText("주소/post/1");
              toast({
                title: "링크가 복사되었어요.",
                status: "success",
                duration: 1000
              });
            }}
          />
        </HStack>
        <Icon
          as={FontAwesomeIcon}
          icon={isSaved ? faBookmarkFilled : faBookmarkBlank}
          color={isSaved ? "primary" : "black"}
          boxSize={6}
          cursor="pointer"
          onClick={() => {
            setIsSaved(prev => !prev);
            toast({
              title: isSaved
                ? "저장 목록에서 삭제했어요."
                : "저장 목록에 추가했어요.",
              status: "success",
              duration: 1000
            });
          }}
        />
      </Flex>
      <Text fontWeight="bold">좋아요 {like}개</Text>
      <Flex direction="column" alignItems="flex-start" w="full">
        <Text fontWeight="bold">{nickname}</Text>
        <HStack>
          {hashtag.map(tag => (
            <Link href={`/explore/tags/${tag}`} key={tag}>
              <Text color="blue.700">#{tag}</Text>
            </Link>
          ))}
        </HStack>
        <Text>{contentPreview}</Text>

        {isMoreLoaded ? (
          <Text>{contentMore}</Text>
        ) : (
          <Text
            as={Button}
            width="full"
            color="blue.700"
            onClick={() => setIsMoreLoaded(!isMoreLoaded)}
          >
            더보기
          </Text>
        )}
        <Text fontSize="12px" color="gray">
          {date}
        </Text>
      </Flex>
    </Flex>
  );
}
