import { postRereplies } from "@/api/feeds/[feedId]/replies/[replyId]/rereplies";
import {
  deleteRereply,
  putRereply
} from "@/api/feeds/[feedId]/replies/[replyId]/rereplies/[rereplyId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRereply(feedId: number, replyId: number) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      postRereplies(feedId, replyId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedsKeys.rereplies(feedId, replyId)
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
    }
  });

  const deleteMutation = useMutation({
    mutationFn: ({ rereplyId }: { rereplyId: number }) =>
      deleteRereply(feedId, replyId, rereplyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedsKeys.rereplies(feedId, replyId)
      });
    }
  });
  return {
    createMutation,
    updateMutation,
    deleteMutation
  };
}
