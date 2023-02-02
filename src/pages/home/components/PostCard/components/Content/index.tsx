import { Flex, Icon, Text } from "@chakra-ui/react";
import { faHeart, faMessage, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Content({
  like,
  nickname,
  content,
  hashtag
}: {
  like: number;
  nickname: string;
  content: string;
  hashtag: any[];
}) {
  return (
    <Flex bg="white" direction="column" w="100%">
      <Flex gap={2} py={4}>
        <Icon as={FontAwesomeIcon} icon={faHeart} boxSize={6} />
        <Icon as={FontAwesomeIcon} icon={faMessage} boxSize={6} />
        <Icon as={FontAwesomeIcon} icon={faShare} boxSize={6} />
      </Flex>
      <Text>좋아요 {like}개</Text>
      <Flex overflowWrap="break-word">
        <Text fontWeight="bold">{nickname}</Text>
        <Text fontWeight="bold">{content}</Text>
        <Text fontWeight="bold">{hashtag}</Text>
      </Flex>
    </Flex>
  );
}
