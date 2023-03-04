import useFollow from "@/hooks/useFollow";
import { FollowItemData } from "@/types/data/follow";
import currentUser from "@/utils/currentUser";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ProfileAvatar from "../../../../@common/ProfileAvatar";

type FollowItemProps = {
  followItemData: FollowItemData;
};

export default function FollowItem({
  followItemData: { username, nickname, profileImageUrl, following }
}: FollowItemProps) {
  const router = useRouter();
  const isMyProfile = nickname === currentUser.getNickname();
  const { toggleMutation } = useFollow();
  const toggleFollow = (isFollowing: boolean) =>
    toggleMutation(isFollowing).mutate({ nickname });

  return (
    <Flex maxW="400px" gap="20px">
      <Flex
        onClick={() => {
          router.push(`/user/${nickname}/posts`);
        }}
        cursor="pointer"
        gap="16px"
      >
        <ProfileAvatar src={profileImageUrl} size="50px" alt="프로필 이미지" />
        <Box w="200px">
          <Text fontWeight="bold" noOfLines={1} textAlign="left">
            {username}
          </Text>
          <Text color="gray" noOfLines={1} textAlign="left">
            @{nickname}
          </Text>
        </Box>
      </Flex>

      <Button
        fontSize="sm"
        display={isMyProfile ? "none" : "block"}
        variant={following ? "outline" : "solid"}
        colorScheme={following ? "red" : "blue"}
        fontWeight="bold"
        onClick={() => toggleFollow(following)}
      >
        {following ? "언팔로우" : "팔로우"}
      </Button>
    </Flex>
  );
}
