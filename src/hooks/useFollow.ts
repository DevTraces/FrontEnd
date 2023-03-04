import { deleteFollow, postFollow } from "@/api/follows/[nickname]";
import feedsKeys from "@/queryKeys/feedsKeys";
import followsKeys from "@/queryKeys/followsKeys";
import noticesKeys from "@/queryKeys/noticesKeys";
import usersKeys from "@/queryKeys/usersKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useFollow() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: followsKeys.all
    });
    queryClient.invalidateQueries({ queryKey: usersKeys.all });
    queryClient.invalidateQueries({ queryKey: feedsKeys.all });
    queryClient.invalidateQueries({ queryKey: noticesKeys.notices });
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
