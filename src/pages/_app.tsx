import SettingsContext from "@/context/UserSettingsContext";
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

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
        <meta
          name="og:description"
          content="A website to replace your 'New Tab' homepage"
        />
        <meta property="og:image" content={"/black.png"} />
        <meta
          property="og:title"
          content="New Page - A customizable homepage"
        />
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

  let cookies = "";
  if (req) {
    cookies = req.headers.cookie ?? "";
  }

  console.log("cookies", cookies);
  if (!cookies.includes("chakra-ui-color-mode")) {
    // res.set"chakra-ui-color-mode=black"
    // console.log("no cookie g");
    // res?.setHeader("set-cookie", "chakra-ui-color-mode=black; path=/;");
  }

  if (res) {
    res.setHeader("Cache-Control", "no-store");
  }

  return { ...ctx, cookies };
};

export default MyApp;
