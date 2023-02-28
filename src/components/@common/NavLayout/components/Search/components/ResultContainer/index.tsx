import { VStack } from "@chakra-ui/react";

export default function ResultContainer({
  children
}: React.ComponentProps<typeof VStack>) {
  return (
    <VStack spacing="12px" alignItems="start">
      {children}
    </VStack>
  );
}
