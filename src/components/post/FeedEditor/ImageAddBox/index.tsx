import { Button, Center, Icon, Input } from "@chakra-ui/react";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  image: FileList;
};

type ImageAddBoxProps = {
  onImageInput: (image: File) => void;
};

const ACCEPTABLE_IMAGE_FORMATS = [
  "gif",
  "png",
  "jpg",
  "jpeg",
  "bmp",
  "webp",
  "GIF",
  "PNG",
  "JPG",
  "JPEG",
  "BMP",
  "WebP",
  "WEBP"
];

export default function ImageAddBox({ onImageInput }: ImageAddBoxProps) {
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
      <Center
        onClick={() => {
          imageRef.current?.click();
        }}
        w="120px"
        h="120px"
        fontSize="md"
        textAlign="center"
        p="10px"
        borderRadius="md"
        flexDirection="column"
        aria-label="이미지 추가"
        as={Button}
        pos="relative"
        colorScheme="blackAlpha"
      >
        <Icon as={FontAwesomeIcon} icon={faImage} boxSize="30px" />
        <Icon
          as={FontAwesomeIcon}
          icon={faPlus}
          pos="absolute"
          top="30px"
          right="30px"
        />
      </Center>

      <Input
        type="file"
        display="none"
        accept={ACCEPTABLE_IMAGE_FORMATS.map(ext => `image/${ext}`).join(", ")}
        {...profileImagesRegisterRest}
        ref={e => {
          formImageRef(e);
          imageRef.current = e;
        }}
      />
    </form>
  );
}
