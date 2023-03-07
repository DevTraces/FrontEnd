import { Center, Container, VStack } from "@chakra-ui/react";

type FormLayoutProps = React.ComponentProps<typeof Container>;

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <Container centerContent pt={{ base: "0", md: "100px" }}>
      <Center>
        <VStack
          borderRadius="md"
          w={{ base: "100vw", md: "md" }}
          h={{ base: "100vh", md: "inherit" }}
          bg="white"
          gap="40px"
          p={10}
        >
          {children}
        </VStack>
      </Center>
    </Container>
  );
}
