import { postReplies } from "@/api/feeds/[feedId]/replies";
import { deleteReply, putReply } from "@/api/feeds/[feedId]/replies/[replyId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseReplyConfig = {
  onCreate?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
};

export default function useReply(
  feedId: number,
  {
    onCreate = () => {},
    onUpdate = () => {},
    onDelete = () => {}
  }: UseReplyConfig = {}
) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const createMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      postReplies(feedId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedsKeys.replies(feedId) });
      onCreate();
    },
    onError: () => {
      toast({
        title: "댓글 등록에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });
  const updateMutation = useMutation({
    mutationFn: ({ replyId, content }: { replyId: number; content: string }) =>
      putReply(feedId, replyId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedsKeys.replies(feedId) });
      onUpdate();
    },
    onError: () => {
      toast({
        title: "댓글 수정에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: ({ replyId }: { replyId: number }) =>
      deleteReply(feedId, replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedsKeys.replies(feedId) });
      onDelete();
    },
    onError: () => {
      toast({
        title: "댓글 삭제에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  return {
    create: (content: string) => createMutation.mutate({ content }),
    update: (replyId: number, content: string) =>
      updateMutation.mutate({ replyId, content }),
    delete: (replyId: number) => deleteMutation.mutate({ replyId })
  };
}
