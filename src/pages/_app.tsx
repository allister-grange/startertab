import SettingsContext from "@/context/UserSettingsContext";
import { useLocalStorage } from "@/helpers/useLocalStorage";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>New Page</title>
      </Head>
      <SettingsContext>
        <Component {...pageProps} />
      </SettingsContext>
    </ChakraProvider>
  );
}

export default MyApp;
