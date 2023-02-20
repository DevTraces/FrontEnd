import { VStack } from "@chakra-ui/react";

export default function ResultContainer({
  children
}: React.ComponentProps<typeof VStack>) {
  return (
    <VStack spacing="5" alignItems="start">
      {children}
    </VStack>
  );
}
