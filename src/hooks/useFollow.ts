import { deleteFollow, postFollow } from "@/api/follows/[nickname]";
import followsKeys from "@/queryKeys/followsKeys";
import usersKeys from "@/queryKeys/usersKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useFollow() {
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
    },
    onError: () => {
      toast({ title: "팔로우에 실패했어요", status: "error", duration: 1000 });
    }
  });

  const unfollowMutation = useMutation({
    mutationFn: ({ nickname }: { nickname: string }) => deleteFollow(nickname),
    onSuccess: () => {
      invalidate();
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
    followMutation,
    unfollowMutation,
    toggleMutation: (isFollowing: boolean) =>
      isFollowing ? unfollowMutation : followMutation
  };
}
