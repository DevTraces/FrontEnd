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
import { useRef } from "react";

type DeleteConfirmDialogProps = {
  title: string;
  isOpen: boolean;
  onClose?: () => void;
  onDelete?: () => void;
};

export default function DeleteConfirmDialog({
  title,
  isOpen,
  onClose = () => {},
  onDelete = () => {}
}: DeleteConfirmDialogProps) {
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
        <AlertDialogHeader>정말로 {title}을 삭제하시나요?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>삭제된 {title}은 복구 될 수 없어요!</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            취소
          </Button>
          <Button colorScheme="red" ml={3} onClick={onDelete}>
            삭제하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
