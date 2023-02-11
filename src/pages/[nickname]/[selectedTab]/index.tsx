import { getUserProfile } from "@/api/users/profile/[nickname]";
import NavLayout from "@/components/NavLayout";
import ProfileInfo from "@/components/[nickname]/Profile/ProfileInfo";
import ProfileTab from "@/components/[nickname]/ProfileTab";
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
    queryKey: ["profile", nickname, selectedTab],
    queryFn: ({ queryKey }) => {
      return getUserProfile(queryKey[1]);
    }
  });

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
            <ProfileInfo {...profileQuery.data} p="20px" pt="100px" />
            {selectedTab && (
              <ProfileTab nickname={nickname} selected={selectedTab} />
            )}
          </>
        )}
      </NavLayout>
    </>
  );
}
