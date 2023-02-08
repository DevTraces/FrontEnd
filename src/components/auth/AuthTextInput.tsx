import { Input } from "@chakra-ui/react";
import { ComponentProps, forwardRef } from "react";

type AuthTextInputProps = ComponentProps<typeof Input>;

export default forwardRef<HTMLInputElement, AuthTextInputProps>(
  (props, ref) => <Input ref={ref} bg="white" size="lg" {...props} />
);
