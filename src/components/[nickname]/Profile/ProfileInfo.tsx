import {
  Avatar,
  VStack,
  Button,
  Box,
  Text,
  HStack,
  Circle
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

type ProfileProps = {
  nickname: string;
  userName: string;
  description: string;
  totalFeedNumber: number;
  followerNumber: number;
  followingNumber: number;
  profileImageLink: string;
} & React.ComponentProps<typeof VStack>;

export default function ProfileInfo({
  nickname,
  userName,
  description,
  totalFeedNumber,
  followerNumber,
  followingNumber,
  profileImageLink,
  ...restProps
}: ProfileProps) {
  const isMyProfile = nickname === "choonsik";

  return (
    <VStack gap="20px" m="auto" {...restProps}>
      <HStack gap="20px">
        {profileImageLink ? (
          <Circle size="80px" position="relative" overflow="hidden">
            <Image
              alt="프로필 이미지"
              sizes="80px"
              fill
              src={profileImageLink}
              style={{ objectFit: "cover" }}
            />
          </Circle>
        ) : (
          <Avatar boxSize="80px" />
        )}
        <Box>
          <HStack h="50px">
            <Text fontWeight="bold" fontSize="xl">
              {userName}
            </Text>
            {isMyProfile && (
              <Link href="/accounts/edit">
                <Button
                  bg="gray.200"
                  colorScheme="gray"
                  fontWeight="bold"
                  size="sm"
                >
                  프로필 편집
                </Button>
              </Link>
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
