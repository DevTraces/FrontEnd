import { getFeeds } from "@/api/feeds/[nickname]";
import NavLayout from "@/components/@common/NavLayout";
import PostCard from "@/components/@common/PostCard";
import feedsKeys from "@/queryKeys/feedsKeys";
import { Center, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

export default function Feed() {
  const feedQuery = useQuery({
    queryKey: feedsKeys.feeds("test"),
    queryFn: () => getFeeds("test")
  });

  if (feedQuery.isError) return <>피드 에러</>;
  if (feedQuery.isLoading) return <>피드 로딩중</>;

  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <NavLayout>
        <Center>
          <Flex direction="column" pt={20} gap={10} m="auto" mb={20}>
            {feedQuery.data.map(feed => (
              <PostCard
                key={feed.feedId}
                content={feed.content}
                feedId={feed.feedId}
                authorNickname={feed.authorNickname}
                numberOfLike={feed.numberOfLike}
                hashtags={feed.hashtags}
                createdAt={feed.createdAt}
                imageUrls={feed.imageUrls}
                authorProfileImageUrl={feed.authorProfileImageUrl}
                liked={feed.liked}
                saved={feed.saved}
              />
            ))}
          </Flex>
        </Center>
      </NavLayout>
    </>
  );
}
