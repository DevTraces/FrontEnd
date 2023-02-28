import useAuth from "@/hooks/useAuth";
import useFollow from "@/hooks/useFollow";
import { ProfileData } from "@/types/data/user";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import currentUser from "@/utils/currentUser";
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

  const { signOutMutation } = useAuth();
  const signOut = () =>
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/");
      }
    });

  const { toggleMutation } = useFollow();
  const toggleFollow = () => toggleMutation(isFollowing).mutate({ nickname });

  return (
    <VStack gap="20px" {...restProps}>
      <HStack gap="20px">
        <ProfileAvatar src={profileImageUrl} size="80px" alt="프로필 이미지" />

        <Box>
          <HStack h="50px">
            <Text fontWeight="bold" fontSize="xl">
              {username}
            </Text>
            {!isMyProfile && (
              <Button
                variant="outline"
                colorScheme="purple"
                fontWeight="bold"
                size="sm"
                onClick={toggleFollow}
              >
                {isFollowing ? "팔로우 취소" : "팔로우"}
              </Button>
            )}

            {isMyProfile && (
              <>
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
                <Button
                  bg="red.400"
                  colorScheme="red"
                  fontWeight="bold"
                  color="white"
                  size="sm"
                  onClick={signOut}
                >
                  로그아웃
                </Button>
              </>
            )}
          </HStack>
          <Text fontSize="md" color="gray.500" mb="10px">
            @{nickname}
          </Text>
          <Text fontSize="md">{description}</Text>
        </Box>
      </HStack>
      <HStack justifyContent="space-between" w="450px" p="30px">
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
