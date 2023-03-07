import { getUserProfile } from "@/api/users/profile/[nickname]";
import NavLayout from "@/components/@common/NavLayout";
import useClient from "@/hooks/useClient";
import getRedirectionServerSideProps from "@/lib/getServerSideProps/redirection";
import usersKeys from "@/queryKeys/usersKeys";
import { ProfileTabName } from "@/types/data/user";
import currentUser from "@/utils/currentUser";
import { Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

const ProfileInfo = dynamic(
  () => import("@/components/user/[nickname]/ProfileInfo"),
  {
    ssr: false
  }
);

const ProfileTab = dynamic(
  () => import("@/components/user/[nickname]/ProfileTab"),
  {
    ssr: false
  }
);

type ServerSideProps = {
  query: { nickname: string; selectedTab: ProfileTabName };
};

export default function Profile({ query }: ServerSideProps) {
  const { nickname, selectedTab } = query;
  const router = useRouter();
  const isMyProfile = nickname === currentUser.getNickname();
  const isClient = useClient();

  if (isClient && !isMyProfile && selectedTab === "saved")
    router.push(`/user/${nickname}/posts`);

  const profileQuery = useQuery({
    queryKey: usersKeys.userProfile(nickname),
    queryFn: () => getUserProfile(nickname)
  });

  return (
    <>
      <Head>
        <title>Arterest | {nickname}님의 프로필</title>
      </Head>
      <NavLayout>
        <Center flexDirection="column">
          {profileQuery.data && (
            <ProfileInfo profileData={profileQuery.data} p="20px" pt="100px" />
          )}

          <ProfileTab nickname={nickname} selectedTab={selectedTab} />
        </Center>
      </NavLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    ...(await getRedirectionServerSideProps(ctx)),
    props: {
      query: ctx.query
    }
  };
};
