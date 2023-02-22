import { deleteLike, postLike } from "@/api/like/[feedId]";
import userAtom from "@/atoms/userAtom";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

const useLike: (
  feedId: number,
  config?: {
    onlike?: () => void;
    onUnlike?: () => void;
  }
) => {
  like: () => void;
  unlike: () => void;
} = (feedId, { onlike = () => {}, onUnlike = () => {} } = {}) => {
  const { nickname } = useRecoilValue(userAtom);
  const toast = useToast();

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => postLike(feedId),
    onSuccess: async () => {
      toast({
        title: "좋아요를 눌렀어요",
        status: "success",
        duration: 1000
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feeds(nickname)
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feed(feedId)
      });
      onlike();
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
    mutationFn: () => deleteLike(feedId),
    onSuccess: async () => {
      toast({
        title: "좋아요를 취소했어요",
        status: "success",
        duration: 1000
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feeds(nickname)
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feed(feedId)
      });
      onUnlike();
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
    like: () => likeMutation.mutate(),
    unlike: () => unlikeMutation.mutate()
  };
};

export default useLike;
