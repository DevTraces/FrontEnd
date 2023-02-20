import { postFeeds } from "@/api/feeds";
import { deleteFeed } from "@/api/feeds/[feedId]";
import { EditorPublishData, FileImage } from "@/types/data/feed";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

type UseFeedDeleteParams = {
  onCreate?: () => void;
  onDelete?: () => void;
};

export default function useFeed({
  onCreate = () => {},
  onDelete = () => {}
}: UseFeedDeleteParams = {}) {
  const toast = useToast();

  const deleteMutation = useMutation({
    mutationFn: ({ feedId }: { feedId: number }) => deleteFeed(feedId),
    onSuccess: () => {
      toast({
        title: "게시물이 삭제되었어요",
        status: "success",
        duration: 1000
      });
      onDelete();
    },
    onError: () => {
      toast({
        title: "게시물이 삭제에 실패하였어요",
        status: "error",
        duration: 1000
      });
    }
  });

  const createMutation = useMutation({
    mutationFn: ({ images, textContent, tags }: EditorPublishData) =>
      postFeeds(
        textContent,
        images.filter((i): i is FileImage => i.type === "file").map(i => i.src),
        tags
      ),
    onSuccess: () => {
      toast({
        title: "게시물이 성공적으로 등록되었어요",
        status: "success",
        duration: 1000
      });
      onCreate();
    },
    onError: () => {
      toast({
        title: "게시물 등록에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  return {
    create: (data: EditorPublishData) => createMutation.mutate(data),
    delete: (feedId: number) => deleteMutation.mutate({ feedId })
  };
}
