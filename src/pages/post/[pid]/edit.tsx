import NavLayout from "@/components/@common/NavLayout";
import PostForm from "@/components/@common/PostForm";

import Head from "next/head";
import { useRouter } from "next/router";

export default function PostEdit() {
  const router = useRouter();

  return (
    <NavLayout>
      <Head>
        <title>ArtBubble | Upload</title>
      </Head>
      <PostForm feedId={+(router.query.pid as string)} />
    </NavLayout>
  );
}
