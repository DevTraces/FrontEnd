import ProfileAvatar from "@/components/@common/ProfileAvatar";
import { UserSearchResultData } from "@/types/data/search";
import { HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

type UserItemProps = {
  userResult: UserSearchResultData;
};

export default function UserItem({
  userResult: { nickname, username, profileImageUrl }
}: UserItemProps) {
  return (
    <HStack
      w="100%"
      _hover={{
        background: "gray.100"
      }}
    >
      <ProfileAvatar size="40px" alt="프로필 이미지" src={profileImageUrl} />

      <Link href={`/user/${nickname}/posts`}>
        <VStack spacing="0" alignItems="start">
          <Text fontWeight="bold">{nickname}</Text>
          <Text color="gray">{username}</Text>
        </VStack>
      </Link>
    </HStack>
  );
}
