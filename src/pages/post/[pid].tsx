import NavLayout from "@/components/NavLayout";
import PostCard from "@/components/PostCard";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <>
      <Head>
        <title>포스트 {pid}</title>
      </Head>
      <NavLayout>
        <Center mt="40px">
          <PostCard />
        </Center>
      </NavLayout>
    </>
  );
}