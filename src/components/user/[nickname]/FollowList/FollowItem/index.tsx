import useFollow from "@/hooks/useFollow";
import { FollowItemData } from "@/types/data/follow";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import currentUser from "@/utils/currentUser";
import Link from "next/link";
import ProfileAvatar from "../../../../@common/ProfileAvatar";

type FollowItemProps = {
  followItemData: FollowItemData;
};

export default function FollowItem({
  followItemData: { username, nickname, profileImageUrl, following }
}: FollowItemProps) {
  const isMyProfile = nickname === currentUser.getNickname();
  const { toggleMutation } = useFollow();
  const toggleFollow = (isFollowing: boolean) =>
    toggleMutation(isFollowing).mutate({ nickname });

  return (
    <HStack w="300px" justifyContent="space-between">
      <Link
        href={`/user/${nickname}/posts`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}
      >
        <ProfileAvatar src={profileImageUrl} size="50px" alt="프로필 이미지" />

        <VStack alignItems="flex-start">
          <Text fontWeight="bold">{username}</Text>
          <Text color="gray">@{nickname}</Text>
        </VStack>
      </Link>
      {!isMyProfile && (
        <Button
          size="md"
          fontSize="sm"
          variant={following ? "outline" : "solid"}
          colorScheme={following ? "red" : "blue"}
          fontWeight="bold"
          onClick={() => toggleFollow(following)}
        >
          {following ? "언팔로우" : "팔로우"}
        </Button>
      )}
    </HStack>
  );
}
