import { Button } from "@chakra-ui/react";

type AuthButtonProps = React.ComponentProps<typeof Button>;

export default function AuthButton({ children, ...props }: AuthButtonProps) {
  return (
    <Button
      w="full"
      size="lg"
      colorScheme="none"
      bg="primary"
      color="white"
      {...props}
      _hover={{ transform: "scale(1.1)" }}
    >
      {children}
    </Button>
  );
}
