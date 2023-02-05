import { Flex, Avatar, VStack, Button, Box, Text } from "@chakra-ui/react";
import Link from "next/link";

type ProfileProps = {
  nickname: string;
  username: string;
  imgURL: string;
  postCount: number;
  followingCount: number;
  followerCount: number;
};

export default function ProfileInfo({
  nickname,
  username,
  postCount,
  imgURL,
  followingCount,
  followerCount
}: ProfileProps) {
  return (
    <Flex direction="column" pt="100px" w="max-content" pb="40px" m="auto">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb="20px"
        gap="20px"
      >
        <Avatar boxSize="80px" src={imgURL} />
        <Flex direction="row" gap="20px">
          <VStack>
            <Text fontWeight="bold">{postCount}</Text>
            <Text>게시물</Text>
          </VStack>
          <VStack>
            <Text fontWeight="bold">{followingCount}</Text>
            <Text>팔로잉</Text>
          </VStack>
          <VStack>
            <Text fontWeight="bold">{followerCount}</Text>
            <Text>팔로워</Text>
          </VStack>
        </Flex>
      </Flex>
      <Flex
        pb="20px"
        gap="40px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text fontWeight="bold" w="full" fontSize="xl">
            {username}
          </Text>
          <Text fontSize="md" pr="8px" color="gray.700" w="full">
            @{nickname}
          </Text>
        </Box>
        <Box ml="40px">
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
        </Box>
      </Flex>
    </Flex>
  );
}
