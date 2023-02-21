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

  const { create: createReply } = useReply(feedId, {
    onCreate: () => {
      reset();
    }
  });

  const handleFormSubmit = handleSubmit(({ content }) => createReply(content));

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
      <Box px="10px">
        {repliesQuery.data.map(r => (
          <ReplyItem key={r.replyId} {...r} />
        ))}
      </Box>
    </Flex>
  );
}
