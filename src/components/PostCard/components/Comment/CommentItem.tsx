import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";

type CommentItemProps = {
  nickname: string;
  content: string;
};

export default function CommentItem({ nickname, content }: CommentItemProps) {
  return (
    <HStack alignItems="flex-start" spacing="10px">
      <Avatar boxSize="40px" />
      <VStack alignItems="flex-start">
        <Text mr={2} fontWeight="bold">
          {nickname}
        </Text>
        <Text textAlign="left">{content}</Text>
      </VStack>
    </HStack>
  );
}
