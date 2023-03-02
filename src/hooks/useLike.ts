import { deleteLike, postLike } from "@/api/like/[feedId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLike = () => {
  const toast = useToast();

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number; authorNickname: string }) =>
      postLike(feedId),
    onSuccess: async (res, { feedId, authorNickname }) => {
      queryClient.invalidateQueries({
        queryKey: feedsKeys.main()
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feeds(authorNickname)
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feed(feedId)
      });
    },
    onError: () => {
      toast({
        title: "좋아요에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  const unlikeMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number; authorNickname: string }) =>
      deleteLike(feedId),
    onSuccess: async (res, { feedId, authorNickname }) => {
      queryClient.invalidateQueries({
        queryKey: feedsKeys.main()
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feeds(authorNickname)
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feed(feedId)
      });
    },
    onError: () => {
      toast({
        title: "좋아요 해제에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  return {
    likeMutation,
    unlikeMutation
  };
};

export default useLike;
