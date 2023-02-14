import { deleteBookmark, postBookmark } from "@/api/bookmark/[feedId]";
import { deleteLike, postLike } from "@/api/like/[feedId]";
import { PostData } from "@/types/data/post";
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
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import MAX_PREVIEW_LENGTH from "../../constants/posts";

type ContentProps = Omit<PostData, "imageUrls">;

export default function Content({
  feedId,
  authorNickname,
  numberOfLike,
  hashtags,
  content,
  createdAt,
  liked,
  saved
}: ContentProps) {
  const [isMoreLoaded, setIsMoreLoaded] = useState(false);
  const contentPreview = content.slice(0, MAX_PREVIEW_LENGTH);
  const contentMore = content.slice(MAX_PREVIEW_LENGTH);

  const toast = useToast();

  const like = useMutation({
    mutationFn: () => {
      if (liked) return deleteLike(feedId);
      return postLike(feedId);
    }
  });

  const bookmark = useMutation({
    mutationFn: () => {
      if (saved) return deleteBookmark(feedId);
      return postBookmark(feedId);
    },
    onSuccess: async () => {
      toast({
        title: saved ? "저장목록에서 삭제했어요." : "저장목록에 추가했어요.",
        status: "success",
        duration: 2000,
        isClosable: true
      });
    }
  });

  const handleShareClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/feed/${feedId}`);
    toast({
      title: "링크가 복사되었어요.",
      status: "success",
      duration: 1000
    });
  };

  const handleLikeClick = () => {
    like.mutate();
  };

  const handleBookmarkClick = () => {
    bookmark.mutate();
  };

  useEffect(() => {
    if (content.length < MAX_PREVIEW_LENGTH) setIsMoreLoaded(true);
  }, [setIsMoreLoaded, content]);

  return (
    <Flex direction="column" alignItems="flex-start" bg="white" gap="4px">
      <Flex gap={4} justifyContent="space-between">
        <HStack spacing="15px">
          <Icon
            as={FontAwesomeIcon}
            icon={liked ? faHeartFilled : faHeartBlank}
            color={liked ? "red" : "black"}
            boxSize={6}
            onClick={handleLikeClick}
            cursor="pointer"
          />
          <Icon
            as={FontAwesomeIcon}
            icon={faComment}
            boxSize={6}
            cursor="pointer"
          />
          <Icon
            as={FontAwesomeIcon}
            icon={faLink}
            boxSize={6}
            onClick={handleShareClick}
            cursor="pointer"
          />
        </HStack>
        <Icon
          as={FontAwesomeIcon}
          icon={saved ? faBookmarkFilled : faBookmarkBlank}
          color={saved ? "primary" : "black"}
          boxSize={6}
          cursor="pointer"
          onClick={handleBookmarkClick}
        />
      </Flex>
      <Text fontWeight="bold">좋아요 {numberOfLike}개</Text>
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
          {createdAt.toLocaleString()}
        </Text>
      </Flex>
    </Flex>
  );
}