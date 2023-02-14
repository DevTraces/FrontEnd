import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import { faPaperPlane, faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ComponentProps, forwardRef, MouseEventHandler } from "react";

type ReplyInputProps = {
  feedId: number;
  isInvalid: boolean;
  onSendClick: MouseEventHandler<HTMLDivElement>;
  errorMessage: string;
} & ComponentProps<typeof Input>;

export default forwardRef<HTMLInputElement, ReplyInputProps>(
  ({ isInvalid, feedId, onSendClick, errorMessage, ...restProps }, ref) => {
    return (
      <>
        <InputGroup>
          <InputLeftElement>
            <Icon as={FontAwesomeIcon} icon={faSmile} color="gray.300" />
          </InputLeftElement>
          <Input
            variant="filled"
            focusBorderColor="white"
            bg="white"
            placeholder="댓글 달기..."
            _hover={{ bg: "none" }}
            ref={ref}
            {...restProps}
          />
          <InputRightElement onClick={onSendClick}>
            <Icon
              as={FontAwesomeIcon}
              icon={faPaperPlane}
              color={isInvalid ? "gray.300" : "primary"}
            />
          </InputRightElement>
        </InputGroup>
        {errorMessage}
      </>
    );
  }
);
