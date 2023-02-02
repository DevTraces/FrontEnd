import { Button, Text, Icon } from "@chakra-ui/react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconTextButtonProps = {
  icon: IconDefinition;
  text: string;
};

export default function IconTextButton({ icon, text }: IconTextButtonProps) {
  return (
    <Button>
      <Icon as={FontAwesomeIcon} icon={icon} color="gray.500" pr={2} />
      <Text>{text}</Text>
    </Button>
  );
}
