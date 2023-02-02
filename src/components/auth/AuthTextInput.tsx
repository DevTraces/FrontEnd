import { Input } from "@chakra-ui/react";

type AuthTextInputProps = React.ComponentProps<typeof Input>;

export default function AuthTextInput({ ...props }: AuthTextInputProps) {
  return <Input bg="white" size="lg" {...props} />;
}
