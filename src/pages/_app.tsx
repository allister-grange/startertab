import { AppErrorBoundary } from "@/components/ui/AppErrorBoundary";
import NoSSR from "@/components/ui/NoSSR";
import { defaultSettings } from "@/helpers/themes";
import "@/styles/github-markdown.css";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from "recoil";

type MyAppProps = { cookies?: string };
const breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "85em",
  "2xl": "96em",
};

export function MyApp({
  Component,
  pageProps,
  cookies,
}: AppProps & MyAppProps) {
  // setting defaults settings in local storage if the user is new
  useEffect(() => {
    if (!localStorage.getItem("user_settings")) {
      localStorage.setItem("user_settings", JSON.stringify(defaultSettings));
    }
  }, []);

  const theme = extendTheme({ breakpoints });

  // sending through mobile users to the landing page
  if (isMobile) {
    window.location.href = "https://startertab.com/landingpad";
  }

  return (
    <ErrorBoundary FallbackComponent={AppErrorBoundary}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>StarterTab</title>
          <meta
            name="og:description"
            content="A customizable website to replace your 'New Tab' homepage"
          />
          <meta
            name="description"
            content="A customizable website to replace your 'New Tab' homepage"
          />
          <meta property="og:image" content={"/demo.png"} />
          <meta
            property="og:title"
            content="StarterTab - A customizable homepage"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>

        {/* NOTE: I have to use client side rendering here because of allowing a user
        to create their own themes. Because themes are stored client-side in localStorage,
        they can only be found when the application is rendered on the client. */}
        <NoSSR>
          <RecoilRoot>
            <Component cookies={cookies} {...pageProps} />
            <Analytics />
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
