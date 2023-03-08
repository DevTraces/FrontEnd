import useFollow from "@/hooks/useFollow";
import { ProfileData } from "@/types/data/user";
import currentUser from "@/utils/currentUser";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ProfileAvatar from "../../../@common/ProfileAvatar";

type ProfileProps = {
  profileData: ProfileData;
} & React.ComponentProps<typeof VStack>;

export default function ProfileInfo({
  profileData: {
    nickname,
    username,
    description,
    totalFeedNumber,
    followerNumber,
    followingNumber,
    profileImageUrl,
    isFollowing
  },
  ...restProps
}: ProfileProps) {
  const router = useRouter();
  const isMyProfile = nickname === currentUser.getNickname();

  const { toggleMutation } = useFollow();
  const toggleFollow = () => toggleMutation(isFollowing).mutate({ nickname });

  return (
    <VStack
      gap="20px"
      {...restProps}
      alignItems="flex-start"
      w={{
        base: 300,
        sm: 400
      }}
    >
      <HStack gap="20px" w="full">
        <ProfileAvatar src={profileImageUrl} size="80px" alt="프로필 이미지" />

        <Box w="full">
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" fontSize="xl">
              {username}
            </Text>
            {!isMyProfile && (
              <Button
                colorScheme={isFollowing ? "green" : "blue"}
                fontWeight="bold"
                onClick={toggleFollow}
                size="sm"
              >
                {isFollowing ? "팔로잉" : "팔로우"}
              </Button>
            )}

            {isMyProfile && (
              <Flex
                gap={{
                  base: "6px",
                  sm: "10px"
                }}
              >
                <Button
                  bg="gray.200"
                  colorScheme="gray"
                  fontWeight="bold"
                  size="sm"
                  onClick={() => {
                    router.push(`/accounts/edit`);
                  }}
                >
                  프로필 편집
                </Button>
              </Flex>
            )}
          </HStack>
          <Text fontSize="md" color="gray.500">
            @{nickname}
          </Text>
        </Box>
      </HStack>
      <Text fontSize="md" pl="16px" w="full">
        {description}
      </Text>
      <HStack justifyContent="space-between" w="full" p="10px">
        {[
          ["게시물", "posts", totalFeedNumber],
          ["팔로잉", "following", followingNumber],
          ["팔로워", "follower", followerNumber]
        ].map(([title, tabLink, count]) => (
          <VStack
            key={tabLink}
            spacing="0"
            w="50px"
            onClick={() => {
              router.push(`/user/${nickname}/${tabLink}`);
            }}
            cursor="pointer"
          >
            <Text>{title}</Text>
            <Text fontWeight="bold">{count}</Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}
