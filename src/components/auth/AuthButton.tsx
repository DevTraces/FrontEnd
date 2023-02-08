import { Button } from "@chakra-ui/react";

type AuthButtonProps = React.ComponentProps<typeof Button>;

export default function AuthButton({
  children,
  isDisabled = false,
  ...props
}: AuthButtonProps) {
  return (
    <Button
      w="full"
      size="lg"
      colorScheme="none"
      bg="primary"
      color="white"
      _hover={{ transform: isDisabled ? "none" : "scale(1.03)" }}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </Button>
  );
}
