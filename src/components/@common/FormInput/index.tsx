import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react";
import { ComponentProps, forwardRef } from "react";

type AuthTextInputProps = {
  isInvalid: boolean;
  errorMessage: string;
  placeholder: string;
  isTextarea?: boolean;
  labelText?: string;
  helperText?: JSX.Element;
  leftAddon?: JSX.Element;
} & ComponentProps<typeof Input>;

export default forwardRef<HTMLInputElement, AuthTextInputProps>(
  (
    {
      isInvalid,
      helperText,
      labelText,
      placeholder,
      errorMessage,
      leftAddon,
      ...restProps
    },
    ref
  ) => (
    <FormControl isInvalid={isInvalid}>
      {labelText && <FormLabel lineHeight={10}>{labelText}</FormLabel>}
      <InputGroup size="lg">
        {leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
        <Input
          roundedLeft={leftAddon ? "none" : "rounded"}
          ref={ref}
          bg="white"
          size="lg"
          placeholder={placeholder}
          {...restProps}
        />
      </InputGroup>
      {!isInvalid ? (
        <FormHelperText opacity={helperText ? "1" : "0"} w="full" h="20px">
          {helperText ?? `${placeholder}를 입력해야해요`}
        </FormHelperText>
      ) : (
        <FormErrorMessage w="full" h="20px">
          {errorMessage}
        </FormErrorMessage>
      )}
    </FormControl>
  )
);
