import { getFeedMain } from "@/api/feeds/main";
import NavLayout from "@/components/@common/NavLayout";
import NewFeedList from "@/components/@common/NewFeedList";
import feedsKeys from "@/queryKeys/feedsKeys";
import currentUser from "@/utils/currentUser";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Feed() {
  const nickname = currentUser.getNickname();
  const router = useRouter();

  const feedQuery = useQuery({
    queryKey: feedsKeys.main(),
    queryFn: () => getFeedMain(0)
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
        {feedQuery.data && <NewFeedList feedsData={feedQuery.data} />}
      </NavLayout>
    </>
  );
}
