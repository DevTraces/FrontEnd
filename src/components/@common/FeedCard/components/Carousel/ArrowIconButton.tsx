import { Button, Icon } from "@chakra-ui/react";
import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ArrowIconButtonProps = {
  direction: "left" | "right";
  handleArrowClick: (direction: "left" | "right") => void;
} & React.ComponentProps<typeof Button>;

export default function ArrowIconButton({
  direction,
  handleArrowClick
}: ArrowIconButtonProps) {
  return (
    <Button
      position="absolute"
      top="50%"
      translateY="-50%"
      style={direction === "left" ? { left: 5 } : { right: 5 }}
      _hover={{ bg: "none" }}
      bg="none"
      onClick={() => handleArrowClick(direction)}
    >
      <Icon
        as={FontAwesomeIcon}
        color="gray.300"
        _hover={{ color: "white" }}
        fill="white"
        icon={direction === "left" ? faChevronCircleLeft : faChevronCircleRight}
        w={5}
        h={5}
      />
    </Button>
  );
}
