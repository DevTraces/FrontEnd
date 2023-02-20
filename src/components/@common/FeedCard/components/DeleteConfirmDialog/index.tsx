import feedAtom from "@/atoms/feedAtom";
import userAtom from "@/atoms/userAtom";
import useFeed from "@/hooks/useFeed";
import feedsKeys from "@/queryKeys/feedsKeys";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useRecoilValue } from "recoil";

type DeleteConfirmDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

export default function DeleteConfirmDialog({
  isOpen,
  onClose = () => {},
  onConfirm = () => {}
}: DeleteConfirmDialogProps) {
  const user = useRecoilValue(userAtom);
  const { feedId } = useRecoilValue(feedAtom);
  const queryClient = useQueryClient();

  const { delete: deleteFeed } = useFeed({
    onDelete: () => {
      queryClient.invalidateQueries(feedsKeys.feeds(user.nickname));
    }
  });

  const cancelRef = useRef(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>정말로 게시물을 삭제하시나요?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>삭제된 게시물은 복구 될 수 없어요!</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            취소
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={() => {
              deleteFeed(feedId);
              onConfirm();
            }}
          >
            삭제하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
