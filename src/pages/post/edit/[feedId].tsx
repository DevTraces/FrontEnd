import { getFeed } from "@/api/feeds/[feedId]";
import NavLayout from "@/components/@common/NavLayout";
import FeedEditor from "@/components/post/FeedEditor";
import useFeed from "@/hooks/useFeed";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

import Head from "next/head";
import { useRouter } from "next/router";

type ServerSideProps = {
  feedId: string;
};

export default function FeedEdit({ feedId }: ServerSideProps) {
  const router = useRouter();

  const feedQuery = useQuery({
    queryKey: feedsKeys.feed(+feedId),
    queryFn: () => getFeed(+feedId)
  });

  const { update: updateFeed } = useFeed({
    onUpdate: () => {
      router.push("/feed");
    }
  });

  if (feedQuery.isError) return <>피드 에러</>;
  if (feedQuery.isLoading) return <>로딩중</>;

  return (
    <NavLayout>
      <Head>
        <title>게시물 수정</title>
      </Head>
      <FeedEditor
        onPublish={data => updateFeed(+feedId, data)}
        prevFeedData={feedQuery.data}
      />
    </NavLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query
});
