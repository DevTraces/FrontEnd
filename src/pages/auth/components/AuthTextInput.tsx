import { Input } from "@chakra-ui/react";

type AuthTextInputProps = React.ComponentProps<typeof Input>;

export default function AuthTextInput({ ...props }: AuthTextInputProps) {
  return <Input bg="gray.400" {...props} />;
}
