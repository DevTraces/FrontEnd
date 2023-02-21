import userAtom from "@/atoms/userAtom";
import useAuth from "@/hooks/useAuth";
import { ProfileData } from "@/types/data/user";
import { Avatar, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import CircledImage from "../../../@common/CircledImage";

type ProfileProps = ProfileData & React.ComponentProps<typeof VStack>;

export default function ProfileInfo({
  nickname,
  username,
  description,
  totalFeedNumber,
  followerNumber,
  followingNumber,
  profileImageUrl,
  ...restProps
}: ProfileProps) {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const isMyProfile = nickname === user.nickname;

  const { signOut } = useAuth({
    onSignOut: () => {
      router.push("/");
    }
  });
  return (
    <VStack gap="20px" {...restProps}>
      <HStack gap="20px">
        {profileImageUrl ? (
          <CircledImage src={profileImageUrl} size="80px" alt="프로필 이미지" />
        ) : (
          <Avatar boxSize="80px" />
        )}
        <Box>
          <HStack h="50px">
            <Text fontWeight="bold" fontSize="xl">
              {username}
            </Text>
            {isMyProfile && (
              <>
                <Button
                  bg="gray.200"
                  colorScheme="gray"
                  fontWeight="bold"
                  size="sm"
                  onClick={() => {
                    router.push(`/accounts/edit?nickname=${nickname}`);
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
        <VStack spacing="0" w="50px">
          <Text>게시물</Text>
          <Text fontWeight="bold">{totalFeedNumber}</Text>
        </VStack>
        <VStack spacing="0" w="50px">
          <Text>팔로잉</Text>
          <Text fontWeight="bold">{followingNumber}</Text>
        </VStack>
        <VStack spacing="0" w="50px">
          <Text>팔로워</Text>
          <Text fontWeight="bold">{followerNumber}</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
