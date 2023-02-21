import { getHashtagResult } from "@/api/search/hashtag";
import CircledImage from "@/components/@common/CircledImage";
import NavLayout from "@/components/@common/NavLayout";
import searchKeys from "@/queryKeys/searchKeys";
import {
  AspectRatio,
  Avatar,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TagResult() {
  const router = useRouter();
  const tag = router.query.tag as string;

  const tagQuery = useQuery({
    queryKey: searchKeys.hashtags(tag),
    queryFn: ({ queryKey }) => getHashtagResult(queryKey[1], 0)
  });

  if (tagQuery.isError) return <>태그결과 에러</>;
  if (tagQuery.isLoading) return <>태그결과 로딩중</>;

  return (
    <>
      <Head>
        <title>ArtBubble | {tag} 검색 결과</title>
      </Head>
      <NavLayout>
        <Container centerContent mt={{ sm: "15px" }}>
          <VStack w="full" pt="30px" pb="40px">
            <HStack w="full" m="20px" gap="20px">
              {tagQuery.data.feedList && tagQuery.data.feedList[0] ? (
                <CircledImage
                  src={tagQuery.data.feedList[0].imageUrl}
                  alt="대표이미지"
                  size="80px"
                />
              ) : (
                <Avatar boxSize="80px" />
              )}
              <Flex gap="20px">
                <VStack alignItems="flex-start">
                  <Text fontWeight="bold">#{tag}</Text>
                  <Text>
                    게시물
                    <strong> {tagQuery.data.totalNumberOfSearches}</strong>
                  </Text>
                </VStack>
              </Flex>
            </HStack>
            {tagQuery.data.totalNumberOfSearches > 0 ? (
              <Grid w="full" templateColumns="repeat(3, 1fr)" gap="10px">
                {tagQuery.data.feedList?.map(({ feedId, imageUrl }) => (
                  <GridItem key={feedId} position="relative">
                    <Link href={`/post/${feedId}`}>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={imageUrl}
                          alt={`${tag}이미지`}
                          sizes="100%"
                          fill
                          priority
                        />
                      </AspectRatio>
                    </Link>
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <>검색 결과가 없습니다.</>
            )}
          </VStack>
        </Container>
      </NavLayout>
    </>
  );
}
