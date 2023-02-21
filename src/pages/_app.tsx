import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useState } from "react";
import { RecoilRoot } from "recoil";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100"
      },
      ":not(.chakra-dont-set-collapse) > .chakra-collapse": {
        overflow: "initial !important"
      }
    }
  },
  colors: {
    primary: "#B384DA"
  }
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const initKakao = () => {
    if (typeof window !== "undefined")
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
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
