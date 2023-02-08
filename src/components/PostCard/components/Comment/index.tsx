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
import { ComponentProps, useState } from "react";
import CommentItem from "./CommentItem";

type CommentItemProps = {
  nickname: string;
  content: string;
  nestedComments?: CommentItemProps[];
};

type CommentProps = {
  comments: CommentItemProps[];
  step?: 0 | 1;
} & ComponentProps<typeof Accordion>;

export default function Comment({
  comments,
  step = 0,
  ...restProps
}: CommentProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const isNested = step === 1;

  return (
    <Accordion allowToggle {...restProps}>
      <AccordionItem border="none">
        <AccordionButton
          p={0}
          onClick={() => {
            setIsCommentOpen(prev => !prev);
          }}
        >
          <HStack py="8px" color="gray">
            {isNested && <Divider w="50px" borderColor="gray" />}
            <Button as={HStack} bg="none" w="fit-content">
              <Icon as={FontAwesomeIcon} icon={faComment} />
              <Text>
                {isNested ? "답글 " : "댓글 "}
                {isCommentOpen ? "숨기기" : `${comments.length}개 모두 보기`}
              </Text>
            </Button>
          </HStack>
        </AccordionButton>
        <AccordionPanel p={0} ml={isNested ? "50px" : "0"}>
          <Flex direction="column">
            {comments.map(({ nickname, content, nestedComments = [] }) => (
              <Box key={nickname}>
                <CommentItem nickname={nickname} content={content} />
                {nestedComments.length > 0 && (
                  <Comment comments={nestedComments} step={1} />
                )}
              </Box>
            ))}
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
