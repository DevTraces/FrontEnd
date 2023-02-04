import NavLayout from "@/components/NavLayout";
import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <NavLayout>
      <Center>
        <Flex
          direction="column"
          pt={20}
          gap={5}
          m="auto"
          mb={20}
          textAlign="center"
        >
          <Text fontWeight="bold">
            죄송합니다. 페이지를 사용할 수 없습니다.
          </Text>
          <Text>클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.</Text>
          <Link href="/feed">
            <Button color="primary" bg="gray.300" fontWeight="bold">
              Arterest로 돌아가기
            </Button>
          </Link>
        </Flex>
      </Center>
    </NavLayout>
  );
}
