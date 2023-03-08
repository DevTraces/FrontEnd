import NavLayout from "@/components/@common/NavLayout";
import FeedEditor from "@/components/post/FeedEditor";
import useFeed from "@/hooks/useFeed";
import { EditorPublishData } from "@/types/data/feed";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import getServerSideProps from "@/lib/getServerSideProps/redirection";

export default function NewPost() {
  const router = useRouter();
  const { createMutation } = useFeed();
  const createFeed = (data: EditorPublishData) =>
    createMutation.mutate(data, {
      onSuccess: ({ feedId }) => {
        router.push(`/post/${feedId}`);
      }
    });

  return (
    <NavLayout>
      <Head>
        <title>새 게시물 작성</title>
      </Head>
      <Center mt={{ base: "40px", md: "0" }}>
        <FeedEditor onPublish={createFeed} />
      </Center>
    </NavLayout>
  );
}

export { getServerSideProps };
