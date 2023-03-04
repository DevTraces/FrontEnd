import useSearch from "@/hooks/useSearch";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useNavBar from "../../hooks/useNavBar";
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

export default function Search() {
  const { navType } = useNavBar();

  const { searchValue, changeType } = useSearch();
  const tabIndex = (() => {
    if (searchValue.type === "nickname") return 1;
    if (searchValue.type === "tag") return 2;
    return 0;
  })();
  const handleTabChange = (i: number) => {
    if (i === 0) changeType("username");
    if (i === 1) changeType("nickname");
    if (i === 2) changeType("tag");
  };

  return (
    <>
      {navType === "sidebar" && <InputContainer mb="20px" />}
      <Tabs
        index={tabIndex}
        colorScheme="purple"
        onChange={handleTabChange}
        isFitted
        isLazy
      >
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
