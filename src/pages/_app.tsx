import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QuestProvider } from "../hooks/useQuest";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QuestProvider>
        <Component {...pageProps} />
      </QuestProvider>
    </SessionProvider>
  );
}

export default MyApp;
