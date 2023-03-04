import useSearch from "@/hooks/useSearch";
import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner
} from "@chakra-ui/react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState
} from "react";

type InputContainerProps = React.ComponentProps<typeof InputGroup>;

export default function InputContainer({ ...restProps }: InputContainerProps) {
  const [leftMark, setLeftMark] = useState(" ");
  const { searchValue, changeType, search } = useSearch();
  const [value, setValue] = useState(searchValue.value);

  useEffect(() => {
    if (leftMark !== "@" && searchValue.type === "nickname") setLeftMark("@");
    if (leftMark !== "#" && searchValue.type === "tag") setLeftMark("#");
    if (leftMark !== " " && searchValue.type === "username") setLeftMark(" ");
  }, [searchValue, setLeftMark, leftMark]);
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    const newValue = e.target.value;

    if (newValue.startsWith("@")) {
      setLeftMark("@");
      changeType("nickname");
      setValue(newValue.slice(1));
      search(newValue.slice(1));
    } else if (newValue.startsWith("#")) {
      setLeftMark("#");
      changeType("tag");
      setValue(newValue.slice(1));
      search(newValue.slice(1));
    } else {
      setValue(newValue);
      search(newValue);
    }
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (value === "" && (e.key === "Backspace" || e.key === "Delete")) {
      changeType("username");
      setLeftMark("");
    }
  };

  const handleResetClick = () => {
    setValue("");
    search("");
  };

  const getPlaceholder = () => {
    switch (searchValue.type) {
      case "username":
        return "유저의 이름을 입력해주세요";
      case "nickname":
        return "닉네임을 입력해주세요";
      case "tag":
        return "태그를 입력해주세요";
      default:
        return "검색하기";
    }
  };

  return (
    <InputGroup data-type="navItem" {...restProps}>
      <InputLeftElement pointerEvents="none">{leftMark}</InputLeftElement>
      <Input
        type="text"
        bg="gray.200"
        placeholder={getPlaceholder()}
        value={value}
        focusBorderColor="primary"
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />

      <InputRightElement onClick={handleResetClick}>
        {searchValue.isTyping ? (
          <Spinner
            boxSize="16px"
            thickness="2px"
            speed="0.7s"
            emptyColor="gray.200"
            color="primary"
          />
        ) : (
          <Icon as={FontAwesomeIcon} icon={faCircleXmark} color="gray.300" />
        )}
      </InputRightElement>
    </InputGroup>
  );
}
