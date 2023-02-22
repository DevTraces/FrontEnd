import { deleteBookmark, postBookmark } from "@/api/bookmark/[feedId]";
import userAtom from "@/atoms/userAtom";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

const useBookmark: (
  feedId: number,
  config?: {
    onBookmark?: () => void;
    onUnbookmark?: () => void;
  }
) => {
  bookmark: () => void;
  unbookmark: () => void;
} = (feedId, { onBookmark = () => {}, onUnbookmark = () => {} } = {}) => {
  const { nickname } = useRecoilValue(userAtom);
  const toast = useToast();

  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation({
    mutationFn: () => postBookmark(feedId),
    onSuccess: async () => {
      toast({
        title: "북마크에 추가되었어요",
        status: "success",
        duration: 1000
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feeds(nickname)
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feed(feedId)
      });
      onBookmark();
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
    mutationFn: () => deleteBookmark(feedId),
    onSuccess: async () => {
      toast({
        title: "북마크에서 삭제되었어요",
        status: "success",
        duration: 1000
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feeds(nickname)
      });
      queryClient.invalidateQueries({
        queryKey: feedsKeys.feed(feedId)
      });
      onUnbookmark();
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
    bookmark: () => bookmarkMutation.mutate(),
    unbookmark: () => unbookmarkMutation.mutate()
  };
};

export default useBookmark;
