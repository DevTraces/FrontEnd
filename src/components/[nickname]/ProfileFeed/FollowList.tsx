import { getFollowerList } from "@/api/follows/follower/[nickname]";
import { getFollowingList } from "@/api/follows/following/[nickname]";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import FollowItem from "./FollowItem";

type FollowListProps = {
  nickname: string;
  type: "follower" | "following";
};

export default function FollowList({ nickname, type }: FollowListProps) {
  const followListQuery = useQuery({
    queryKey: ["followList", nickname, type],
    queryFn: ({ queryKey }) => {
      // TODO: pagination 필요
      if (queryKey[2] === "follower") {
        return getFollowerList(queryKey[2], 1, 1);
      }
      return getFollowingList(queryKey[2], 1, 1);
    }
  });

  if (followListQuery.isError) return <>FollowList 에러 발생</>;
  if (followListQuery.isLoading) return <>FollowList 로딩 중...</>;

  return (
    <VStack>
      {followListQuery.data.map(d => (
        <FollowItem key={d.nickname} {...d} />
      ))}
    </VStack>
  );
}
