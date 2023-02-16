import { getUserProfile } from "@/api/users/profile/[nickname]";
import NavLayout from "@/components/@common/NavLayout";
import ProfileInfo from "@/components/user/[nickname]/Profile/ProfileInfo";
import ProfileTab from "@/components/user/[nickname]/ProfileTab";
import usersKeys from "@/queryKeys/usersKeys";
import { ProfileTabName } from "@/types/data/user";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { nickname, selectedTab } = router.query as {
    nickname: string;
    selectedTab: ProfileTabName;
  };

  const profileQuery = useQuery({
    queryKey: usersKeys.userProfile(nickname),
    queryFn: () => getUserProfile(nickname)
  });

  if (profileQuery.isError) return <>Profile에서 에러가 발생했습니다</>;
  if (profileQuery.isLoading) return <>Profile 로딩중...</>;

  const {
    username,
    description,
    profileImageUrl,
    totalFeedNumber,
    followerNumber,
    followingNumber
  } = profileQuery.data;

  return (
    <>
      <Head>
        <title>Arterest | {nickname}님의 프로필</title>
      </Head>
      <NavLayout maxW="750px">
        {profileQuery.isLoading || profileQuery.isError ? (
          <Spinner mt="400px" boxSize="100px" />
        ) : (
          <>
            <ProfileInfo
              p="20px"
              pt="100px"
              username={username}
              nickname={nickname}
              description={description}
              profileImageUrl={profileImageUrl}
              totalFeedNumber={totalFeedNumber}
              followerNumber={followerNumber}
              followingNumber={followingNumber}
            />
            {selectedTab && (
              <ProfileTab nickname={nickname} selectedTab={selectedTab} />
            )}
          </>
        )}
      </NavLayout>
    </>
  );
}
