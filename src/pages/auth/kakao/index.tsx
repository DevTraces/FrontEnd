import useAuth from "@/hooks/useAuth";
import { Box, Center, Icon, Spinner } from "@chakra-ui/react";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import KakaoImg from "public/kakao.png";
import { useEffect, useRef } from "react";

type ServerSideProps = {
  code: string;
  error: string;
};

export default function Kakao({ code, error }: ServerSideProps) {
  const router = useRouter();
  const isInit = useRef(true);
  const { oAuthKakao } = useAuth({
    onOAuthKakao: () => router.push("/feed")
  });

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      if (code) oAuthKakao(code);
      if (error) router.push("/auth/signIn");
    }
  }, [code, error, oAuthKakao, router, isInit]);

  return (
    <Center w="full" h="100vh">
      <Center boxSize="200px" rounded="20px" flexDirection="column" gap="20px">
        <Image src={KakaoImg} width={100} alt="카카오" />
        <Box pos="relative">
          <Icon
            as={FontAwesomeIcon}
            icon={faUnlock}
            pos="absolute"
            top="10px"
            left="12px"
          />
          <Spinner
            boxSize="40px"
            thickness="2px"
            speed="1.5s"
            color="#181600"
          />
        </Box>
      </Center>
    </Center>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query
});
