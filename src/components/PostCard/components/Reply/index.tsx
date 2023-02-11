import { getReplies } from "@/api/feeds/[feedId]/replies";
import { getRereplies } from "@/api/feeds/[feedId]/replies/[replyId]/rereplies";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Text
} from "@chakra-ui/react";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReplyItem from "./ReplyItem";

type ReplyListProps = {
  feedId: number;
  replyId?: number | null;
};

export default function ReplyList({ feedId, replyId = null }: ReplyListProps) {
  const [isReplyListOpen, setIsReplyListOpen] = useState(false);
  const isRereply = replyId !== null;

  const repliesQuery = useQuery({
    queryKey: ["replies", feedId, replyId] as const,
    queryFn: ({ queryKey }) => {
      if (isRereply) return getRereplies(queryKey[1], queryKey[2]);
      return getReplies(queryKey[1]);
    }
  });

  if (repliesQuery.isError) return <>ReplyList에서 에러 발생.</>;
  if (repliesQuery.isLoading) return <>ReplyList 로딩 중...</>;

  return (
    <Accordion allowToggle mt="12px">
      <AccordionItem border="none">
        <AccordionButton
          p={0}
          onClick={() => {
            setIsReplyListOpen(i => !i);
          }}
        >
          <HStack py="8px" color="gray">
            {isRereply && <Divider w="50px" borderColor="gray" />}
            <Button as={HStack} bg="none" w="fit-content">
              <Icon as={FontAwesomeIcon} icon={faComment} />
              <Text>
                {isRereply ? "답글" : "댓글"}
                {isReplyListOpen
                  ? " 숨기기"
                  : ` ${repliesQuery.data.length}개 모두 보기`}
              </Text>
            </Button>
          </HStack>
        </AccordionButton>
        <AccordionPanel p={0} ml={isRereply ? "50px" : "0"}>
          <Flex direction="column">
            {repliesQuery.data.map(
              ({
                replyId: referenceReplyId,
                authorNickname,
                content,
                numberOfRereply
              }) => (
                <Box key={authorNickname}>
                  <ReplyItem nickname={authorNickname} content={content} />
                  {numberOfRereply > 0 && !isRereply && (
                    <ReplyList feedId={feedId} replyId={referenceReplyId} />
                  )}
                </Box>
              )
            )}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
