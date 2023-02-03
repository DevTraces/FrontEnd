import { Icon, Square } from "@chakra-ui/react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ImageBoxProps = React.ComponentProps<typeof Square>;

export default function ImageBox({ children }: ImageBoxProps) {
  return (
    <Square position="relative" bg="white" size="120px" p={2} borderRadius="md">
      {children}
      <Icon
        as={FontAwesomeIcon}
        icon={faX}
        color="gray.300"
        position="absolute"
        top="8px"
        right="8px"
        size="sm"
      />
    </Square>
  );
}
