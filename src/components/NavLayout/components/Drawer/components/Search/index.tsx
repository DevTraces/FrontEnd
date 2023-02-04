import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search() {
  return (
    <>
      <Box display={{ sm: "none", md: "block" }}>
        <InputGroup mb="20px">
          <Input
            placeholder="검색"
            w="full"
            bg="gray.100"
            borderColor="transparent"
          />
          <InputRightElement>
            <Icon as={FontAwesomeIcon} icon={faCircleXmark} color="gray.300" />
          </InputRightElement>
        </InputGroup>
      </Box>

      <Tabs colorScheme="red" isFitted>
        <TabList>
          <Tab>이름</Tab>
          <Tab>닉네임</Tab>
          <Tab>태그</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>이름 결과</TabPanel>
          <TabPanel>닉네임 결과</TabPanel>
          <TabPanel>태그 결과</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
