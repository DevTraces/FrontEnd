import { Button } from "@chakra-ui/react";
import { ComponentProps } from "react";

type FormButtonProps = {
  isDisabled: boolean;
  isLoading: boolean;
} & ComponentProps<typeof Button>;

export default function FormButton({
  children,
  isDisabled = false,
  isLoading = false,
  ...props
}: FormButtonProps) {
  return (
    <Button
      type="submit"
      w="full"
      size="lg"
      colorScheme="none"
      bg="primary"
      color="white"
      _hover={{ transform: isDisabled ? "none" : "scale(1.03)" }}
      isDisabled={isDisabled}
      isLoading={isLoading}
      {...props}
    >
      {children}
    </Button>
  );
}
