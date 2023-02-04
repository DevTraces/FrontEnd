import LabeledInput from "@/components/accounts/edit/LabeledInput";
import NavLayout from "@/components/NavLayout";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Setting() {
  const router = useRouter();
  const isError = true;
  return (
    <NavLayout>
      <Head>
        <title>Arterest | Setting</title>
      </Head>
      <Container pt={{ sm: "40px", md: "none" }}>
        <VStack padding={10} w="full">
          <Flex justifyContent="end" w="full">
            <Button
              bg="primary"
              color="white"
              onClick={() => {
                router.push("/feed");
              }}
            >
              저장하기
            </Button>
          </Flex>

          <FormControl>
            <VStack gap="8px">
              <Avatar size="2xl" />
              <Button bg="white">프로필 사진 변경</Button>
            </VStack>

            <LabeledInput
              isError={isError}
              labelText="이름"
              helperText="사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요."
              ErrorText="이름을 입력해주세요"
              defaultValue="김경현"
            />
            <LabeledInput
              isError={isError}
              labelText="사용자 이름"
              helperText="사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요."
              ErrorText="사용자 이름을 입력해주세요"
              defaultValue="@codeisneverodd"
            />
            <FormLabel lineHeight={10}>
              <Text fontSize="16px">자기소개</Text>
              <Textarea
                bg="white"
                rounded="12px"
                p="12px"
                defaultValue="안녕하세요.사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의
                알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록
                도와주세요."
              />

              {!isError ? (
                <FormHelperText color="gray.500">몇 자 이하로</FormHelperText>
              ) : (
                <FormErrorMessage>에러입니다</FormErrorMessage>
              )}
            </FormLabel>
            <Box>
              <Text fontSize="16px" lineHeight="40px" color="black">
                비밀번호
              </Text>
              <Button
                borderColor="transparent"
                bg="white"
                onClick={() => {
                  router.push("/accounts/edit/password");
                }}
              >
                비밀번호 변경
              </Button>
            </Box>
          </FormControl>
        </VStack>
      </Container>
    </NavLayout>
  );
}
