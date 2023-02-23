import { getUserProfile } from "@/api/users/profile/[nickname]";
import NavLayout from "@/components/@common/NavLayout";
import ProfileInfo from "@/components/user/[nickname]/ProfileInfo";
import ProfileTab from "@/components/user/[nickname]/ProfileTab";
import usersKeys from "@/queryKeys/usersKeys";
import { ProfileTabName } from "@/types/data/user";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Head from "next/head";

type ServerSideProps = {
  nickname: string;
  selectedTab: ProfileTabName;
};

export default function Profile({ nickname, selectedTab }: ServerSideProps) {
  const profileQuery = useQuery({
    queryKey: usersKeys.userProfile(nickname),
    queryFn: () => getUserProfile(nickname)
  });

  return (
    <>
      <Head>
        <title>Arterest | {nickname}님의 프로필</title>
      </Head>
      <NavLayout maxW="750px">
        {profileQuery.data && (
          <ProfileInfo profileData={profileQuery.data} p="20px" pt="100px" />
        )}
        <ProfileTab nickname={nickname} selectedTab={selectedTab} />
      </NavLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query
});
