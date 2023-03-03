import { getFeed } from "@/api/feeds/[feedId]";
import FeedCard from "@/components/@common/FeedCard";
import NavLayout from "@/components/@common/NavLayout";
import feedsKeys from "@/queryKeys/feedsKeys";
import { Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import getRedirectionServerSideProps from "@/lib/getServerSideProps/redirection";

type ServerSideProps = {
  query: {
    feedId: string;
  };
};

export default function Feed({ query }: ServerSideProps) {
  const { feedId } = query;
  const feedQuery = useQuery({
    queryKey: feedsKeys.feed(+feedId),
    queryFn: () => getFeed(+feedId)
  });

  return (
    <>
      <Head>
        <title>포스트 {feedQuery.data?.authorNickname ?? ""}</title>
      </Head>
      <NavLayout>
        <Center mt="40px">
          {feedQuery.data && <FeedCard feedData={feedQuery.data} />}
        </Center>
      </NavLayout>
    </>
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
