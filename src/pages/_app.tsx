import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
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

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
