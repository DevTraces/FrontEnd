import CircledImage from "@/components/@common/CircledImage";
import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

type UserItemProps = {
  nickname: string;
  username: string;
  profileImageUrl: string;
};

export default function UserItem({
  nickname,
  username,
  profileImageUrl
}: UserItemProps) {
  return (
    <HStack
      w="100%"
      _hover={{
        background: "gray.100"
      }}
    >
      {profileImageUrl ? (
        <CircledImage size="10" alt="프로필 이미지" src={profileImageUrl} />
      ) : (
        <Avatar size="10" />
      )}
      <Link href={`/user/${nickname}/posts`}>
        <VStack spacing="0" alignItems="start">
          <Text fontWeight="bold">{nickname}</Text>
          <Text color="gray">{username}</Text>
        </VStack>
      </Link>
    </HStack>
  );
}
