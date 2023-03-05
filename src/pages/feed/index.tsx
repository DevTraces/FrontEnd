import { getFeedMain } from "@/api/feeds/main";
import NavLayout from "@/components/@common/NavLayout";
import FeedList from "@/components/feed/FeedList";
import getServerSideProps from "@/lib/getServerSideProps/redirection";
import feedsKeys from "@/queryKeys/feedsKeys";
import currentUser from "@/utils/currentUser";
import { Center, Text } from "@chakra-ui/react";
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
        {feedQuery.data?.length === 0 && (
          <Center mt="400px">
            <Text fontSize="2xl">추천할 피드가 없어요</Text>
          </Center>
        )}
        <Center>
          {feedQuery.data && <FeedList feedsData={feedQuery.data} />}
        </Center>
      </NavLayout>
    </>
  );
}

export { getServerSideProps };
