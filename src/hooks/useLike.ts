import { deleteLike, postLike } from "@/api/like/[feedId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLike = () => {
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
    }
  });

  return {
    likeMutation,
    unlikeMutation
  };
};

export default useLike;
