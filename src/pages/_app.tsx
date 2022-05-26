import SettingsContext from "@/context/UserSettingsContext";
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { setCookies } from "cookies-next";

type MyAppProps = { cookies?: string };

export function MyApp({
  Component,
  pageProps,
  cookies,
}: AppProps & MyAppProps) {
  // pulls the colorMode from the cookies so that SSR can produce the correct theme
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManager(cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager}>
      <Head>
        <title>New Page</title>
      </Head>
      <SettingsContext>
        <Component {...pageProps} />
      </SettingsContext>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<MyAppProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  const { req, res } = context.ctx;

  setCookies("_vercel_no_cache", "1", { req, res });

  let cookies = "";
  if (req) {
    cookies = req.headers.cookie ?? "";
  }

  if (res) {
    res.setHeader("Cache-Control", "no-store");
  }

  return { ...ctx, cookies };
};

export default MyApp;
