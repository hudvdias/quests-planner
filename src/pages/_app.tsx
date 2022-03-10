import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QuestProvider } from "../hooks/useQuest";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <QuestProvider>
          <Component {...pageProps} />
        </QuestProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
