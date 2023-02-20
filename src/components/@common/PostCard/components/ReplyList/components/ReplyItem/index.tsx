import {
  getRereplies,
  postRereplies,
  ReplyData
} from "@/api/feeds/[feedId]/replies/[replyId]/rereplies";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import feedsKeys from "@/queryKeys/feedsKeys";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  useToast
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import ReplyInput from "../ReplyInput";
import ReplyContent from "./components/ReplyContent";

type ReplyItemProps = ReplyData;

type FormData = {
  newContent: string;
};
export default function ReplyItem({
  feedId,
  replyId,
  authorNickname,
  content
}: ReplyItemProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const toast = useToast();

  const rerepliesQuery = useQuery({
    queryKey: feedsKeys.rereplies(feedId, replyId),
    queryFn: () => getRereplies(feedId, replyId)
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<FormData>({ mode: "onChange" });

  const rereplyMutation = useMutation({
    mutationFn: ({ newContent }: { newContent: string }) =>
      postRereplies(feedId, replyId, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedsKeys.rereplies(feedId, replyId)
      });
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

  const handleFormSubmit = handleSubmit(({ newContent }) => {
    rereplyMutation.mutate({ newContent });
  });

  if (rerepliesQuery.isError) return <>ReplyList에서 에러 발생.</>;
  if (rerepliesQuery.isLoading) return <>ReplyList 로딩 중...</>;

  const { ref: newContentRef, ...newContentRegisterRest } = register(
    "newContent",
    VALIDATION_RULE.replyContent
  );

  return (
    <Flex direction="column" gap="12px">
      <ReplyContent
        authorNickname={authorNickname}
        content={content}
        onReplyClick={() => {
          inputRef.current?.focus();
        }}
      />
      <Accordion allowToggle>
        <AccordionItem border="none" pl="32px">
          <AccordionButton>답글 더보기</AccordionButton>
          <AccordionPanel>
            <Flex direction="column" gap="12px">
              {rerepliesQuery.data.map(r => (
                <ReplyContent
                  key={r.replyId}
                  authorNickname={r.authorNickname}
                  content={r.content}
                  onReplyClick={() => {
                    inputRef.current?.focus();
                  }}
                />
              ))}
            </Flex>
            <form>
              <ReplyInput
                errorMessage={errors.newContent?.message}
                isInvalid={!!errors.newContent}
                onSendClick={handleFormSubmit}
                ref={e => {
                  newContentRef(e);
                  inputRef.current = e;
                }}
                {...newContentRegisterRest}
              />
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
