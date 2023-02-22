import { getFeed } from "@/api/feeds/[feedId]";
import FeedCard from "@/components/@common/FeedCard";
import NavLayout from "@/components/@common/NavLayout";
import feedsKeys from "@/queryKeys/feedsKeys";
import { Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Feed() {
  const router = useRouter();

  const { feedId } = router.query as { feedId: string };

  const feedQuery = useQuery({
    queryKey: feedsKeys.feed(+feedId),
    queryFn: () => (feedId ? getFeed(+feedId) : null)
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
          {feedQuery.data && <FeedCard feedData={feedQuery.data} />}
        </Center>
      </NavLayout>
    </>
  );
}
