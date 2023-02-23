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

  return (
    <NavLayout>
      <Head>
        <title>게시물 수정</title>
      </Head>
      {feedQuery.data && (
        <FeedEditor
          onPublish={data => updateFeed(+feedId, data)}
          prevFeedData={feedQuery.data}
        />
      )}
    </NavLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query
});
