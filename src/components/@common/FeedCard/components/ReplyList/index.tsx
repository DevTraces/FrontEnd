import { getReplies } from "@/api/feeds/[feedId]/replies";
import feedAtom from "@/atoms/feedAtom";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useReply from "@/hooks/useReply";
import feedsKeys from "@/queryKeys/feedsKeys";
import { Box, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import ReplyInput from "./components/ReplyInput";
import ReplyItem from "./components/ReplyItem";

type FormData = {
  content: string;
};

export default function ReplyList() {
  const { feedId } = useRecoilValue(feedAtom);

  const repliesQuery = useQuery({
    queryKey: feedsKeys.replies(feedId),
    queryFn: () => getReplies(feedId, 0)
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<FormData>({ mode: "onChange" });

  const { createMutation } = useReply(feedId);

  const createReply = (content: string) =>
    createMutation.mutate(
      { content },
      {
        onSuccess: () => {
          reset();
        }
      }
    );

  const handleFormSubmit = handleSubmit(({ content }) => createReply(content));

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
      <Box px="10px" mt="20px">
        {repliesQuery.data?.map(r => (
          <ReplyItem key={r.replyId} replyData={r} />
        ))}
      </Box>
    </Flex>
  );
}
