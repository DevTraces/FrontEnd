import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text
} from "@chakra-ui/react";
import { useState } from "react";

export default function Comment({ comments }: { comments: any[] }) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton
          p={0}
          onClick={() => {
            setIsCommentOpen(prev => !prev);
          }}
        >
          <Box>
            댓글 {isCommentOpen ? "숨기기" : `${comments.length}개 모두 보기`}
          </Box>
        </AccordionButton>
        {comments.map(({ nickname, content }) => (
          <AccordionPanel p={0} pb={4}>
            <Flex>
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
