import useApiError from "@/hooks/useAPIError";
import theme from "@/styles/global";
import { ChakraProvider, Portal, Progress } from "@chakra-ui/react";
import "@fontsource/caveat";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const [isRouting, setIsRouting] = useState(false);
  const router = useRouter();

  const { handleError } = useApiError();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            onError: e => {
              handleError(e);
            }
          },
          mutations: {
            onError: e => {
              handleError(e);
            }
          }
        },
        queryCache: new QueryCache({
          onError: (e: any) => handleError(e)
        })
      })
  );
  const initKakao = () => {
    if (typeof window !== "undefined")
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY);
  };

  useEffect(() => {
    const handleStart = () => {
      setIsRouting(true);
    };

    const handleStop = () => {
      setIsRouting(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Portal>
            <Progress
              size="xs"
              w="100vw"
              zIndex="toast"
              isIndeterminate={isRouting}
              position="fixed"
              top={0}
              colorScheme="purple"
              bg="transparent"
            />
          </Portal>
          <Component {...pageProps} />
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
            integrity="sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx"
            crossOrigin="anonymous"
            onLoad={initKakao}
          />
        </ChakraProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
