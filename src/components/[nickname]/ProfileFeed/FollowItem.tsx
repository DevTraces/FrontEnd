import { Text, Avatar, VStack, HStack, Button, Circle } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type FollowItemData = {
  username: string;
  nickname: string;
  profileImageLink: string;
  isFollowing: boolean;
};

type FollowItemProps = FollowItemData & {
  isPending?: boolean;
};

export default function FollowItem({
  username,
  nickname,
  profileImageLink,
  isFollowing,
  isPending = false
}: FollowItemProps) {
  const [isCurrentFollowing, setIsCurrentFollowing] = useState(isFollowing);

  const follow = useMutation({
    mutationFn: () => {
      return fetch(`/api/follow/${nickname}`, {
        method: "POST"
      });
    },
    onSuccess: () => {
      setIsCurrentFollowing(true);
    }
  });

  const unfollow = useMutation({
    mutationFn: () => {
      return fetch(`/api/follow/${nickname}`, {
        method: "DELETE"
      });
    },
    onSuccess: () => {
      setIsCurrentFollowing(false);
    }
  });

  const handleFollowClick = () => {
    follow.mutate();
  };

  const handleUnfollowClick = () => {
    unfollow.mutate();
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
          <Circle size="50px" position="relative" overflow="hidden">
            <Image
              src={profileImageLink}
              alt="프로필 이미지"
              sizes="50px"
              fill
              style={{ objectFit: "cover" }}
            />
          </Circle>
        ) : (
          <Avatar boxSize={10} src={profileImageLink} />
        )}
        <VStack alignItems="flex-start">
          <Text fontWeight="bold">{username}</Text>
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
