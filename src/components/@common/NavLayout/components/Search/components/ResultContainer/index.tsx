import { VStack } from "@chakra-ui/react";

export default function ResultContainer({
  children
}: React.ComponentProps<typeof VStack>) {
  return (
    <VStack w="full" spacing="12px" alignItems="start">
      {children}
    </VStack>
  );
}
