import CircledImage from "@/components/user/[nickname]/CircledImage";
import { ReplyNotice } from "@/types/data/notice";
import { Text, Avatar, HStack, Box } from "@chakra-ui/react";
import Link from "next/link";
import getDateFormat from "../../utils/date";
import SquaredImage from "../SquaredImage";

export default function Reply({
  nickname,
  replierProfileImageUrl,
  feedId,
  feedFirstImageUrl,
  content,
  createdAt
}: ReplyNotice) {
  return (
    <Link href={`/post/${feedId}`} style={{ width: "100%" }}>
      <HStack w="full" h="50px" cursor="pointer">
        {replierProfileImageUrl ? (
          <CircledImage
            src={replierProfileImageUrl}
            size="10"
            alt="프로필 이미지"
          />
        ) : (
          <Avatar boxSize={10} />
        )}
        <Box>
          <b>{nickname}</b>님이 당신의 게시글에 댓글을 남겼습니다: &quot;
          {content}&quot;
          <Text as="span" ml="5px" color="gray">
            {getDateFormat(createdAt)}
          </Text>
        </Box>
        <SquaredImage src={feedFirstImageUrl} size="10" alt="프로필 이미지" />
      </HStack>
    </Link>
  );
}
