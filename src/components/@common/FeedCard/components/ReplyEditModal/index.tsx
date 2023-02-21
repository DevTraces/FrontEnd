import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea
} from "@chakra-ui/react";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";

type ReplyEditModalProps = {
  authorNickname: string;
  defaultValue: string;
  onPublish: (content: string) => void;
} & Omit<ComponentProps<typeof Modal>, "children">;
export default function ReplyEditModal({
  authorNickname,
  defaultValue,
  onPublish,
  ...restProps
}: ReplyEditModalProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm<{ content: string }>();

  return (
    <Modal isCentered {...restProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>{authorNickname}</ModalHeader>
        <ModalBody>
          <Textarea
            {...register("content", { required: true })}
            defaultValue={defaultValue}
          />
        </ModalBody>
        <ModalFooter gap="12px">
          <Button>취소</Button>
          <Button
            type="submit"
            isDisabled={!isValid}
            bg="primary"
            color="white"
            colorScheme="purple"
            onClick={handleSubmit(({ content }) => onPublish(content))}
          >
            수정
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
