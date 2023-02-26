import { Avatar, Button, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  image: FileList;
};

type ImageAddAvatarProps = {
  onImageInput: (image: File) => void;
  previewImg?: string;
};

export default function ImageAddAvatar({
  onImageInput,
  previewImg
}: ImageAddAvatarProps) {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { register, getValues } = useForm<FormData>();
  const { ref: formImageRef, ...profileImagesRegisterRest } = register(
    "image",
    {
      onChange: () => {
        onImageInput(getValues("image")[0]);
      }
    }
  );

  return (
    <form>
      <Avatar size="2xl" src={previewImg} />
      <Button
        variant="ghost"
        colorScheme="none"
        color="primary"
        type="button"
        onClick={() => {
          imageRef.current?.click();
        }}
      >
        사진 업로드
      </Button>

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
    </form>
  );
}
