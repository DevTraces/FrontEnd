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
      rounded="8px"
      p="8px"
      _hover={{
        background: "gray.100"
      }}
      overflow="hidden"
    >
      <ProfileAvatar size="40px" alt="프로필 이미지" src={profileImageUrl} />

      <Link href={`/user/${nickname}/posts`}>
        <VStack spacing="0" alignItems="start">
          <Text fontWeight="bold" noOfLines={1}>
            {nickname}
          </Text>
          <Text color="gray" noOfLines={1}>
            {username}
          </Text>
        </VStack>
      </Link>
    </HStack>
  );
}
