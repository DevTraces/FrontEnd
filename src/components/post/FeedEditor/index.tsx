import useImagePreviews from "@/hooks/useImagePreviews";
import useTags from "@/hooks/useTags";
import { EditorImage, FeedData } from "@/types/data/feed";
import {
  Box,
  Button,
  Flex,
  HStack,
  Textarea,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import ImageAddBox from "./ImageAddBox";
import ImageAddButton from "./ImageAddButton";
import ImagePreview from "./ImagePreview";
import Tags from "./Tags";

type FeedEditorProps = {
  onPublish: ({
    images,
    textContent,
    tags
  }: {
    images: EditorImage[];
    textContent: string;
    tags: string[];
  }) => void;
  prevFeedData?: FeedData;
};

export default function FeedEditor({
  onPublish,
  prevFeedData
}: FeedEditorProps) {
  const { images, imagePreviews, addImage, removeImage } = useImagePreviews(
    prevFeedData?.imageUrls ?? []
  );
  const { tags, addTag, removeTag } = useTags(prevFeedData?.hashtags ?? []);

  const [textContent, setTextContent] = useState(prevFeedData?.content ?? "");
  const toast = useToast();

  const handlePublishClick = () => {
    if (textContent.length > 1000) {
      toast({
        title: "내용은 1000자 이하로만 가능해요.",
        status: "warning",
        duration: 1000
      });
    } else if (images.length === 0) {
      toast({
        title: "이미지가 하나 이상 필요해요.",
        status: "warning",
        duration: 3000
      });
    } else {
      onPublish({
        images,
        textContent,
        tags: tags.map(t => t.content)
      });
    }
  };

  return (
    <Box>
      <HStack
        w="full"
        justifyContent="end"
        mt="80px"
        pr={{ sm: "20px", md: "0" }}
      >
        <ImageAddButton onImageInput={image => addImage(image)} />
        <Button
          bg="primary"
          color="white"
          colorScheme="purple"
          onClick={() => handlePublishClick()}
          isDisabled={imagePreviews.length === 0}
        >
          {imagePreviews.length === 0
            ? "게시하려면 이미지가 필요해요"
            : "게시하기"}
        </Button>
      </HStack>

      <VStack
        w={{ md: "480px", sm: "100vw", lg: "800px" }}
        spacing="0"
        pt="32px"
      >
        <Textarea
          placeholder="아래 작품들에 대해 이야기 해주세요"
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
          onAddTag={tagContent => addTag(tagContent)}
          onRemoveTag={tagId => removeTag(tagId)}
        />
      </VStack>
      <Flex
        gap="20px"
        w={{ md: "480px", sm: "100vw", lg: "800px" }}
        mt="20px"
        flexWrap="wrap"
        pl={{ sm: "32px", md: "0" }}
      >
        {imagePreviews.map(i => (
          <ImagePreview
            key={i.imageId}
            imageUrl={i.url}
            onRemoveClick={() => removeImage(i.imageId)}
          />
        ))}
        <ImageAddBox onImageInput={image => addImage(image)} />
      </Flex>
    </Box>
  );
}
