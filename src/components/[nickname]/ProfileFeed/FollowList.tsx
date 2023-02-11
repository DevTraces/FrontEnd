import { getFollowList } from "@/api/follows/[selected]/[nickname]";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import FollowItem from "./FollowItem";

type FollowListProps = {
  nickname: string;
  selected: string;
};

export default function FollowList({ nickname, selected }: FollowListProps) {
  const followListQuery = useQuery({
    queryKey: ["followList", nickname, selected],
    queryFn: ({ queryKey }) => getFollowList(queryKey[1], queryKey[2])
  });
  if (followListQuery.isError) return <>FollowList 에러 발생</>;
  if (followListQuery.isLoading) return <>FollowList 로딩 중...</>;

  return (
    <VStack>
      {followListQuery.data?.map(d => (
        <FollowItem key={d.nickname} {...d} />
      ))}
    </VStack>
  );
}
