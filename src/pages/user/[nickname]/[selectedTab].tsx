import { getUserProfile } from "@/api/users/profile/[nickname]";
import NavLayout from "@/components/@common/NavLayout";
import ProfileInfo from "@/components/user/[nickname]/ProfileInfo";
import ProfileTab from "@/components/user/[nickname]/ProfileTab";
import usersKeys from "@/queryKeys/usersKeys";
import { ProfileTabName } from "@/types/data/user";
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

  return (
    <>
      <Head>
        <title>Arterest | {nickname}님의 프로필</title>
      </Head>
      <NavLayout maxW="750px">
        <ProfileInfo profileData={profileQuery.data} p="20px" pt="100px" />
        <ProfileTab nickname={nickname} selectedTab={selectedTab} />
      </NavLayout>
    </>
  );
}
