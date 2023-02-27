import {
  Button,
  Circle,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import ProfileAvatar from "../ProfileAvatar";

type FormData = {
  image: FileList;
};

type ProfileAvatarEditProps = {
  onImageInput: (image: File) => void;
  onImageDelete: () => void;
  previewImg: string;
  isLoading?: boolean;
};

export default function ProfileAvatarEdit({
  onImageInput,
  onImageDelete,
  previewImg,
  isLoading = false
}: ProfileAvatarEditProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const imageRef = useRef<HTMLInputElement | null>(null);
  const { register, getValues } = useForm<FormData>();
  const { ref: formImageRef, ...profileImagesRegisterRest } = register(
    "image",
    {
      onChange: () => {
        onImageInput(getValues("image")[0]);
        onClose();
      }
    }
  );

  return (
    <>
      <VStack>
        {isLoading ? (
          <Circle size="120px">
            <Spinner boxSize="80px" />
          </Circle>
        ) : (
          <ProfileAvatar size="120px" alt="프로필 이미지" src={previewImg} />
        )}

        <VStack>
          <Popover isOpen={isOpen} onClose={onClose} placement="right-end">
            <PopoverTrigger>
              <Button bg="white" onClick={onOpen}>
                프로필 이미지 변경
              </Button>
            </PopoverTrigger>
            <PopoverContent w="200px" overflow="hidden">
              <Button
                rounded="none"
                bg="white"
                py="28px"
                onClick={() => imageRef.current?.click()}
              >
                새 이미지 업로드
              </Button>
              <Button
                py="28px"
                rounded="none"
                colorScheme="red"
                variant="ghost"
                onClick={() => {
                  onImageDelete();
                  onClose();
                }}
              >
                이미지 삭제
              </Button>
            </PopoverContent>
          </Popover>
        </VStack>
      </VStack>
      <Input
        type="file"
        display="none"
        accept="image/*"
        {...profileImagesRegisterRest}
        ref={e => {
          formImageRef(e);
          imageRef.current = e;
        }}
      />
    </>
  );
}
