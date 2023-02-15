import { Button, ButtonProps, Icon, IconProps } from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentProps } from "react";

type PopoverIconButtonProps = {
  icon: typeof faTrash;
  color?: IconProps["color"];
  colorScheme?: ButtonProps["colorScheme"];
} & ComponentProps<typeof Button>;

export default function PopoverIconButton({
  icon,
  color = "black",
  colorScheme = "gray",
  children,
  ...restProps
}: PopoverIconButtonProps) {
  return (
    <Button
      size="md"
      h="80px"
      pl="40px"
      variant="ghost"
      rounded="none"
      w="full"
      justifyContent="left"
      bg="white"
      color={color}
      colorScheme={colorScheme}
      leftIcon={<Icon as={FontAwesomeIcon} icon={icon} color={color} />}
      {...restProps}
    >
      {children}
    </Button>
  );
}
