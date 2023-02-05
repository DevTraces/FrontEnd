import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text
} from "@chakra-ui/react";
import { ComponentProps, useState } from "react";

type CommentProps = { comments: any[] } & ComponentProps<typeof Accordion>;

export default function Comment({ comments, ...restProps }: CommentProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <Accordion allowToggle {...restProps}>
      <AccordionItem border="none">
        <AccordionButton
          p={0}
          onClick={() => {
            setIsCommentOpen(prev => !prev);
          }}
        >
          <Box py="8px" color="gray">
            댓글 {isCommentOpen ? "숨기기" : `${comments.length}개 모두 보기`}
          </Box>
        </AccordionButton>
        {comments.map(({ nickname, content }) => (
          <AccordionPanel p={0} pb={4}>
            <Flex direction="column">
              <Text mr={2} fontWeight="bold">
                {nickname}
              </Text>
              <Text>{content}</Text>
            </Flex>
          </AccordionPanel>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
