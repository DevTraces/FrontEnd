import { postRereplies } from "@/api/feeds/[feedId]/replies/[replyId]/rereplies";
import {
  deleteRereply,
  putRereply
} from "@/api/feeds/[feedId]/replies/[replyId]/rereplies/[rereplyId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRereply(feedId: number, replyId: number) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const createMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      postRereplies(feedId, replyId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedsKeys.rereplies(feedId, replyId)
      });
    },
    onError: () => {
      toast({
        title: "대댓글 등록에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({
      rereplyId,
      content
    }: {
      rereplyId: number;
      content: string;
    }) => putRereply(feedId, replyId, rereplyId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedsKeys.rereplies(feedId, replyId)
      });
    },
    onError: () => {
      toast({
        title: "대댓글 수정에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: ({ rereplyId }: { rereplyId: number }) =>
      deleteRereply(feedId, replyId, rereplyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedsKeys.rereplies(feedId, replyId)
      });
    },
    onError: () => {
      toast({
        title: "대댓글 삭제에 실패했어요",
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
