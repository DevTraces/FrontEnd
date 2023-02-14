import { getFeed } from "@/api/feeds/[feedId]";
import NavLayout from "@/components/@common/NavLayout";
import PostCard from "@/components/@common/PostCard";
import { FeedData } from "@/types/data/feed";
import { Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();

  const feedQuery = useQuery({
    queryKey: ["feed", router.query.pid],
    queryFn: () => {
      return getFeed(+(router.query.pid as string));
    }
  });

  const getPostCardData = ({
    feedId,
    authorNickname,
    imageUrls,
    numberOfLike,
    hashtags,
    content,
    createdAt,
    liked,
    saved,
    authorProfileImageUrl
  }: FeedData) => ({
    feedId,
    authorNickname,
    imageUrls,
    numberOfLike,
    hashtags,
    content,
    createdAt,
    liked,
    saved,
    authorProfileImageUrl
  });

  if (feedQuery.isError) return <>피드 에러</>;
  if (feedQuery.isLoading) return <>로딩중</>;

  return (
    <>
      <Head>
        <title>포스트 {router.query.pid}</title>
      </Head>
      <NavLayout>
        <Center mt="40px">
          <PostCard {...getPostCardData(feedQuery.data)} />
        </Center>
      </NavLayout>
    </>
  );
}
