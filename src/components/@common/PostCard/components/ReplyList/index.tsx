import { getReplies, postReplies } from "@/api/feeds/[feedId]/replies";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import feedsKeys from "@/queryKeys/feedsKeys";
import { PostCardData } from "@/types/data/feed";
import { Flex, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ReplyInput from "./components/ReplyInput";
import ReplyItem from "./components/ReplyItem";

type ReplyListProps = Pick<PostCardData, "feedId">;
type FormData = {
  content: string;
};

export default function ReplyList({ feedId }: ReplyListProps) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const repliesQuery = useQuery({
    queryKey: feedsKeys.replies(feedId),
    queryFn: () => getReplies(feedId)
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<FormData>({ mode: "onChange" });

  const replyMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      postReplies(feedId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedsKeys.replies(feedId) });
      reset();
    },
    onError: () => {
      toast({
        title: "댓글 등록에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  const handleFormSubmit = handleSubmit(({ content }) => {
    replyMutation.mutate({ content });
  });

  if (repliesQuery.isError) return <>ReplyList에서 에러 발생.</>;
  if (repliesQuery.isLoading) return <>ReplyList 로딩 중...</>;

  return (
    <Flex direction="column">
      <form onSubmit={handleFormSubmit}>
        <ReplyInput
          feedId={feedId}
          errorMessage={errors.content?.message}
          isInvalid={!!errors.content}
          onSendClick={handleFormSubmit}
          {...register("content", VALIDATION_RULE.replyContent)}
        />
      </form>
      {repliesQuery.data.map(r => (
        <ReplyItem key={r.replyId} {...r} />
      ))}
    </Flex>
  );
}
