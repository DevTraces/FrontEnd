import NavLayout from "@/components/NavLayout";
import PostCard from "@/components/PostCard";
import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function TagResult() {
  const router = useRouter();
  const { tag } = router.query;
  return (
    <>
      <Head>
        <title>Arterest | {tag} 검색 결과</title>
      </Head>
      <NavLayout>
        <VStack pt="30px" w="max-content" pb="40px" m="auto">
          <HStack w="full" alignItems="center" m="20px" gap="20px">
            <Avatar boxSize="80px" />
            <Flex gap="20px">
              <VStack alignItems="flex-start">
                <Text fontWeight="bold">#{tag}</Text>
                <Text>
                  게시물 <strong>6385</strong>
                </Text>
              </VStack>
            </Flex>
          </HStack>
          <PostCard />
        </VStack>
      </NavLayout>
    </>
  );
}
