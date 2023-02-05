import NavLayout from "@/components/NavLayout";
import ImageBox from "@/components/newPost/ImageBox";
import {
  Button,
  Flex,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { faHashtag, faImage, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";

const tags = ["태그1", "태그2", "태그3"];

export default function NewPost() {
  const router = useRouter();

  return (
    <NavLayout>
      <Head>
        <title>ArtBubble | Upload</title>
      </Head>
      <FormControl as={VStack} spacing="16px" p="40px" pt="80px">
        <HStack w="full" justifyContent="end">
          <HStack gap="12px">
            <Button
              bg="white"
              colorScheme="whiteAlpha"
              color="black"
              leftIcon={
                <Icon
                  as={FontAwesomeIcon}
                  icon={faImage}
                  color="currentcolor"
                  pr={2}
                />
              }
            >
              이미지 추가
            </Button>
            <Button
              bg="primary"
              color="white"
              colorScheme="purple"
              onClick={() => {
                router.push("/feed");
              }}
            >
              게시하기
            </Button>
          </HStack>
        </HStack>
        <VStack w="full" spacing="0" pt="32px">
          <Textarea
            placeholder="어떤 것을 공유할까요?"
            resize="none"
            h="20vh"
            bg="white"
            borderBottomRadius="0"
            border="none"
            focusBorderColor="transparent"
            p="32px"
          />
          <Flex
            bg="white"
            w="full"
            px="32px"
            py="16px"
            gap="12px"
            flexWrap="wrap"
          >
            {tags.map(tag => (
              <Button
                rightIcon={
                  <Icon
                    as={FontAwesomeIcon}
                    icon={faX}
                    color="gray.400"
                    size="xs"
                  />
                }
              >
                {tag}
              </Button>
            ))}

            <InputGroup
              flex={{ sm: "none", md: "1" }}
              border="transparent"
              w={{ sm: "full", md: "inherit" }}
            >
              <InputLeftAddon bg="white" pr="0" pl={{ sm: "0", md: "inherit" }}>
                <Icon as={FontAwesomeIcon} icon={faHashtag} color="gray.400" />
              </InputLeftAddon>
              <Input
                placeholder="태그 추가"
                border="none"
                focusBorderColor="transparent"
                outline="none"
              />
            </InputGroup>
          </Flex>
        </VStack>

        <HStack spacing={5} w="full">
          <ImageBox>
            <Image />
          </ImageBox>
          <ImageBox>
            <Image />
          </ImageBox>
        </HStack>
      </FormControl>
    </NavLayout>
  );
}
