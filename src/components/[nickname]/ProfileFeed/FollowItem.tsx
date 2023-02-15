import { FollowItemData } from "@/api/follows/following/[nickname]";
import { deleteFollow, postFollow } from "@/api/follows/[nickname]";
import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import CircledImage from "../CircledImage";

type FollowItemProps = FollowItemData & {
  type: "follower" | "following";
  isPending?: boolean;
};

export default function FollowItem({
  username,
  nickname,
  profileImageUrl,
  isFollowing,
  type,
  isPending = false
}: FollowItemProps) {
  const queryClient = useQueryClient();

  const toggleFollow = useMutation({
    mutationFn: () => {
      if (!isFollowing) postFollow(nickname);
      return deleteFollow(nickname);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [type, nickname] });
      const prevFollows = queryClient.getQueryData([type, nickname]);
      queryClient.setQueryData(
        [type, nickname],
        (old: FollowItemData[] | undefined) =>
          old?.map(o =>
            o.nickname === nickname ? { ...o, isFollowing: !isFollowing } : o
          )
      );

      return { prevFollows };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData([type, nickname], context?.prevFollows);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [type, nickname]
      });
    }
  });

  const handleFollowClick = () => {
    toggleFollow.mutate();
  };

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
      <Button
        w="100px"
        colorScheme={isFollowing ? "blackAlpha" : "blue"}
        fontWeight="bold"
        onClick={handleFollowClick}
      >
        {isFollowing && "팔로잉"}
        {!isFollowing && (isPending ? "수락" : "팔로우")}
      </Button>
    </HStack>
  );
}
