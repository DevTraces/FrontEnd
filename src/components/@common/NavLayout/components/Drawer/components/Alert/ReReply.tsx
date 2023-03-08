import ProfileAvatar from "@/components/@common/ProfileAvatar";
import { ReReplyNotice } from "@/types/data/notice";
import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import getDateFormat from "../../../../../../../utils/date";
import SquaredImage from "../SquaredImage";

export default function ReReply({
  senderNickname,
  senderProfileImageUrl,
  feedId,
  rereplyContent,
  feedFirstImageUrl,
  noticeTarget,
  createdAt
}: ReReplyNotice) {
  return (
    <Link href={`/post/${feedId}`} style={{ width: "100%" }}>
      <HStack w="full" cursor="pointer">
        <ProfileAvatar
          src={senderProfileImageUrl}
          size="40px"
          alt="프로필 이미지"
        />

        <Box>
          <b>{senderNickname}</b>님이 당신의{" "}
          {noticeTarget === "post" ? "게시글" : "댓글"}에 댓글을 남겼습니다:
          &quot;
          {rereplyContent}&quot;
          <Text as="span" ml="5px" color="gray">
            {getDateFormat(createdAt)}
          </Text>
        </Box>
        <SquaredImage src={feedFirstImageUrl} size="10" alt="프로필 이미지" />
      </HStack>
    </Link>
  );
}
