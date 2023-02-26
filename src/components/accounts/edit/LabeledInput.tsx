import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text
} from "@chakra-ui/react";
import { forwardRef } from "react";

type LabeledInputProps = {
  isError: boolean;
  labelText: string;
  helperText: string;
  ErrorText: string;
  defaultValue: string;
};
export default forwardRef<HTMLInputElement, LabeledInputProps>(
  (
    { isError, labelText, helperText, ErrorText, defaultValue, ...restProps },
    ref
  ) => {
    return (
      <FormControl isInvalid={isError}>
        <FormLabel lineHeight={10}>
          <Text>{labelText}</Text>
          <Input
            defaultValue={defaultValue}
            bg="white"
            rounded="12px"
            px="12px"
            size="lg"
            fontSize="md"
            ref={ref}
            {...restProps}
          />

          {!isError ? (
            <FormHelperText color="gray.500" w="full" h="40px">
              {helperText}
            </FormHelperText>
          ) : (
            <FormErrorMessage w="full" h="40px">
              {ErrorText}
            </FormErrorMessage>
          )}
        </FormLabel>
      </FormControl>
    );
  }
);
