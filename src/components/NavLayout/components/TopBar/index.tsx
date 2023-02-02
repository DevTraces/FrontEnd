import { Box, Flex, Text } from "@chakra-ui/react";
import Alert from "./Alert";
import SearchBar from "./SearchBar";

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
      <SearchBar />
      <Alert />
    </Flex>
  );
}
