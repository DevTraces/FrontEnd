import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const posts = [
  {
    id: "fbq33",
    nickname: "PeterMeter",
    postContent:
      "집에 잘 들어가는 방법은 여러가지가 있는데 택시를 탈 수도, 버스를 탈 수도, 비행기를 탈 수도 있다."
  }
];
export default function Like() {
  return (
    <Flex direction="column" gap="10px">
      좋아요 목록
      <Flex direction="column" gap="20px">
        {posts.map(post => {
          return (
            <Flex
              key={post.id}
              alignItems="center"
              justifyContent="space-between"
              gap="5px"
              h="50px"
            >
              <>
                <Box boxSize={10} borderRadius="50%" bg="gray" />
                <Text
                  flex={1}
                  overflowWrap="break-word"
                  overflow="hidden"
                  h="100%"
                  fontSize="sm"
                >
                  {post.postContent}
                </Text>
                <Icon as={FontAwesomeIcon} icon={faHeart} color="red" />
              </>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
