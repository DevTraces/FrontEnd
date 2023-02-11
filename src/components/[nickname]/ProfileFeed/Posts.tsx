import { getFeeds } from "@/api/feeds/[nickname]";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../PostCard";

type PostsProps = {
  nickname: string;
};

export default function Posts({ nickname }: PostsProps) {
  const postsQuery = useQuery({
    queryKey: ["posts", nickname],
    queryFn: ({ queryKey }) => getFeeds(queryKey[1] as string)
  });

  if (postsQuery.isLoading) return <>Posts 로딩중...</>;
  if (postsQuery.isError) return <>Posts 에서 에러가 발생했습니다.</>;

  return (
    <VStack>
      {postsQuery.data.map(d => (
        <PostCard key={d.feedId} {...d} />
      ))}
    </VStack>
  );
}
