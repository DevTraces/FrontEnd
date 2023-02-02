import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useOutsideClick
} from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

export default function SearchBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const popupRef = useRef(null);
  useOutsideClick({
    ref: popupRef,
    handler: e => {
      const target = e.target as Element;
      if (target.closest('[data-type="topBarSearch"]')) return;
      onClose();
    }
  });
  return (
    <Popover closeOnBlur={false} isOpen={isOpen}>
      <PopoverTrigger>
        <InputGroup mr={10} data-type="topBarSearch">
          <InputLeftElement pointerEvents="none">
            <Icon as={FontAwesomeIcon} icon={faSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            onClick={onOpen}
            type="text"
            bg="gray.200"
            placeholder="검색"
          />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent ref={popupRef} translateX="-100px">
        <PopoverBody>
          <Tabs>
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
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
