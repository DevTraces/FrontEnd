import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Kakao() {
  const router = useRouter();
  const { code, error } = router.query;
  const { oAuthKakao } = useAuth({
    onOAuthKakao: () => router.push("/feed")
  });

  useEffect(() => {
    if (code) oAuthKakao(code as string);
    if (error) router.push("/auth/signIn");
  }, [code, error, oAuthKakao, router]);

  return <>카카오 로그인 중</>;
}
