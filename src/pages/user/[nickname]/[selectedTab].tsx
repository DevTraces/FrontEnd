import { getUserProfile } from "@/api/users/profile/[nickname]";
import navigationAtom from "@/atoms/navigationAtom";
import NavLayout from "@/components/@common/NavLayout";
import usersKeys from "@/queryKeys/usersKeys";
import { ProfileTabName } from "@/types/data/user";
import { useQuery } from "@tanstack/react-query";
import getRedirectionServerSideProps from "@/lib/getServerSideProps/redirection";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import currentUser from "@/utils/currentUser";
import { useRouter } from "next/router";
import useClient from "@/hooks/useClient";

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

  const setNavigation = useSetRecoilState(navigationAtom);

  useEffect(() => {
    switch (selectedTab) {
      case "saved":
        setNavigation("saved");
        break;
      default:
        setNavigation("user");
        break;
    }
  }, [selectedTab, setNavigation]);

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
        {profileQuery.data && (
          <ProfileInfo profileData={profileQuery.data} p="20px" pt="100px" />
        )}
        <ProfileTab nickname={nickname} selectedTab={selectedTab} />
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
