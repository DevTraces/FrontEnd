import { postFeeds } from "@/api/feeds";
import NavLayout from "@/components/@common/NavLayout";
import ImageAddButton from "@/components/newPost/ImageAddButton";
import ImagePreview from "@/components/newPost/ImagePreview";
import Tags from "@/components/newPost/Tags";
import useImagePreviews from "@/hooks/useImagePreviews";
import { Button, HStack, Textarea, useToast, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

type TagItem = { id: string; content: string };

export default function NewPost() {
  const { images, imagePreviews, addImage, removeImage } = useImagePreviews();
  const [tags, setTags] = useState<TagItem[]>([]);
  const [textContent, setTextContent] = useState("");
  const toast = useToast();
  const router = useRouter();

  const feedMutation = useMutation({
    mutationFn: () =>
      postFeeds(
        textContent,
        images.map(i => i.file),
        tags.map(t => t.content)
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
        title: "게시물이 성공적으로 등록되었어요",
        status: "success",
        duration: 1000
      });
    }
  });

  const handlePublishClick = () => {
    if (textContent.length > 1000) {
      toast({
        title: "내용은 1000자 이하로만 가능해요.",
        status: "warning",
        duration: 1000
      });
    } else {
      feedMutation.mutate();
    }
  };

  return (
    <NavLayout>
      <Head>
        <title>ArtBubble | Upload</title>
      </Head>
      <HStack w="full" justifyContent="end" mt="80px">
        <HStack gap="12px">
          <ImageAddButton onImageInput={image => addImage(image)} />
          <Button
            bg="primary"
            color="white"
            colorScheme="purple"
            onClick={() => handlePublishClick()}
          >
            게시하기
          </Button>
        </HStack>
      </HStack>
      <VStack
        w={{ md: "480px", sm: "100vw", lg: "800px" }}
        spacing="0"
        pt="32px"
      >
        <Textarea
          placeholder="어떤 것을 공유할까요?"
          resize="none"
          h="20vh"
          bg="white"
          borderBottomRadius="0"
          border="none"
          focusBorderColor="transparent"
          p="32px"
          value={textContent}
          onChange={e => setTextContent(e.target.value)}
        />
        <Tags
          tags={tags}
          onAddTag={tagContent => {
            setTags(prev => [
              ...prev,
              { id: window.self.crypto.randomUUID(), content: tagContent }
            ]);
          }}
          onRemoveTag={tagId =>
            setTags(prev => prev.filter(p => p.id !== tagId))
          }
        />
      </VStack>
      <HStack spacing={5} w="full" mt="20px">
        {imagePreviews.map(i => (
          <ImagePreview
            key={i.imageId}
            imageUrl={i.url}
            onRemoveClick={() => removeImage(i.imageId)}
          />
        ))}
      </HStack>
    </NavLayout>
  );
}
