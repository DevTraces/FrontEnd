import { deleteBookmark, postBookmark } from "@/api/bookmark/[feedId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import currentUser from "@/utils/currentUser";

const useBookmark = () => {
  // const nickname = currentUser.getNickname();

  const toast = useToast();

  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number; authorNickname: string }) =>
      postBookmark(feedId),
    onSuccess: async (res, { feedId, authorNickname }) => {
      toast({
        title: "북마크에 추가되었어요",
        status: "success",
        duration: 1000
      });
      // TODO: 메인 피드 API
      // queryClient.invalidateQueries({
      //   queryKey: feedsKeys.mainFeed(nickname)
      // });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feeds(authorNickname)
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feed(feedId)
      });
    },
    onError: () => {
      toast({
        title: "북마크 추가에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  const unbookmarkMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number; authorNickname: string }) =>
      deleteBookmark(feedId),
    onSuccess: async (data, { feedId, authorNickname }) => {
      toast({
        title: "북마크에서 삭제되었어요",
        status: "success",
        duration: 1000
      });
      // TODO: 메인 피드 API
      // queryClient.invalidateQueries({
      //   queryKey: feedsKeys.mainFeed(nickname)
      // });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feeds(authorNickname)
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feed(feedId)
      });
    },
    onError: () => {
      toast({
        title: "북마크 삭제에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  return {
    bookmarkMutation,
    unbookmarkMutation
  };
};

export default useBookmark;
