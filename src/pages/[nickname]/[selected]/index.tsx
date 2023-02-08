import NavLayout from "@/components/NavLayout";
import Posts from "@/components/[nickname]/ProfileFeed/Posts";
import ProfileInfo, {
  ProfileData
} from "@/components/[nickname]/Profile/ProfileInfo";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import FollowList from "@/components/[nickname]/ProfileFeed/FollowList";
import Saved from "@/components/[nickname]/ProfileFeed/Saved";

type Selected = "posts" | "saved" | "following" | "follower";
const selectedList: Selected[] = ["posts", "following", "follower", "saved"];

export default function Profile() {
  const router = useRouter();
  const { nickname, selected } = router.query;

  const isMyProfile = nickname === "choonsik";

  const getProfile = async () => {
    const res = await fetch(`/api/users/profile/${nickname}`);
    const data = await res.json();
    return data;
  };

  const query = useQuery<ProfileData>({
    queryKey: ["profile", nickname],
    queryFn: getProfile
  });

  return (
    <>
      <Head>
        <title>Arterest | {nickname}님의 프로필</title>
      </Head>
      <NavLayout maxW="750px">
        {query.data && <ProfileInfo {...query.data} p="20px" pt="100px" />}
        {selected && (
          <Tabs
            variant="line"
            align="center"
            colorScheme="red"
            index={selectedList.findIndex(item => item === selected)}
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
              {isMyProfile && (
                <Tab
                  onClick={() => {
                    router.push(`/${nickname}/saved`);
                  }}
                >
                  저장한 목록
                </Tab>
              )}
            </TabList>
            <TabPanels>
              <TabPanel>{selected === "posts" && <Posts />}</TabPanel>
              <TabPanel>{selected === "saved" && <Saved />}</TabPanel>
              <TabPanel>{selected === "following" && <FollowList />}</TabPanel>
              <TabPanel>{selected === "follower" && <FollowList />}</TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </NavLayout>
    </>
  );
}
