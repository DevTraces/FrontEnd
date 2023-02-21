import { postFeeds } from "@/api/feeds";
import { deleteFeed, putFeed } from "@/api/feeds/[feedId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { EditorPublishData } from "@/types/data/feed";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseFeedDeleteParams = {
  onCreate?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
};

export default function useFeed({
  onCreate = () => {},
  onUpdate = () => {},
  onDelete = () => {}
}: UseFeedDeleteParams = {}) {
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
      onCreate();
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
    }) => putFeed(feedId, data),
    onSuccess: (data, { feedId }) => {
      toast({
        title: "게시물이 성공적으로 수정되었어요",
        status: "success",
        duration: 1000
      });
      queryClient.invalidateQueries({ queryKey: feedsKeys.feed(feedId) });
      onUpdate();
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
    onSuccess: () => {
      toast({
        title: "게시물이 삭제되었어요",
        status: "success",
        duration: 1000
      });
      onDelete();
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
    create: (data: EditorPublishData) => createMutation.mutate(data),
    update: (feedId: number, data: Partial<EditorPublishData>) =>
      updateMutation.mutate({ feedId, data }),
    delete: (feedId: number) => deleteMutation.mutate({ feedId })
  };
}
