import { Square, Icon } from "@chakra-ui/react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ImageBoxProps = React.ComponentProps<typeof Square>;

export default function ImageBox({ children }: ImageBoxProps) {
  return (
    <Square
      position="relative"
      border="1px"
      borderColor="gray.300"
      size={100}
      p={2}
      borderRadius="md"
    >
      {children}
      <Icon
        as={FontAwesomeIcon}
        icon={faX}
        color="gray.400"
        position="absolute"
        top={2}
        right={2}
        size="xs"
      />
    </Square>
  );
}
