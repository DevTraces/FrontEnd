import { deleteLike, postLike } from "@/api/like/[feedId]";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import currentUser from "@/utils/currentUser";

const useLike = () => {
  // const nickname = currentUser.getNickname();
  const toast = useToast();

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number; authorNickname: string }) =>
      postLike(feedId),
    onSuccess: async (res, { feedId, authorNickname }) => {
      toast({
        title: "좋아요를 눌렀어요",
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
      toast({
        title: "좋아요를 취소했어요",
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
