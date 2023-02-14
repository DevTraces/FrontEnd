import { ReplyData } from "@/api/feeds/[feedId]/replies/[replyId]/rereplies";
import { HStack, Avatar, VStack, Button, Text } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

type ReplyContentProps = Pick<ReplyData, "authorNickname" | "content"> & {
  onReplyClick: MouseEventHandler<HTMLButtonElement>;
};

export default function ReplyContent({
  authorNickname,
  content,
  onReplyClick
}: ReplyContentProps) {
  return (
    <HStack alignItems="flex-start">
      <Avatar boxSize="40px" />
      <VStack alignItems="flex-start">
        <Text mr={2} fontWeight="bold">
          {authorNickname}
        </Text>
        <HStack>
          <Text textAlign="left">{content}</Text>
          <Button onClick={onReplyClick}>답글 달기</Button>
        </HStack>
      </VStack>
    </HStack>
  );
}
