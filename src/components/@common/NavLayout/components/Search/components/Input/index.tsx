import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import { faSearch, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SearchContext } from "../../../../SearchContext";

type InputContainerProps = React.ComponentProps<typeof InputGroup>;

export default function InputContainer({ ...restProps }: InputContainerProps) {
  const { search, setSearch } = useContext(SearchContext);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setSearch(e.target.value);
  };

  const handleResetClick = () => {
    setSearch("");
  };

  return (
    <InputGroup data-type="navItem" {...restProps}>
      <InputLeftElement pointerEvents="none">
        <Icon as={FontAwesomeIcon} icon={faSearch} color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        bg="gray.200"
        placeholder="검색"
        value={search}
        onChange={handleInputChange}
      />
      <InputRightElement onClick={handleResetClick}>
        <Icon as={FontAwesomeIcon} icon={faCircleXmark} color="gray.300" />
      </InputRightElement>
    </InputGroup>
  );
}
