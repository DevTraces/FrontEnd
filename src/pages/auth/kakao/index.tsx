import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
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

  return <>카카오 로그인 중</>;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query
});
