import { Text, Avatar, VStack, HStack, Button, Circle } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type FollowItemProps = {
  userName: string;
  nickname: string;
  profileImageLink: string;
  isFollowing: boolean;
  isPending?: boolean;
};

export default function FollowItem({
  userName,
  nickname,
  profileImageLink,
  isFollowing,
  isPending = false
}: FollowItemProps) {
  const [isCurrentFollowing, setIsCurrentFollowing] = useState(isFollowing);

  const handleFollowClick = async () => {
    const res = await fetch(`/api/follow/${nickname}`, {
      method: "POST"
    });
    if (res.status === 200) setIsCurrentFollowing(true);
  };

  const handleUnfollowClick = async () => {
    const res = await fetch(`/api/follow/${nickname}`, {
      method: "DELETE"
    });
    if (res.status === 200) setIsCurrentFollowing(false);
  };

  return (
    <HStack w="300px" justifyContent="space-between">
      <Link
        href={`/${nickname}/posts`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}
      >
        {profileImageLink ? (
          <Circle size={10} position="relative" overflow="hidden">
            <Image
              src={profileImageLink}
              alt="프로필 이미지"
              fill
              style={{ objectFit: "cover" }}
            />
          </Circle>
        ) : (
          <Avatar boxSize={10} src={profileImageLink} />
        )}
        <VStack alignItems="flex-start">
          <Text fontWeight="bold">{userName}</Text>
          <Text color="gray">@{nickname}</Text>
        </VStack>
      </Link>
      {isCurrentFollowing ? (
        <Button
          w="100px"
          colorScheme="blackAlpha"
          fontWeight="bold"
          onClick={handleUnfollowClick}
        >
          팔로잉
        </Button>
      ) : (
        <Button
          w="100px"
          colorScheme="blue"
          fontWeight="bold"
          onClick={handleFollowClick}
        >
          {isPending ? "수락" : "팔로우"}
        </Button>
      )}
    </HStack>
  );
}
