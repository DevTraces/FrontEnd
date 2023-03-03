import { postFeeds } from "@/api/feeds";
import { deleteFeed, postFeed } from "@/api/feeds/[feedId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { EditorPublishData } from "@/types/data/feed";
import currentUser from "@/utils/currentUser";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useFeed() {
  const router = useRouter();
  const nickname = currentUser.getNickname();
  const toast = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: EditorPublishData) => postFeeds(data),
    onSuccess: () => {
      toast({
        title: "게시물이 성공적으로 등록되었어요",
        status: "success",
        duration: 1000
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({
      feedId,
      data
    }: {
      feedId: number;
      data: Partial<EditorPublishData>;
    }) => postFeed(feedId, data),
    onSuccess: (data, { feedId }) => {
      toast({
        title: "게시물이 성공적으로 수정되었어요",
        status: "success",
        duration: 1000
      });
      queryClient.invalidateQueries({ queryKey: feedsKeys.feed(feedId) });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number }) => deleteFeed(feedId),
    onSuccess: (data, { feedId }) => {
      toast({
        title: "게시물이 삭제되었어요",
        status: "success",
        duration: 1000
      });

      if (router.pathname.includes("/post/")) {
        router.push("/feed");
      } else {
        queryClient.invalidateQueries(feedsKeys.feed(feedId));
        queryClient.invalidateQueries(feedsKeys.feeds(nickname));
      }
    }
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation
  };
}
