import { Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import {
  faBookmark,
  faHeart,
  faMessage,
  faShare
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
  const [isMoreLoaded, setIsMoreLoaded] = useState(false);
  const contentPreview = content.slice(0, MAX_PREVIEW_LENGTH);
  const contentMore = content.slice(MAX_PREVIEW_LENGTH);

  useEffect(() => {
    if (content.length < MAX_PREVIEW_LENGTH) setIsMoreLoaded(true);
  }, [setIsMoreLoaded, content]);

  return (
    <Flex direction="column" bg="white" w="100%" gap="4px">
      <Flex gap={4} justifyContent="space-between">
        <HStack spacing="15px">
          <Icon as={FontAwesomeIcon} icon={faHeart} boxSize={6} />
          <Icon as={FontAwesomeIcon} icon={faMessage} boxSize={6} />
          <Icon as={FontAwesomeIcon} icon={faShare} boxSize={6} />
        </HStack>
        <Icon as={FontAwesomeIcon} icon={faBookmark} boxSize={6} />
      </Flex>
      <Text fontWeight="bold">좋아요 {like}개</Text>
      <Flex direction="column" gap="10px">
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
