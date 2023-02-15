import { getFeeds } from "@/api/feeds/[nickname]";
import { VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../../@common/PostCard";

type PostsProps = {
  nickname: string;
};

export default function Posts({ nickname }: PostsProps) {
  const feedsQuery = useQuery({
    queryKey: ["feeds", nickname],
    queryFn: ({ queryKey }) => getFeeds(queryKey[1])
  });

  if (feedsQuery.isLoading) return <>Posts 로딩중...</>;
  if (feedsQuery.isError) return <>Posts 에서 에러가 발생했습니다.</>;

  return (
    <VStack>
      {feedsQuery.data.map(d => (
        <PostCard
          key={d.feedId}
          content={d.content}
          feedId={d.feedId}
          authorNickname={d.authorNickname}
          numberOfLike={d.numberOfLike}
          hashtags={d.hashtags}
          createdAt={d.createdAt}
          imageUrls={d.imageUrls}
          authorProfileImageUrl={d.authorProfileImageUrl}
          liked={d.liked}
          saved={d.saved}
        />
      ))}
    </VStack>
  );
}
