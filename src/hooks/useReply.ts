import { postReplies } from "@/api/feeds/[feedId]/replies";
import { deleteReply, putReply } from "@/api/feeds/[feedId]/replies/[replyId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useReply(feedId: number) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const createMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      postReplies(feedId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedsKeys.replies(feedId) });
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
    createMutation,
    updateMutation,
    deleteMutation
  };
}
