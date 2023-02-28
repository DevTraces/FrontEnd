import { postFeeds } from "@/api/feeds";
import { deleteFeed, postFeed } from "@/api/feeds/[feedId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { EditorPublishData } from "@/types/data/feed";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import currentUser from "@/utils/currentUser";
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
    },
    onError: () => {
      toast({
        title: "게시물 등록에 실패했어요",
        status: "error",
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
    },
    onError: () => {
      toast({
        title: "게시물 수정에 실패했어요",
        status: "error",
        duration: 1000
      });
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
    },
    onError: () => {
      toast({
        title: "게시물이 삭제에 실패하였어요",
        status: "error",
        duration: 1000
      });
    }
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation
  };
}
