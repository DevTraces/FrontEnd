import { Text, Avatar, VStack, HStack, Button } from "@chakra-ui/react";

type UserItemProps = {
  username: string;
  nickname: string;
  isFollowing: boolean;
};

export default function UserItem({
  username,
  nickname,
  isFollowing
}: UserItemProps) {
  return (
    <HStack w="300px" justifyContent="space-between">
      <Avatar boxSize={10} />
      <VStack flex="1" alignItems="flex-start">
        <Text fontWeight="bold">{username}</Text>
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
