import { AppErrorBoundary } from "@/components/ui/AppErrorBoundary";
import SettingsContext from "@/context/UserSettingsContext";
import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import { ErrorBoundary } from "react-error-boundary";
import NoSSR from "react-no-ssr";
import { RecoilRoot } from "recoil";
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
    <ErrorBoundary FallbackComponent={AppErrorBoundary}>
      <ChakraProvider colorModeManager={colorModeManager}>
        <Head>
          <title>New Page</title>
          <meta
            name="og:description"
            content="A customizable website to replace your 'New Tab' homepage"
          />
          <meta
            name="description"
            content="A customizable website to replace your 'New Tab' homepage."
          />
          <meta property="og:image" content={"/demo.png"} />
          <meta
            property="og:title"
            content="Start Page - A customizable homepage"
          />
        </Head>

        {/* NOTE: I have to use client side rendering here because of allowing a user
        to create their own themes. Because themes are stored client-side in localStorage,
        they can only be found when the application is rendered on the client. */}
        <NoSSR>
          <RecoilRoot>
            <SettingsContext>
              <Component {...pageProps} />
            </SettingsContext>
          </RecoilRoot>
        </NoSSR>
      </ChakraProvider>
    </ErrorBoundary>
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

  if (res) {
    res.setHeader("Cache-Control", "no-store");
  }

  return { ...ctx, cookies };
};

export default MyApp;
