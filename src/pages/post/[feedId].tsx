import { getFeed } from "@/api/feeds/[feedId]";
import FeedCard from "@/components/@common/FeedCard";
import NavLayout from "@/components/@common/NavLayout";
import feedsKeys from "@/queryKeys/feedsKeys";
import { Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { GetServerSideProps } from "next/types";

type ServerSideProps = {
  feedId: string;
};

export default function Feed({ feedId }: ServerSideProps) {
  const feedQuery = useQuery({
    queryKey: feedsKeys.feed(+feedId),
    queryFn: () => getFeed(+feedId)
  });

  if (feedQuery.isError) return <>피드 에러</>;
  if (feedQuery.isLoading) return <>로딩중</>;

  return (
    <>
      <Head>
        <title>포스트 {feedQuery.data.authorNickname}</title>
      </Head>
      <NavLayout>
        <Center mt="40px">
          <FeedCard feedData={feedQuery.data} />
        </Center>
      </NavLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query
});
