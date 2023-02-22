import { deleteBookmark, postBookmark } from "@/api/bookmark/[feedId]";
import userAtom from "@/atoms/userAtom";
import feedsKeys from "@/queryKeys/feedsKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

const useBookmark = ({
  onBookmark = () => {},
  onUnbookmark = () => {}
} = {}) => {
  const { nickname } = useRecoilValue(userAtom);
  const toast = useToast();

  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number }) => postBookmark(feedId),
    onSuccess: async (res, { feedId }) => {
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
    mutationFn: ({ feedId }: { feedId: number }) => deleteBookmark(feedId),
    onSuccess: async (data, { feedId }) => {
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
    bookmark: (feedId: number) => bookmarkMutation.mutate({ feedId }),
    unbookmark: (feedId: number) => unbookmarkMutation.mutate({ feedId })
  };
};

export default useBookmark;
