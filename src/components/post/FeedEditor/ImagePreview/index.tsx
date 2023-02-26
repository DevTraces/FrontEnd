import { Icon, Square } from "@chakra-ui/react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ComponentProps } from "react";

type ImageBoxProps = {
  imageUrl: string;
  onRemoveClick: () => void;
} & ComponentProps<typeof Square>;

export default function ImagePreview({
  imageUrl,
  onRemoveClick,
  ...restProps
}: ImageBoxProps) {
  return (
    <Square
      position="relative"
      bg="white"
      size="120px"
      p={2}
      borderRadius="md"
      {...restProps}
    >
      <Icon
        onClick={onRemoveClick}
        as={FontAwesomeIcon}
        icon={faX}
        color="gray.300"
        position="absolute"
        top="8px"
        right="8px"
        size="sm"
        zIndex="docked"
        cursor="pointer"
      />
      <Image src={imageUrl} fill alt="이미지 미리보기" />
    </Square>
  );
}
