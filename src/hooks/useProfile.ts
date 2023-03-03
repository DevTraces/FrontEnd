import {
  deleteUserProfileImage,
  postUserProfileImage
} from "@/api/users/profile/images/[nickname]";
import { patchUserProfile } from "@/api/users/profile/[nickname]";
import usersKeys from "@/queryKeys/usersKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useProfile() {
  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation({
    mutationFn: patchUserProfile,
    onSuccess: ({ nickname }) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.userProfile(nickname)
      });
    }
  });

  const updateProfileImageMutation = useMutation({
    mutationFn: postUserProfileImage,
    onSuccess: (res, { nickname }) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.userProfile(nickname)
      });
    }
  });

  const deleteProfileImageMutation = useMutation({
    mutationFn: deleteUserProfileImage,
    onSuccess: (res, { nickname }) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.userProfile(nickname)
      });
    }
  });

  return {
    updateProfileMutation,
    updateProfileImageMutation,
    deleteProfileImageMutation
  };
}
