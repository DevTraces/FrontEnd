import {
  Divider,
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
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search() {
  return (
    <>
      검색
      <InputGroup>
        <Input placeholder="검색" />
        <InputRightElement>
          <Icon as={FontAwesomeIcon} icon={faClose} color="gray.300" />
        </InputRightElement>
      </InputGroup>
      <Divider />
      <Tabs>
        <TabList>
          <Tab>이름</Tab>
          <Tab>닉네임</Tab>
          <Tab>태그</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>검색 결과</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
