import { getFeed, putFeed } from "@/api/feeds/[feedId]";
import NavLayout from "@/components/@common/NavLayout";
import FeedEditor from "@/components/post/FeedEditor";
import feedsKeys from "@/queryKeys/feedsKeys";
import { EditorPublishData } from "@/types/data/feed";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Head from "next/head";
import { useRouter } from "next/router";

export default function FeedEdit() {
  const router = useRouter();
  const { feedId } = router.query as { feedId: string };
  const toast = useToast();
  const queryClient = useQueryClient();

  const feedQuery = useQuery({
    queryKey: feedsKeys.feed(+feedId),
    queryFn: () => getFeed(+feedId)
  });

  const feedMutation = useMutation({
    mutationFn: ({ images, textContent, tags }: EditorPublishData) =>
      putFeed(
        // TODO: BE와 image 형식 통일 필요
        +feedId,
        {
          content: textContent,
          images,
          hashtags: tags
        }
      ),
    onSuccess: () => {
      toast({
        title: "게시물이 성공적으로 수정되었어요",
        status: "success",
        duration: 1000
      });
      queryClient.invalidateQueries({ queryKey: feedsKeys.feed(+feedId) });
      router.push("/feed");
    },
    onError: () => {
      toast({
        title: "게시물 수정에 실패했어요",
        status: "error",
        duration: 1000
      });
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
        onPublish={feedMutation.mutate}
        prevFeedData={feedQuery.data}
      />
    </NavLayout>
  );
}
