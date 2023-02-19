import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import TagAutoComplete from "./TagAutoComplete";
import UserList from "./UserList";

type TabName = "username" | "nickname" | "hashtags";

type TabData = {
  [key in TabName]: {
    name: string;
    tabPanel: JSX.Element;
  };
};

export default function SearchTab() {
  const tabList: TabName[] = ["username", "nickname", "hashtags"];

  const tabData: TabData = {
    username: {
      name: "이름",
      tabPanel: <UserList target="username" />
    },
    nickname: {
      name: "닉네임",
      tabPanel: <UserList target="nickname" />
    },
    hashtags: {
      name: "태그",
      tabPanel: <TagAutoComplete />
    }
  };

  return (
    <Tabs colorScheme="purple" isFitted isLazy>
      <TabList>
        {tabList.map(tab => (
          <Tab key={tab}>{tabData[tab].name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabList.map(tab => (
          <TabPanel key={tab}>{tabData[tab].tabPanel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
