import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react";
import { ComponentProps, forwardRef } from "react";

type AuthTextInputProps = {
  isInvalid: boolean;
  errorMessage: string;
  placeholder: string;
  helperText?: string;
  leftAddon?: JSX.Element;
} & ComponentProps<typeof Input>;

export default forwardRef<HTMLInputElement, AuthTextInputProps>(
  (
    {
      isInvalid,
      helperText,
      placeholder,
      errorMessage,
      leftAddon,
      ...restProps
    },
    ref
  ) => (
    <FormControl isInvalid={isInvalid}>
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
