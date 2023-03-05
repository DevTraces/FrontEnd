import { getFeed } from "@/api/feeds/[feedId]";
import NavLayout from "@/components/@common/NavLayout";
import FeedEditor from "@/components/post/FeedEditor";
import useFeed from "@/hooks/useFeed";
import feedsKeys from "@/queryKeys/feedsKeys";
import { EditorPublishData } from "@/types/data/feed";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import getRedirectionServerSideProps from "@/lib/getServerSideProps/redirection";

import Head from "next/head";
import { useRouter } from "next/router";
import { Center } from "@chakra-ui/react";

type ServerSideProps = {
  query: {
    feedId: string;
  };
};

export default function FeedEdit({ query }: ServerSideProps) {
  const { feedId } = query;
  const router = useRouter();

  const feedQuery = useQuery({
    queryKey: feedsKeys.feed(+feedId),
    queryFn: () => getFeed(+feedId)
  });

  const { updateMutation } = useFeed();

  const updateFeed = (data: Partial<EditorPublishData>) =>
    updateMutation.mutate(
      { feedId: +feedId, data },
      {
        onSuccess: () => {
          router.push("/feed");
        }
      }
    );

  return (
    <NavLayout>
      <Head>
        <title>게시물 수정</title>
      </Head>
      <Center mt={{ base: "40px", md: "0" }}>
        {feedQuery.data && (
          <FeedEditor
            onPublish={data => updateFeed(data)}
            prevFeedData={feedQuery.data}
          />
        )}
      </Center>
    </NavLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    ...(await getRedirectionServerSideProps(ctx)),
    props: {
      query: ctx.query
    }
  };
};
