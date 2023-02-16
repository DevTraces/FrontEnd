import { postFeeds } from "@/api/feeds";
import NavLayout from "@/components/@common/NavLayout";
import FeedEditor from "@/components/post/FeedEditor";
import { EditorPublishData, FileImage } from "@/types/data/feed";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NewPost() {
  const router = useRouter();
  const toast = useToast();

  const feedMutation = useMutation({
    mutationFn: ({ images, textContent, tags }: EditorPublishData) =>
      postFeeds(
        textContent,
        // TODO: BE와 image 형식 통일 필요
        images.filter((i): i is FileImage => i.type === "file").map(i => i.src),
        tags
      ),
    onSuccess: () => {
      toast({
        title: "게시물이 성공적으로 등록되었어요",
        status: "success",
        duration: 1000
      });
      router.push("/feed");
    },
    onError: () => {
      toast({
        title: "게시물 등록에 실패했어요",
        status: "error",
        duration: 1000
      });
    }
  });

  return (
    <NavLayout>
      <Head>
        <title>새 게시물 작성</title>
      </Head>
      <FeedEditor onPublish={feedMutation.mutate} />
    </NavLayout>
  );
}
