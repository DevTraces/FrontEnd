import { getFollowerList } from "@/api/follows/follower/[nickname]";
import { getFollowingList } from "@/api/follows/following/[nickname]";
import { getFollowSuggestion } from "@/api/follows/suggestion";
import followsKeys from "@/queryKeys/followsKeys";
import { Divider, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import FollowItem from "./FollowItem";

type FollowListProps = {
  nickname: string;
  type: "follower" | "following";
};

export default function FollowList({ nickname, type }: FollowListProps) {
  const followListQuery = useQuery({
    queryKey:
      type === "follower"
        ? followsKeys.followerList(nickname)
        : followsKeys.followingList(nickname),
    queryFn: () =>
      type === "follower"
        ? getFollowerList(nickname, 0, 10)
        : getFollowingList(nickname, 0, 10)
  });

  const followSuggestionQuery = useQuery({
    queryKey: followsKeys.suggestion(nickname),
    queryFn: getFollowSuggestion
  });

  if (followListQuery.data?.length === 0) {
    return (
      <>
        <Text color="gray">
          {type === "follower"
            ? "당신을 팔로우 하고 있는 사람이"
            : "팔로우 하고 있는 사람이"}{" "}
          없어요
        </Text>
        <Divider my="40px" alignItems="center" />
        <Text>아래의 유저들을 팔로우 해보세요</Text>
        <VStack alignItems="flex-start" w="350px">
          {followSuggestionQuery.data?.map(d => (
            <FollowItem key={d.nickname} followItemData={d} />
          ))}
        </VStack>
      </>
    );
  }

  return (
    <VStack alignItems="flex-start" w="350px">
      {followListQuery.data?.map(d => (
        <FollowItem key={d.nickname} followItemData={d} />
      ))}
    </VStack>
  );
}
