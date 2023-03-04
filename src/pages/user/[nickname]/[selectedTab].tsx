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
import { Center } from "@chakra-ui/react";

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
