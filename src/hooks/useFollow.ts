import { deleteFollow, postFollow } from "@/api/follows/[nickname]";
import followsKeys from "@/queryKeys/followsKeys";
import usersKeys from "@/queryKeys/usersKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useFollow() {
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
    }
  });

  const unfollowMutation = useMutation({
    mutationFn: ({ nickname }: { nickname: string }) => deleteFollow(nickname),
    onSuccess: () => {
      invalidate();
    }
  });

  return {
    followMutation,
    unfollowMutation,
    toggleMutation: (isFollowing: boolean) =>
      isFollowing ? unfollowMutation : followMutation
  };
}
