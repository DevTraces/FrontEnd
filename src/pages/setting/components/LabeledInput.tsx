import {
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Text
} from "@chakra-ui/react";

type LabeledInputProps = {
  isError: boolean;
  labelText: string;
  helperText: string;
  ErrorText: string;
};

export default function LabeledInput({
  isError,
  labelText,
  helperText,
  ErrorText
}: LabeledInputProps) {
  return (
    <FormLabel lineHeight={10}>
      <Text>{labelText}</Text>
      <Input type="text" placeholder={labelText} />
      {!isError ? (
        <FormHelperText color="gray.500">{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{ErrorText}</FormErrorMessage>
      )}
    </FormLabel>
  );
}
