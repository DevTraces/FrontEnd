import DeleteConfirmDialog from "@/components/@common/FeedCard/components/DeleteConfirmDialog";
import MorePopover from "@/components/@common/FeedCard/components/MorePopover";
import { ReplyData } from "@/types/data/reply";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";

type ReplyContentProps = Pick<ReplyData, "authorNickname" | "content"> & {
  onReplyClick: MouseEventHandler<HTMLButtonElement>;
  onDeleteClick: () => void;
  onEditClick: () => void;
};

export default function ReplyContent({
  authorNickname,
  content,
  onReplyClick,
  onDeleteClick,
  onEditClick
}: ReplyContentProps) {
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();

  return (
    <>
      <DeleteConfirmDialog
        title="댓글"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onDelete={() => {
          onDeleteClick();
          onAlertClose();
        }}
      />

      <HStack alignItems="flex-start">
        <Avatar boxSize="40px" />
        <Box w="full">
          <VStack
            alignItems="flex-start"
            bg="gray.100"
            rounded="4px"
            pt="8px"
            pb="12px"
            px="8px"
            width="full"
            position="relative"
          >
            <Text mr={2} fontWeight="bold">
              {authorNickname}
            </Text>
            <Text textAlign="left">{content}</Text>
            <Box position="absolute" top="0" right="0">
              <MorePopover
                onDeleteClick={onAlertOpen}
                onEditClick={onEditClick}
              />
            </Box>
          </VStack>
          <Button variant="ghost" size="sm" onClick={onReplyClick}>
            답글 달기
          </Button>
        </Box>
      </HStack>
    </>
  );
}
