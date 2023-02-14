import CircledImage from "@/components/[nickname]/CircledImage";
import { FollowNotice } from "@/types/data/notice";
import {
  Flex,
  Text,
  Avatar,
  HStack,
  ButtonGroup,
  Button
} from "@chakra-ui/react";
import Link from "next/link";

export default function Follow({ nickname, imageUrl }: FollowNotice) {
  return (
    <HStack w="full" h="50px" cursor="pointer">
      <Link
        href={`/${nickname}`}
        style={{
          display: "flex",
          width: "100%",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {imageUrl ? (
          <CircledImage src={imageUrl} size="10" alt="프로필 이미지" />
        ) : (
          <Avatar boxSize={10} />
        )}
        <Flex direction="column" flex={1}>
          <Text fontWeight="bold">팔로우 요청</Text>
          <Text color="gray">{nickname}</Text>
        </Flex>
      </Link>
      <ButtonGroup>
        <Button colorScheme="blue">확인</Button>
        <Button>삭제</Button>
      </ButtonGroup>
    </HStack>
  );
}
