import ProfileAvatar from "@/components/@common/ProfileAvatar";
import DeleteConfirmDialog from "@/components/@common/FeedCard/components/DeleteConfirmDialog";
import MorePopover from "@/components/@common/FeedCard/components/MorePopover";
import ReplyEditModal from "@/components/@common/FeedCard/components/ReplyEditModal";
import { ReplyData } from "@/types/data/reply";
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "@/atoms/userAtom";

type ReplyContentProps = Pick<
  ReplyData,
  "authorNickname" | "content" | "authorProfileImageUrl"
> & {
  onReply: MouseEventHandler<HTMLButtonElement>;
  onDelete: () => void;
  onEdit: (newContent: string) => void;
};

export default function ReplyContent({
  authorNickname,
  authorProfileImageUrl,
  content,
  onReply,
  onDelete,
  onEdit
}: ReplyContentProps) {
  const user = useRecoilValue(userAtom);
  const router = useRouter();
  const userProfileLink = `/user/${authorNickname}/posts`;
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure();

  return (
    <>
      <DeleteConfirmDialog
        title="댓글"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onDelete={() => {
          onDelete();
          onAlertClose();
        }}
      />
      <ReplyEditModal
        authorNickname={authorNickname}
        defaultValue={content}
        isOpen={isEditOpen}
        onClose={onEditClose}
        onPublish={newContent => {
          onEdit(newContent);
          onEditClose();
        }}
      />

      <HStack alignItems="flex-start">
        <ProfileAvatar
          src={authorProfileImageUrl}
          size="40px"
          alt="프로필 이미지"
          onClick={() => router.push(userProfileLink)}
        />
        <Flex w="full" direction="column" alignItems="start">
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
            <Text
              onClick={() => router.push(userProfileLink)}
              mr={2}
              fontWeight="bold"
              cursor="pointer"
            >
              {authorNickname}
            </Text>
            <Text textAlign="left">{content}</Text>
            <Box position="absolute" top="0" right="0">
              {user.nickname === authorNickname && (
                <MorePopover
                  onDeleteClick={onAlertOpen}
                  onEditClick={onEditOpen}
                />
              )}
            </Box>
          </VStack>
          <Button variant="ghost" size="sm" onClick={onReply}>
            답글 달기
          </Button>
        </Flex>
      </HStack>
    </>
  );
}
