import { getFeeds } from "@/api/feeds/[nickname]";
import NavLayout from "@/components/@common/NavLayout";
import FeedList from "@/components/feed/FeedList";
import feedsKeys from "@/queryKeys/feedsKeys";
import { Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import currentUser from "@/utils/currentUser";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Feed() {
  const nickname = currentUser.getNickname();
  const router = useRouter();
  const feedQuery = useQuery({
    queryKey: feedsKeys.feeds(nickname),
    queryFn: () => getFeeds(nickname, 0)
  });

  useEffect(() => {
    if (nickname === "") router.push("/");
  }, [router, nickname]);

  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <NavLayout>
        <Center>
          {feedQuery.data && <FeedList feedsData={feedQuery.data} />}
        </Center>
      </NavLayout>
    </>
  );
}
