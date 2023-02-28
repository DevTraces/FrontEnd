import {
  deleteUserProfileImage,
  postUserProfileImage
} from "@/api/users/profile/images/[nickname]";
import { patchUserProfile } from "@/api/users/profile/[nickname]";
import usersKeys from "@/queryKeys/usersKeys";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useProfile() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation({
    mutationFn: patchUserProfile,
    onSuccess: ({ nickname }) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.userProfile(nickname)
      });
    },
    onError: () => {
      toast({
        title: "프로필 수정에 실패했어요",
        status: "error",
        duration: 3000
      });
    }
  });

  const updateProfileImageMutation = useMutation({
    mutationFn: postUserProfileImage,
    onSuccess: (res, { nickname }) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.userProfile(nickname)
      });
    },
    onError: () => {
      toast({
        title: "프로필 이미지 수정에 실패했어요",
        status: "error",
        duration: 3000
      });
    }
  });

  const deleteProfileImageMutation = useMutation({
    mutationFn: deleteUserProfileImage,
    onSuccess: (res, { nickname }) => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.userProfile(nickname)
      });
    },
    onError: () => {
      toast({
        title: "프로필 이미지 삭제에 실패했어요",
        status: "error",
        duration: 3000
      });
    }
  });

  return {
    updateProfileMutation,
    updateProfileImageMutation,
    deleteProfileImageMutation
  };
}
