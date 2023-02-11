import NavLayout from "@/components/NavLayout";
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
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const sampleimgs = [
  "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1602532305019-3dbbd482dae9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  "https://images.unsplash.com/photo-1673818855223-da6f705d825f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
];

export default function TagResult() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>ArtBubble | {router.query.tag} 검색 결과</title>
      </Head>
      <NavLayout>
        <Container centerContent>
          <VStack w="full" pt="30px" pb="40px">
            <HStack w="full" m="20px" gap="20px">
              <Avatar boxSize="80px" />
              <Flex gap="20px">
                <VStack alignItems="flex-start">
                  <Text fontWeight="bold">#{router.query.tag}</Text>
                  <Text>
                    게시물 <strong>6385</strong>
                  </Text>
                </VStack>
              </Flex>
            </HStack>
            <Grid w="full" templateColumns="repeat(3, 1fr)" gap="10px">
              {sampleimgs.map(img => (
                <GridItem key={img} position="relative">
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={img}
                      alt={`${router.query.tag}이미지`}
                      sizes="100%"
                      fill
                      priority
                    />
                  </AspectRatio>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </NavLayout>
    </>
  );
}
