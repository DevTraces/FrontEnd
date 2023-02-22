import { deleteFollow, postFollow } from "@/api/follows/[nickname]";
import followsKeys from "@/queryKeys/followsKeys";
import usersKeys from "@/queryKeys/usersKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseFollowParams = {
  onFollow?: () => void;
  onUnfollow?: () => void;
  onToggle?: () => void;
};
export default function useFollow({
  onFollow = () => {},
  onUnfollow = () => {},
  onToggle = () => {}
}: UseFollowParams = {}) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: followsKeys.all
    });
    queryClient.invalidateQueries({ queryKey: usersKeys.all });
  };

  const followMutation = useMutation({
    mutationFn: ({ nickname }: { nickname: string }) => postFollow(nickname),
    onSuccess: () => {
      invalidate();
      onFollow();
    },
    onError: () => {
      toast({ title: "팔로우에 실패했어요", status: "error", duration: 1000 });
    }
  });

  const unfollowMutation = useMutation({
    mutationFn: ({ nickname }: { nickname: string }) => deleteFollow(nickname),
    onSuccess: () => {
      invalidate();
      onUnfollow();
    },
    onError: () => {
      toast({
        title: "팔로우 취소에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  return {
    follow: (nickname: string) => followMutation.mutate({ nickname }),
    unfollow: (nickname: string) => unfollowMutation.mutate({ nickname }),
    toggle: (isFollowing: boolean, nickname: string) =>
      (isFollowing ? unfollowMutation : followMutation).mutate(
        { nickname },
        { onSuccess: onToggle }
      )
  };
}
