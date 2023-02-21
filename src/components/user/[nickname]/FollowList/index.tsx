import { getFollowerList } from "@/api/follows/follower/[nickname]";
import { getFollowingList } from "@/api/follows/following/[nickname]";
import followsKeys from "@/queryKeys/followsKeys";
import { VStack } from "@chakra-ui/react";
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
      // TODO: pagination 필요
      type === "follower"
        ? getFollowerList(nickname, 0, 1)
        : getFollowingList(nickname, 0, 1)
  });

  if (followListQuery.isError) return <>FollowList 에러 발생</>;
  if (followListQuery.isLoading) return <>FollowList 로딩 중...</>;

  return (
    <VStack>
      {followListQuery.data.map(d => (
        <FollowItem key={d.nickname} type={type} {...d} />
      ))}
    </VStack>
  );
}
