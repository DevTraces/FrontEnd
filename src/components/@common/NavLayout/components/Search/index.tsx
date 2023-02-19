import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { useContext } from "react";
import { NavTypeContext } from "../../NavTypeContext";
import InputContainer from "./components/Input";
import TagAutoComplete from "./components/TagResult";
import UserList from "./components/UserResult";

type TabName = "username" | "nickname" | "hashtags";

type TabData = {
  [key in TabName]: {
    name: string;
    tabPanel: JSX.Element;
  };
};

export default function Search() {
  const type = useContext(NavTypeContext);

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
    <>
      {type === "sidebar" && <InputContainer mb="20px" />}
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
    </>
  );
}
