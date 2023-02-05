import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";

export type CommentItemProps = {
  nickname: string;
  content: string;
};

export default function CommentItem({ nickname, content }: CommentItemProps) {
  return (
    <HStack alignItems="flex-start" spacing="10px">
      <Avatar boxSize="40px" />
      <Flex direction="column">
        <Text mr={2} fontWeight="bold">
          {nickname}
        </Text>
        <Text>{content}</Text>
      </Flex>
    </HStack>
  );
}
