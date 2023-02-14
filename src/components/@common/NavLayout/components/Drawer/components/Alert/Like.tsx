import CircledImage from "@/components/[nickname]/CircledImage";
import { LikeNotice } from "@/types/data/notice";
import { Flex, Icon, Text, Avatar, HStack } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import getDateFormat from "../../utils/date";

export default function Like({
  nickname,
  imageUrl,
  feedId,
  createdAt
}: LikeNotice) {
  return (
    <Link href={`/post/${feedId}`} style={{ width: "100%" }}>
      <HStack w="full" h="50px" cursor="pointer">
        {imageUrl ? (
          <CircledImage src={imageUrl} size="10" alt="프로필 이미지" />
        ) : (
          <Avatar boxSize={10} />
        )}
        <Flex direction="column" flex={1}>
          <Text>
            <b>{nickname}</b>님이 당신의 게시글을 좋아합니다.
          </Text>
          <Text color="gray">{getDateFormat(createdAt)}</Text>
        </Flex>
        <Icon as={FontAwesomeIcon} icon={faChevronRight} color="gray.400" />
      </HStack>
    </Link>
  );
}
