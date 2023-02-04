import { Button, Icon } from "@chakra-ui/react";
import {
  faCircleArrowLeft,
  faCircleArrowRight
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
      color="gray.300"
      bg="none"
      _hover={{ bg: "none" }}
      onClick={() => handleArrowClick(direction)}
    >
      <Icon
        as={FontAwesomeIcon}
        icon={direction === "left" ? faCircleArrowLeft : faCircleArrowRight}
        w={5}
        h={5}
      />
    </Button>
  );
}
