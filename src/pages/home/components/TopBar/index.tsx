import {
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Text,
  Box
} from "@chakra-ui/react";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopBar() {
  return (
    <Flex
      position="fixed"
      zIndex={50}
      direction="row"
      top={0}
      left={0}
      w="100vw"
      h={30}
      bg="white"
      align="center"
      py={8}
      px={4}
      display={{
        sm: "flex",
        md: "none"
      }}
    >
      <Box mr={20}>
        <Text fontSize="3xl">Arterest</Text>
      </Box>
      <InputGroup mr={10}>
        <InputLeftElement pointerEvents="none">
          <Icon as={FontAwesomeIcon} icon={faSearch} color="gray.300" />
        </InputLeftElement>
        <Input type="text" bg="gray.200" placeholder="검색" />
      </InputGroup>
      <Icon as={FontAwesomeIcon} icon={faBell} color="black" />
    </Flex>
  );
}
