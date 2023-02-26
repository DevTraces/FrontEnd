import useAuth from "@/hooks/useAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

type ServerSideProps = {
  code: string;
  error: string;
};

export default function Kakao({ code, error }: ServerSideProps) {
  const router = useRouter();
  const { oAuthKakao } = useAuth({
    onOAuthKakao: () => router.push("/feed")
  });

  useEffect(() => {
    if (code) oAuthKakao(code);
    if (error) router.push("/auth/signIn");
  }, [code, error, oAuthKakao, router]);

  return <>카카오 로그인 중</>;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query
});
