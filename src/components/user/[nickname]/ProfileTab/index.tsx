import { ProfileTabName } from "@/types/data/user";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import currentUser from "@/utils/currentUser";
import router from "next/router";
import FollowList from "../FollowList";
import Posts from "../Posts";
import Saved from "../Saved";

export const selectedList: ProfileTabName[] = [
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
  const isMyProfile = nickname === currentUser.getNickname();

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

  if (!selectedTab) return null;

  return (
    <Tabs
      variant="line"
      align="center"
      colorScheme="red"
      index={selectedList.findIndex(item => item === selectedTab)}
      w="full"
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
      <TabPanels overflow="hidden" pt="40px">
        {tabList.map(tab => (
          <TabPanel key={tab}>{tabData[tab].tabPanel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
