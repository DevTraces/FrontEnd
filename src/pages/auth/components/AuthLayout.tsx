import { Container, VStack } from "@chakra-ui/react";

type AuthLayoutProps = React.ComponentProps<typeof Container>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Container centerContent p={10}>
      <VStack borderRadius="md" w="sm" m="auto" bg="white" gap={10} p={10}>
        {children}
      </VStack>
    </Container>
  );
}
