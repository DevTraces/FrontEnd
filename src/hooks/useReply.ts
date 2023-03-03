import { postReplies } from "@/api/feeds/[feedId]/replies";
import { deleteReply, putReply } from "@/api/feeds/[feedId]/replies/[replyId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useReply(feedId: number) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      postReplies(feedId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedsKeys.replies(feedId) });
    }
  });
  const updateMutation = useMutation({
    mutationFn: ({ replyId, content }: { replyId: number; content: string }) =>
      putReply(feedId, replyId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedsKeys.replies(feedId) });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: ({ replyId }: { replyId: number }) =>
      deleteReply(feedId, replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedsKeys.replies(feedId) });
    }
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation
  };
}
