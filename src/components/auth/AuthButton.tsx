import { Button } from "@chakra-ui/react";

type AuthButtonProps = React.ComponentProps<typeof Button>;

export default function AuthButton({ children, ...props }: AuthButtonProps) {
  return (
    <Button w="full" {...props}>
      {children}
    </Button>
  );
}