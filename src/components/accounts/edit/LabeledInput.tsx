import {
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text
} from "@chakra-ui/react";

type LabeledInputProps = {
  isError: boolean;
  labelText: string;
  helperText: string;
  ErrorText: string;
  defaultValue: string;
};

export default function LabeledInput({
  isError,
  labelText,
  helperText,
  ErrorText,
  defaultValue
}: LabeledInputProps) {
  return (
    <FormLabel lineHeight={10}>
      <Text>{labelText}</Text>
      <Input
        defaultValue={defaultValue}
        bg="white"
        rounded="12px"
        px="12px"
        size="lg"
        fontSize="md"
      />

      {!isError ? (
        <FormHelperText color="gray.500">{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{ErrorText}</FormErrorMessage>
      )}
    </FormLabel>
  );
}
