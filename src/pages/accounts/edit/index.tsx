import LabeledInput from "@/components/accounts/edit/LabeledInput";
import NavLayout from "@/components/NavLayout";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  HStack,
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
      <Container>
        <VStack padding={10} w="full">
          <FormControl>
            <Container centerContent>
              <Avatar size="2xl" />
              <Button bg="none" color="red.900">
                프로필 사진 변경
              </Button>
            </Container>

            <LabeledInput
              isError={isError}
              labelText="이름"
              helperText="사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요."
              ErrorText="이름을 입력해주세요"
            />
            <LabeledInput
              isError={isError}
              labelText="사용자 이름"
              helperText="사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요."
              ErrorText="사용자 이름을 입력해주세요"
            />
            <LabeledInput
              isError={isError}
              labelText="소개"
              helperText="0/150"
              ErrorText="사용자 소개를 입력해주세요"
            />
          </FormControl>

          <HStack p={10} spacing={10}>
            <Button
              bg="red.900"
              color="white"
              onClick={() => {
                router.push("/accounts/edit/password");
              }}
            >
              비밀번호 변경
            </Button>
            <Button
              bg="red.900"
              color="white"
              onClick={() => {
                router.push("/feed");
              }}
            >
              저장하기
            </Button>
          </HStack>
        </VStack>
      </Container>
    </NavLayout>
  );
}
