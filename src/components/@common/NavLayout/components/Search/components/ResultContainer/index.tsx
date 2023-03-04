import { VStack } from "@chakra-ui/react";

export default function ResultContainer({
  children,
  ...restProps
}: React.ComponentProps<typeof VStack>) {
  return (
    <VStack w="full" spacing="12px" alignItems="start" {...restProps}>
      {children}
    </VStack>
  );
}
