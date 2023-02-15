import CircledImage from "@/components/user/[nickname]/CircledImage";
import { LikeNotice } from "@/types/data/notice";
import { Text, Avatar, HStack, Box } from "@chakra-ui/react";
import Link from "next/link";
import getDateFormat from "../../utils/date";
import SquaredImage from "../SquaredImage";

export default function Like({
  nickname,
  likeProfileImageUrl,
  feedId,
  createdAt,
  feedFirstImageUrl
}: LikeNotice) {
  return (
    <Link href={`/post/${feedId}`} style={{ width: "100%" }}>
      <HStack w="full" h="50px" cursor="pointer">
        {likeProfileImageUrl ? (
          <CircledImage
            src={likeProfileImageUrl}
            size="10"
            alt="프로필 이미지"
          />
        ) : (
          <Avatar boxSize={10} />
        )}
        <Box>
          <b>{nickname}</b>님이 당신의 게시글을 좋아합니다.
          <Text as="span" ml="5px" color="gray">
            {getDateFormat(createdAt)}
          </Text>
        </Box>
        <SquaredImage src={feedFirstImageUrl} size="10" alt="프로필 이미지" />
      </HStack>
    </Link>
  );
}
