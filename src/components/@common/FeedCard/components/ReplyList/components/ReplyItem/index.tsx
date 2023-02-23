import { getRereplies } from "@/api/feeds/[feedId]/replies/[replyId]/rereplies";
import VALIDATION_RULE from "@/constants/auth/VALIDATION_RULE";
import useReply from "@/hooks/useReply";
import useRereply from "@/hooks/useRereply";
import feedsKeys from "@/queryKeys/feedsKeys";
import { ReplyData } from "@/types/data/reply";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
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
    create: createRereply,
    update: updateRereply,
    delete: deleteRereply
  } = useRereply(feedId, replyId, {
    onCreate: () => {
      reset();
    }
  });

  const { update: updateReply, delete: deleteReply } = useReply(feedId);

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
        content={content}
        onReply={async () => {
          await openMoreBtnRef.current?.click();
          inputRef.current?.focus();
        }}
        onDelete={() => deleteReply(replyId)}
        onEdit={newContent => updateReply(replyId, newContent)}
      />
      <Accordion allowToggle>
        <AccordionItem border="none" pl="32px">
          <AccordionButton ref={openMoreBtnRef}>답글 더보기</AccordionButton>
          <AccordionPanel>
            <Flex direction="column" gap="12px">
              {rerepliesQuery.data?.map(r => (
                <ReplyContent
                  key={r.rereplyId}
                  authorNickname={r.authorNickname}
                  content={r.content}
                  onReply={() => {
                    inputRef.current?.focus();
                  }}
                  onDelete={() => deleteRereply(r.rereplyId)}
                  onEdit={newContent => updateRereply(r.rereplyId, newContent)}
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
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
