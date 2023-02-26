import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea
} from "@chakra-ui/react";
import { ComponentProps, forwardRef } from "react";

type AuthTextInputProps = {
  isInvalid: boolean;
  errorMessage: string;
  placeholder: string;
  labelText?: string;
  helperText?: string;
} & ComponentProps<typeof Textarea>;

export default forwardRef<HTMLTextAreaElement, AuthTextInputProps>(
  (
    {
      isInvalid,
      helperText,
      labelText,
      placeholder,
      errorMessage,
      ...restProps
    },
    ref
  ) => (
    <FormControl isInvalid={isInvalid}>
      {labelText && <FormLabel lineHeight={10}>{labelText}</FormLabel>}
      <Textarea
        ref={ref}
        bg="white"
        size="lg"
        placeholder={placeholder}
        {...restProps}
      />
      {!isInvalid ? (
        <FormHelperText opacity={helperText ? "1" : "0"} w="full" h="40px">
          {helperText ?? `${placeholder}를 입력해야해요`}
        </FormHelperText>
      ) : (
        <FormErrorMessage w="full" h="40px">
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  )
);
