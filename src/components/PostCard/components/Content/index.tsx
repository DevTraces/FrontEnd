import { Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { faHeart, faMessage, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <Flex bg="white" direction="column" w="100%" gap="4px">
      <Flex gap={4}>
        <Icon as={FontAwesomeIcon} icon={faHeart} boxSize={6} />
        <Icon as={FontAwesomeIcon} icon={faMessage} boxSize={6} />
        <Icon as={FontAwesomeIcon} icon={faShare} boxSize={6} />
      </Flex>
      <Text fontWeight="bold">좋아요 {like}개</Text>
      <Flex direction="column" gap="10px">
        <Text fontWeight="bold">{nickname}</Text>
        <HStack>
          {hashtag.map(tag => (
            <Link href={`/search/tag/${tag}`} key={tag}>
              <Text color="blue.700">#{tag}</Text>
            </Link>
          ))}
        </HStack>
        {isMoreLoaded ? (
          <Text>{content}</Text>
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
