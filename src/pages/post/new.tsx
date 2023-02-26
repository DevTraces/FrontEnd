import NavLayout from "@/components/@common/NavLayout";
import FeedEditor from "@/components/post/FeedEditor";
import useFeed from "@/hooks/useFeed";
import { EditorPublishData } from "@/types/data/feed";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NewPost() {
  const router = useRouter();
  const { createMutation } = useFeed();
  const createFeed = (data: EditorPublishData) =>
    createMutation.mutate(data, {
      onSuccess: () => {
        router.push("/feed");
      }
    });

  return (
    <NavLayout>
      <Head>
        <title>새 게시물 작성</title>
      </Head>
      <FeedEditor onPublish={createFeed} />
    </NavLayout>
  );
}
