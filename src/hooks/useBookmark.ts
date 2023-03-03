import { deleteBookmark, postBookmark } from "@/api/bookmark/[feedId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useBookmark = () => {
  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number; authorNickname: string }) =>
      postBookmark(feedId),
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

  const unbookmarkMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number; authorNickname: string }) =>
      deleteBookmark(feedId),
    onSuccess: async (data, { feedId, authorNickname }) => {
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
    bookmarkMutation,
    unbookmarkMutation
  };
};

export default useBookmark;
