import {
  Button,
  FormControl,
  HStack,
  Image,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { faHashtag, faImage } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { useRouter } from "next/router";
import IconTextButton from "./components/IconTextButton";
import ImageBox from "./components/ImageBox";
import TagButton from "./components/TagButton";

export default function NewPost() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Arterest | Upload</title>
      </Head>
      <FormControl as={VStack} spacing={4} p={10}>
        <HStack spacing={5}>
          <ImageBox>
            <Image />
          </ImageBox>
          <ImageBox>
            <Image />
          </ImageBox>
          <IconTextButton icon={faImage} text="이미지 추가" />
        </HStack>
        <Textarea placeholder="어떤 것을 공유할까요?" resize="none" h={500} />
        <HStack>
          <TagButton>태그1</TagButton>
          <TagButton>태그2</TagButton>
          <TagButton>태그3</TagButton>
          <IconTextButton icon={faHashtag} text="태그 추가" />
        </HStack>
        <Button
          width="full"
          bg="red.900"
          color="white"
          onClick={() => {
            router.push("/home");
          }}
        >
          게시하기
        </Button>
      </FormControl>
    </>
  );
}
