import { Icon, Button } from "@chakra-ui/react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TagButtonProps = React.ComponentProps<typeof Button>;

export default function TagButton({ children }: TagButtonProps) {
  return (
    <Button position="relative" pr={8}>
      {children}
      <Icon
        as={FontAwesomeIcon}
        icon={faX}
        color="gray.400"
        position="absolute"
        size="xs"
        right={3}
      />
    </Button>
  );
}
