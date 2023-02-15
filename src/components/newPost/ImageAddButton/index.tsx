import { Button, Icon, Input } from "@chakra-ui/react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  image: FileList;
};

type ImageAddButtonProps = {
  onImageInput: (image: File) => void;
};

export default function ImageAddButton({ onImageInput }: ImageAddButtonProps) {
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
      <Button
        bg="white"
        colorScheme="whiteAlpha"
        color="black"
        onClick={() => {
          imageRef.current?.click();
        }}
        leftIcon={
          <Icon
            as={FontAwesomeIcon}
            icon={faImage}
            color="currentcolor"
            pr={2}
          />
        }
      >
        이미지 추가
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
