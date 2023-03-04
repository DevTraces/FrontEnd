import { Icon, IconButton, Square } from "@chakra-ui/react";
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
      bg="gray.900"
      size="120px"
      p={2}
      borderRadius="md"
      {...restProps}
    >
      <IconButton
        onClick={onRemoveClick}
        icon={<Icon as={FontAwesomeIcon} icon={faX} />}
        position="absolute"
        top="8px"
        right="8px"
        size="xs"
        zIndex="docked"
        cursor="pointer"
        aria-label="이미지 삭제"
      />
      <Image
        src={imageUrl}
        fill
        alt="이미지 미리보기"
        style={{ objectFit: "contain" }}
      />
    </Square>
  );
}
