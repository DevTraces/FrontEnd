import { FollowItemData } from "@/api/follows/following/[nickname]";
import { deleteFollow, postFollow } from "@/api/follows/[nickname]";
import { Text, Avatar, VStack, HStack, Button } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import CircledImage from "../CircledImage";

type FollowItemProps = FollowItemData & {
  isPending?: boolean;
};

export default function FollowItem({
  username,
  nickname,
  profileImageUrl,
  isFollowing,
  isPending = false
}: FollowItemProps) {
  const [isCurrentFollowing, setIsCurrentFollowing] = useState(isFollowing);

  const queryClient = useQueryClient();

  const follow = useMutation({
    mutationFn: () => {
      return postFollow(nickname);
    },
    onMutate: () => {
      setIsCurrentFollowing(true);
    },
    onError: () => {
      setIsCurrentFollowing(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["following", nickname]
      });
    }
  });

  const unfollow = useMutation({
    mutationFn: () => {
      return deleteFollow(nickname);
    },
    onMutate: () => {
      setIsCurrentFollowing(false);
    },
    onError: () => {
      setIsCurrentFollowing(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["following", nickname]
      });
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
        {profileImageUrl ? (
          <CircledImage src={profileImageUrl} size="50px" alt="프로필 이미지" />
        ) : (
          <Avatar boxSize={10} src={profileImageUrl} />
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
