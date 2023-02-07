import { Text, Avatar, VStack, HStack, Button, Circle } from "@chakra-ui/react";
import Image from "next/image";

export type UserItemProps = {
  userName: string;
  nickname: string;
  profileImageLink: string;
  isFollowing: boolean;
};

export default function UserItem({
  userName,
  nickname,
  profileImageLink,
  isFollowing
}: UserItemProps) {
  return (
    <HStack w="300px" justifyContent="space-between">
      {profileImageLink ? (
        <Circle size={10} position="relative" overflow="hidden">
          <Image
            src={profileImageLink}
            alt="프로필 이미지"
            fill
            style={{ objectFit: "cover" }}
          />
        </Circle>
      ) : (
        <Avatar boxSize={10} src={profileImageLink} />
      )}
      <VStack flex="1" alignItems="flex-start">
        <Text fontWeight="bold">{userName}</Text>
        <Text color="gray">@{nickname}</Text>
      </VStack>
      {isFollowing ? (
        <Button w="100px" colorScheme="blackAlpha" fontWeight="bold">
          팔로우 취소
        </Button>
      ) : (
        <Button w="100px" colorScheme="blue" fontWeight="bold">
          팔로우
        </Button>
      )}
    </HStack>
  );
}
