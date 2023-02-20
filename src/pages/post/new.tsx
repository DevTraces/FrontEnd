import NavLayout from "@/components/@common/NavLayout";
import FeedEditor from "@/components/post/FeedEditor";
import useFeed from "@/hooks/useFeed";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NewPost() {
  const router = useRouter();
  const { create } = useFeed({
    onCreate: () => {
      router.push("/feed");
    }
  });

  return (
    <NavLayout>
      <Head>
        <title>새 게시물 작성</title>
      </Head>
      <FeedEditor onPublish={create} />
    </NavLayout>
  );
}
