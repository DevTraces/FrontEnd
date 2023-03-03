import { getRereplies } from "@/api/feeds/[feedId]/replies/[replyId]/rereplies";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useReply from "@/hooks/useReply";
import useRereply from "@/hooks/useRereply";
import feedsKeys from "@/queryKeys/feedsKeys";
import { ReplyData } from "@/types/data/reply";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import ReplyInput from "../ReplyInput";
import ReplyContent from "./components/ReplyContent";

type ReplyItemProps = {
  replyData: ReplyData;
};

type FormData = {
  newContent: string;
};
export default function ReplyItem({
  replyData: {
    feedId,
    replyId,
    authorNickname,
    content,
    authorProfileImageUrl,
    numberOfRereply,
    createdAt
  }
}: ReplyItemProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const openMoreBtnRef = useRef<HTMLButtonElement | null>(null);

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

  const {
    createMutation: createRereplyMutation,
    updateMutation: updateRereplyMutation,
    deleteMutation: deleteRereplyMutation
  } = useRereply(feedId, replyId);

  const {
    updateMutation: updateReplyMutation,
    deleteMutation: deleteReplyMutation
  } = useReply(feedId);

  const updateReply = (targetReplyId: number, newContent: string) =>
    updateReplyMutation.mutate({ replyId: targetReplyId, content: newContent });

  const deleteReply = (targetReplyId: number) =>
    deleteReplyMutation.mutate({ replyId: targetReplyId });

  const createRereply = (newContent: string) =>
    createRereplyMutation.mutate(
      { content: newContent },
      {
        onSuccess: () => {
          reset();
        }
      }
    );

  const updateRereply = (rereplyId: number, newContent: string) =>
    updateRereplyMutation.mutate({ rereplyId, content: newContent });

  const deleteRereply = (rereplyId: number) =>
    deleteRereplyMutation.mutate({ rereplyId });

  const handleFormSubmit = handleSubmit(({ newContent }) =>
    createRereply(newContent)
  );

  const { ref: newContentRef, ...newContentRegisterRest } = register(
    "newContent",
    VALIDATION_RULE.replyContent
  );

  return (
    <Flex direction="column" gap="12px">
      <ReplyContent
        authorNickname={authorNickname}
        authorProfileImageUrl={authorProfileImageUrl}
        content={content}
        createdAt={createdAt}
        onReply={async () => {
          await openMoreBtnRef.current?.click();
          inputRef.current?.focus();
        }}
        onDelete={() => deleteReply(replyId)}
        onEdit={newContent => updateReply(replyId, newContent)}
      />
      <Accordion allowToggle>
        <AccordionItem border="none" pl="32px">
          {({ isExpanded }) => (
            <>
              <AccordionButton
                display={numberOfRereply > 0 ? "flex" : "none"}
                ref={openMoreBtnRef}
                pl="24px"
                bg="none"
                _hover={{ backgroundColor: "none" }}
              >
                답글 {isExpanded ? "숨기기" : "더보기"}
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Flex direction="column" gap="12px">
                  {rerepliesQuery.data?.map(r => (
                    <ReplyContent
                      key={r.rereplyId}
                      authorProfileImageUrl={r.authorProfileImageUrl}
                      authorNickname={r.authorNickname}
                      content={r.content}
                      createdAt={r.createdAt}
                      onReply={() => {
                        inputRef.current?.focus();
                      }}
                      onDelete={() => deleteRereply(r.rereplyId)}
                      onEdit={newContent =>
                        updateRereply(r.rereplyId, newContent)
                      }
                    />
                  ))}
                </Flex>
                <form onSubmit={handleFormSubmit}>
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
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
