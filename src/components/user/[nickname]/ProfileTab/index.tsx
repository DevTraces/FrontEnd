import { ProfileTabName } from "@/types/data/user";
import { Tab, Tabs, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import router from "next/router";
import FollowList from "../FollowList";
import Posts from "../Posts/Posts";
import Saved from "../Saved";

const selectedList: ProfileTabName[] = [
  "posts",
  "following",
  "follower",
  "saved"
];

type ProfileTabProps = {
  nickname: string;
  selectedTab: ProfileTabName;
};

export default function ProfileTab({ nickname, selectedTab }: ProfileTabProps) {
  const isMyProfile = nickname === "choonsik";

  const tabList = isMyProfile
    ? selectedList
    : selectedList.filter(item => item !== "saved");

  const tabData: {
    [key in ProfileTabName]: {
      name: string;
      tabPanel: JSX.Element;
    };
  } = {
    posts: {
      name: "게시물",
      tabPanel: <Posts nickname={nickname} />
    },
    following: {
      name: "팔로잉",
      tabPanel: <FollowList nickname={nickname} type="following" />
    },
    follower: {
      name: "팔로워",
      tabPanel: <FollowList nickname={nickname} type="follower" />
    },
    saved: {
      name: "저장된 목록",
      tabPanel: <Saved />
    }
  };

  return (
    <Tabs
      variant="line"
      align="center"
      colorScheme="red"
      index={selectedList.findIndex(item => item === selectedTab)}
      isLazy
    >
      <TabList>
        {tabList.map(tab => (
          <Tab
            key={tab}
            onClick={() => router.push(`/user/${nickname}/${tab}`)}
          >
            {tabData[tab].name}
          </Tab>
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
