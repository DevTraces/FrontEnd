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

type ReplyData = {
  replyId: number;
  feedId: number;
  authorNickname: string;
  content: string;
  authorProfileImageUrl: string;
  numberOfRereply: number;
  createdAt: Date;
  modifiedAt: Date;
};

type ReplyListProps = {
  feedId: number;
  replyId?: number | null;
};

export default function ReplyList({ feedId, replyId = null }: ReplyListProps) {
  const [isReplyListOpen, setIsReplyListOpen] = useState(false);
  const isRereply = replyId !== null;
  const REPLY_API = isRereply
    ? `/api/feeds/${feedId}/replies/${replyId}/rereplies`
    : `/api/feeds/${feedId}/replies`;

  const getReplies = async (): Promise<ReplyData[]> => {
    const response = await fetch(REPLY_API);
    const data = await response.json();

    return data;
  };

  const query = useQuery({
    queryKey: ["comments", feedId, replyId],
    queryFn: getReplies
  });

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
                {!query.isLoading &&
                  (isReplyListOpen
                    ? " 숨기기"
                    : ` ${query.data?.length}개 모두 보기`)}
              </Text>
            </Button>
          </HStack>
        </AccordionButton>
        <AccordionPanel p={0} ml={isRereply ? "50px" : "0"}>
          <Flex direction="column">
            {query.data?.map(
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
