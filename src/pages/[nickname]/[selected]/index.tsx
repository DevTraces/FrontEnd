import NavLayout from "@/components/NavLayout";
import PostList from "@/components/[nickname]/PostList";
import ProfileInfo from "@/components/[nickname]/ProfileInfo";
import UserList from "@/components/[nickname]/UserList";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

type Selected = "posts" | "saved" | "following" | "follower";
const selectedList: Selected[] = ["posts", "saved", "following", "follower"];

const username = "김경현";
export default function Profile() {
  const router = useRouter();
  const { nickname, selected } = router.query;

  return (
    <>
      <Head>
        <title>Arterest | Profile</title>
      </Head>
      <NavLayout>
        <ProfileInfo
          nickname={nickname as string}
          username={username}
          postCount={0}
          followerCount={0}
          followingCount={0}
          imgURL=""
        />
        {selected && (
          <Tabs
            variant="line"
            align="center"
            colorScheme="red"
            defaultIndex={selectedList.findIndex(item => item === selected)}
          >
            <TabList>
              <Tab
                onClick={() => {
                  router.push(`/${nickname}/posts`);
                }}
              >
                게시물
              </Tab>
              <Tab
                onClick={() => {
                  router.push(`/${nickname}/saved`);
                }}
              >
                저장한 목록
              </Tab>
              <Tab
                onClick={() => {
                  router.push(`/${nickname}/following`);
                }}
              >
                팔로잉
              </Tab>
              <Tab
                onClick={() => {
                  router.push(`/${nickname}/follower`);
                }}
              >
                팔로워
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PostList />
              </TabPanel>
              <TabPanel>
                <PostList />
              </TabPanel>
              <TabPanel>
                <UserList />
              </TabPanel>
              <TabPanel>
                <UserList />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </NavLayout>
    </>
  );
}
