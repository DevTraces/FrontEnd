import { getFeeds } from "@/api/feeds/[nickname]";
import userAtom from "@/atoms/userAtom";
import NavLayout from "@/components/@common/NavLayout";
import FeedList from "@/components/feed/FeedList";
import feedsKeys from "@/queryKeys/feedsKeys";
import { Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRecoilValue } from "recoil";

export default function Feed() {
  const user = useRecoilValue(userAtom);

  const feedQuery = useQuery({
    queryKey: feedsKeys.feeds(user.nickname),
    queryFn: () => getFeeds(user.nickname)
  });

  if (feedQuery.isError) return <>피드 에러</>;
  if (feedQuery.isLoading) return <>피드 로x딩중</>;

  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <NavLayout>
        <Center>
          <FeedList feedsData={feedQuery.data} />
        </Center>
      </NavLayout>
    </>
  );
}
