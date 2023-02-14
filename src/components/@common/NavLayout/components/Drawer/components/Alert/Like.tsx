import CircledImage from "@/components/[nickname]/CircledImage";
import { LikeNotice } from "@/types/data/notice";
import { Flex, Icon, Text, Avatar, HStack } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Like({ nickname, imageUrl, feedId }: LikeNotice) {
  return (
    <Link href={`post/${feedId}`} style={{ width: "100%" }}>
      <HStack w="full" h="50px" cursor="pointer">
        {imageUrl ? (
          <CircledImage src={imageUrl} size="10" alt="프로필 이미지" />
        ) : (
          <Avatar boxSize={10} />
        )}
        <Flex direction="column" flex={1}>
          <Text fontWeight="bold">좋아요 알림</Text>
          <Text color="gray">@{nickname}</Text>
        </Flex>
        <Icon as={FontAwesomeIcon} icon={faChevronRight} color="gray.400" />
      </HStack>
    </Link>
  );
}
